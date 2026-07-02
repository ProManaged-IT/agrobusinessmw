<?php
/**
 * AgroBusiness Malawi — Admin Panel
 * Review and approve/deny KYC onboarding applications.
 *
 * Access: https://agrobusinessmw.com/admin/
 * Protected by HTTP Basic Auth via .htpasswd (see below) OR the ADMIN_TOKEN env var.
 *
 * Quick setup:
 *   Add to .env:  ADMIN_TOKEN=your_secret_token_here
 *   Then access via browser — login prompt will appear.
 */

session_start();
error_reporting(0);
ini_set('display_errors', 0);

// ─── LOAD ENV ─────────────────────────────────────────────────────────────────
$envFile = dirname(__DIR__) . '/.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (empty($line) || $line[0] === '#' || strpos($line, '=') === false) continue;
        [$k, $v] = explode('=', $line, 2);
        $_ENV[trim($k)] = trim($v);
    }
}

// ─── DB CONNECTION ────────────────────────────────────────────────────────────
$host    = $_ENV['DB_HOST'] ?? '';
$db      = @new mysqli($host, $_ENV['DB_USER'] ?? '', $_ENV['DB_PASS'] ?? '', $_ENV['DB_NAME'] ?? '', (int)($_ENV['DB_PORT'] ?? 3306));
if ($db->connect_error) die('<p style="color:red">DB connection failed.</p>');
$db->set_charset('utf8mb4');

// ─── ADMIN AUTH ───────────────────────────────────────────────────────────────
// Credentials live in the `admin_users` table (created/seeded from .env on
// first run by api.php's admin_get_user()) — never hardcoded here.
$db->query(
    "CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        admin_token VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )"
);
$adminRow = ($res = $db->query("SELECT username, password_hash FROM admin_users LIMIT 1")) ? $res->fetch_assoc() : null;
if (!$adminRow) {
    $seedUser  = $_ENV['ADMIN_USER'] ?? 'admin';
    $seedPass  = $_ENV['ADMIN_PASSWORD'] ?? bin2hex(random_bytes(8));
    $seedToken = $_ENV['ADMIN_TOKEN'] ?? bin2hex(random_bytes(16));
    $hash = password_hash($seedPass, PASSWORD_DEFAULT);
    $stmt = $db->prepare("INSERT INTO admin_users (username, password_hash, admin_token) VALUES (?, ?, ?)");
    $stmt->bind_param('sss', $seedUser, $hash, $seedToken);
    $stmt->execute();
    $adminRow = ['username' => $seedUser, 'password_hash' => $hash];
}

if (!isset($_SESSION['admin_logged_in'])) {
    if (isset($_POST['password']) && $_POST['username'] === $adminRow['username'] && password_verify($_POST['password'], $adminRow['password_hash'])) {
        $_SESSION['admin_logged_in'] = true;
    } else {
        if (isset($_POST['password'])) {
            $loginError = 'Invalid credentials.';
        }
        showLogin($loginError ?? null);
        exit;
    }
}

// Reference-price override store (district_id 0 = all districts). Created lazily.
$db->query("CREATE TABLE IF NOT EXISTS price_overrides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  crop_id INT NOT NULL,
  district_id INT NOT NULL DEFAULT 0,
  price_per_kg DECIMAL(10,2) NOT NULL,
  note VARCHAR(255) NULL,
  set_by VARCHAR(50) NOT NULL DEFAULT 'admin',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_crop_district (crop_id, district_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci");

// ─── HANDLE APPROVE / DENY ────────────────────────────────────────────────────
$actionMsg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['review_id'])) {
    $id     = (int)$_POST['review_id'];
    $action = $_POST['review_action'] ?? '';
    $notes  = trim($_POST['review_notes'] ?? '');

    if (in_array($action, ['approve', 'deny']) && $id > 0) {
        $status = $action === 'approve' ? 'approved' : 'denied';
        $denial = $action === 'deny' ? $notes : null;
        $aNote  = $action === 'approve' ? $notes : null;

        $stmt = $db->prepare(
            "UPDATE onboarding_applications SET status=?, admin_notes=?, denial_reason=?, reviewed_at=NOW() WHERE id=?"
        );
        $stmt->bind_param('sssi', $status, $aNote, $denial, $id);
        $stmt->execute();

        // Fetch for notification
        $s2 = $db->prepare("SELECT full_name, email, application_ref FROM onboarding_applications WHERE id=?");
        $s2->bind_param('i', $id);
        $s2->execute();
        $app = $s2->get_result()->fetch_assoc();

        if ($app && $app['email']) {
            if ($action === 'approve') {
                $subj = "AgroBusiness Malawi — Application Approved! ({$app['application_ref']})";
                $body = "Dear {$app['full_name']},\n\nYour application has been APPROVED.\n"
                      . ($notes ? "Notes: {$notes}\n" : '')
                      . "\nWelcome to AgroBusiness Malawi!";
            } else {
                $subj = "AgroBusiness Malawi — Application Update ({$app['application_ref']})";
                $body = "Dear {$app['full_name']},\n\nYour application could not be approved.\n"
                      . ($notes ? "Reason: {$notes}\n" : '')
                      . "\nContact us if you have questions.";
            }
            @mail($app['email'], $subj, $body, "From: noreply@agrobusinessmw.com\r\nContent-Type: text/plain; charset=utf-8");
        }

        $actionMsg = "Application #{$id} {$status}.";
    }
}

// ─── HANDLE COMMUNITY PRICE REVIEW (approve / reject) ─────────────────────────
$priceMsg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['price_review_id'])) {
    $pid   = (int)$_POST['price_review_id'];
    $pact  = $_POST['price_action'] ?? '';
    $pnote = trim($_POST['price_notes'] ?? '');
    $pmap  = ['approve' => 'approved', 'reject' => 'rejected'];
    if (isset($pmap[$pact]) && $pid > 0) {
        $pstatus = $pmap[$pact];
        $pn = $pact === 'reject' ? ($pnote !== '' ? $pnote : null) : null;
        $ps = $db->prepare("UPDATE crowdsourced_prices SET status=?, flag_reason=?, reviewed_by='admin', reviewed_at=NOW() WHERE id=?");
        if ($ps) {
            $ps->bind_param('ssi', $pstatus, $pn, $pid);
            $ps->execute();
            $priceMsg = "Price report #{$pid} {$pstatus}.";
        }
    }
}

// ─── HANDLE PRICE MANAGEMENT (refresh source / manual price / override) ───────
$pmMsg = '';
$pmErr = '';

// a) Refresh reference prices from the upstream source (FEWS) via the API action.
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['refresh_source'])) {
    $token  = $_ENV['ADMIN_TOKEN'] ?? 'agro_admin_2024';
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $root   = str_replace('/admin/index.php', '', $_SERVER['SCRIPT_NAME']);
    $apiUrl = $scheme . '://' . $_SERVER['HTTP_HOST'] . $root . '/api.php?action=fews_prices_refresh&token=' . urlencode($token);
    $ctx  = stream_context_create(['http' => ['timeout' => 30, 'ignore_errors' => true]]);
    $resp = @file_get_contents($apiUrl, false, $ctx);
    $data = $resp ? json_decode($resp, true) : null;
    if ($data && !empty($data['success'])) {
        $pmMsg = "Reference prices refreshed from source — {$data['rows']} rows"
               . (!empty($data['error']) ? " (source note: {$data['error']})" : '') . '.';
    } else {
        $pmErr = 'Refresh failed: ' . htmlspecialchars($data['error'] ?? 'source unreachable') . '.';
    }
}

// b) Manually add an approved community price.
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['manual_mode'] ?? '') === 'community') {
    $cid = (int)($_POST['m_crop_id'] ?? 0);
    $did = (int)($_POST['m_district_id'] ?? 0);
    $kg  = (float)($_POST['m_price_kg'] ?? 0);
    $mkt = trim($_POST['m_market'] ?? '');
    if ($cid && $did && $kg > 0) {
        $bag = round($kg * 50, 2);
        $q = $db->prepare("INSERT INTO crowdsourced_prices
            (crop_id, district_id, price_per_kg, price_per_bag, unit, market_name,
             submitted_by, channel, verified, status, is_member, created_at)
            VALUES (?, ?, ?, ?, 'kg', ?, 'admin', 'web', 1, 'approved', 0, NOW())");
        if ($q) { $q->bind_param('iidds', $cid, $did, $kg, $bag, $mkt); $q->execute();
            $pmMsg = 'Community price added and approved.'; }
    } else {
        $pmErr = 'Provide a crop, district and a price greater than zero.';
    }
}

// c) Manually set / update a reference override (district 0 = all districts).
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['manual_mode'] ?? '') === 'reference') {
    $cid  = (int)($_POST['m_crop_id'] ?? 0);
    $did  = (int)($_POST['m_district_id'] ?? 0);
    $kg   = (float)($_POST['m_price_kg'] ?? 0);
    $note = trim($_POST['m_note'] ?? '');
    if ($cid && $kg > 0) {
        $q = $db->prepare("INSERT INTO price_overrides (crop_id, district_id, price_per_kg, note, set_by)
            VALUES (?, ?, ?, ?, 'admin')
            ON DUPLICATE KEY UPDATE price_per_kg=VALUES(price_per_kg), note=VALUES(note), set_by='admin'");
        if ($q) { $q->bind_param('iids', $cid, $did, $kg, $note); $q->execute();
            $pmMsg = 'Reference override saved.'; }
    } else {
        $pmErr = 'Provide a crop and a price greater than zero.';
    }
}

// d) Delete a reference override.
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_override_id'])) {
    $oid = (int)$_POST['delete_override_id'];
    if ($oid > 0) {
        $q = $db->prepare("DELETE FROM price_overrides WHERE id=?");
        if ($q) { $q->bind_param('i', $oid); $q->execute(); $pmMsg = 'Override removed.'; }
    }
}

// Reference data for the price-management form.
$pmCrops = [];
if ($r = $db->query("SELECT id, name FROM crops ORDER BY name")) { while ($x = $r->fetch_assoc()) $pmCrops[] = $x; }
$pmDistricts = [];
if ($r = $db->query("SELECT id, name FROM districts ORDER BY name")) { while ($x = $r->fetch_assoc()) $pmDistricts[] = $x; }
$overrides = [];
if ($r = $db->query("SELECT o.id, o.crop_id, o.district_id, o.price_per_kg, o.note, o.updated_at,
                            c.name AS crop_name, d.name AS district_name
                     FROM price_overrides o JOIN crops c ON c.id = o.crop_id
                     LEFT JOIN districts d ON d.id = o.district_id
                     ORDER BY c.name, d.name")) { while ($x = $r->fetch_assoc()) $overrides[] = $x; }

// ─── FETCH APPLICATIONS ───────────────────────────────────────────────────────
$filterStatus = in_array($_GET['status'] ?? 'pending', ['pending','approved','denied','all'])
    ? ($_GET['status'] ?? 'pending') : 'pending';

$result = $db->query(
    "SELECT a.*, d.name as district_name
     FROM onboarding_applications a
     LEFT JOIN districts d ON a.district_id = d.id
     ORDER BY a.created_at DESC
     LIMIT 200"
);
$apps = [];
while ($row = $result->fetch_assoc()) $apps[] = $row;

// ─── COUNTS ───────────────────────────────────────────────────────────────────
$counts = [];
foreach (['pending','approved','denied'] as $s) {
    $r = $db->query("SELECT COUNT(*) as n FROM onboarding_applications WHERE status='{$s}'");
    $counts[$s] = $r->fetch_assoc()['n'];
}

// ─── FETCH COMMUNITY PRICES AWAITING REVIEW ───────────────────────────────────
// Guarded: the review columns are added by the community-price-review migration.
$priceReviewAvailable = false;
$pendingPrices = [];
$colCheck = $db->query("SHOW COLUMNS FROM crowdsourced_prices LIKE 'status'");
if ($colCheck && $colCheck->num_rows > 0) {
    $priceReviewAvailable = true;
    $pr = $db->query(
        "SELECT cp.id, c.name AS crop_name, d.name AS district_name, cp.market_name,
                cp.price_per_kg, cp.price_per_bag, cp.unit, cp.submitted_by, cp.channel,
                cp.status, cp.is_member, cp.flag_reason, cp.created_at
         FROM crowdsourced_prices cp
         JOIN crops c ON cp.crop_id = c.id
         LEFT JOIN districts d ON cp.district_id = d.id
         WHERE cp.status IN ('pending','flagged')
         ORDER BY cp.created_at ASC LIMIT 200"
    );
    if ($pr) while ($row = $pr->fetch_assoc()) $pendingPrices[] = $row;
}

// ─── LOGOUT ───────────────────────────────────────────────────────────────────
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: ./');
    exit;
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin — AgroBusiness Malawi</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Inter, system-ui, sans-serif; background: #f5f2eb; color: #3e3930; min-height: 100vh; }
a { color: #8B7355; text-decoration: none; transition: color 0.18s ease; }
a:hover { color: #7a6448; }
.top-bar { background: #fff; border-bottom: 1px solid #e8e2d9; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 3px rgba(70,60,50,0.06); }
.top-bar h1 { font-size: 1.1rem; font-weight: 700; color: #3e3930; }
.top-bar small { color: #6b5f52; }
.logout { padding: .5rem 1.2rem; background: transparent; border: 1.5px solid #d5cfc4; border-radius: 6px; color: #6b5f52; font-size: .85rem; font-weight: 600; cursor: pointer; transition: all 0.18s ease; }
.logout:hover { background: #b94040; border-color: #b94040; color: #fff; }
.container { max-width: 1100px; margin: 0 auto; padding: 2rem 1rem; }
.stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-bottom: 2rem; }
.stat-box { background: #fff; border: 1px solid #e8e2d9; border-radius: 12px; padding: 1.5rem; text-align: center; border-top: 3px solid; }
.stat-box:nth-child(1) { border-top-color: #f59e0b; }
.stat-box:nth-child(2) { border-top-color: #22c55e; }
.stat-box:nth-child(3) { border-top-color: #ef4444; }
.stat-num { font-size: 2.5rem; font-weight: 800; margin-bottom: .5rem; }
.stat-label { font-size: .85rem; color: #6b5f52; margin-top: .25rem; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600; }
.pending-color  { color: #f59e0b; }
.approved-color { color: #22c55e; }
.denied-color   { color: #ef4444; }
.filter-tabs { display: flex; gap: .5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.tab { padding: .6rem 1.2rem; border-radius: 8px; background: #f5f2eb; color: #6b5f52; font-size: .85rem; font-weight: 600; border: 1px solid #e8e2d9; transition: all 0.18s ease; cursor: pointer; }
.tab.active { background: #8B7355; color: #fff; border-color: #8B7355; }
.tab:hover:not(.active) { background: #faf8f4; border-color: #d5cfc4; }
.table-tools { display: grid; grid-template-columns: minmax(220px, 1fr) repeat(3, minmax(140px, 180px)); gap: .75rem; margin-bottom: 1rem; }
.table-tools input, .table-tools select { padding: .7rem .85rem; border: 1px solid #d5cfc4; border-radius: 8px; background: #fff; color: #3e3930; font-size: .86rem; }
.table-tools input:focus, .table-tools select:focus { outline: none; border-color: #8B7355; box-shadow: 0 0 0 3px rgba(139,115,85,0.1); }
.table-stats { color: #6b5f52; font-size: .85rem; margin-bottom: .75rem; }
.msg { padding: 1rem 1.25rem; background: rgba(74,124,89,.1); border: 1px solid rgba(74,124,89,.3); border-radius: 8px; color: #4a7c59; margin-bottom: 1.5rem; font-weight: 600; }
table { width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e8e2d9; }
th { background: #f5f2eb; padding: .875rem 1rem; text-align: left; font-size: .78rem; color: #6b5f52; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; border-bottom: 2px solid #d5cfc4; }
td { padding: .75rem 1rem; border-bottom: 1px solid #ede9e0; font-size: .875rem; vertical-align: top; color: #3e3930; }
tr:nth-child(even) td { background: #faf8f4; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: #f0ece4; transition: background 0.15s ease; }
.badge { display: inline-block; padding: .35rem .8rem; border-radius: 20px; font-size: .75rem; font-weight: 700; }
.badge-pending  { background: rgba(245,158,11,.1); color: #b87c0b; }
.badge-approved { background: rgba(74,124,89,.1); color: #4a7c59; }
.badge-denied   { background: rgba(185,64,64,.1); color: #b94040; }
.badge-web  { background: rgba(139,115,85,.1); color: #8B7355; }
.badge-ussd { background: rgba(200,134,10,.1); color: #c8860a; }
.actions form { display: flex; gap: .5rem; flex-wrap: wrap; align-items: center; }
.actions input[type=text] { padding: .5rem .8rem; background: #faf8f4; border: 1px solid #d5cfc4; border-radius: 6px; color: #3e3930; font-size: .8rem; width: 140px; transition: all 0.18s ease; }
.actions input[type=text]:focus { outline: none; border-color: #8B7355; background: #fff; box-shadow: 0 0 0 3px rgba(139,115,85,0.1); }
.btn-approve { padding: .5rem 1rem; background: #4a7c59; border: none; border-radius: 6px; color: #fff; cursor: pointer; font-size: .8rem; font-weight: 600; transition: all 0.18s ease; }
.btn-approve:hover { background: #3d6549; box-shadow: 0 2px 8px rgba(74,124,89,0.3); transform: translateY(-1px); }
.btn-deny { padding: .5rem 1rem; background: #b94040; border: none; border-radius: 6px; color: #fff; cursor: pointer; font-size: .8rem; font-weight: 600; transition: all 0.18s ease; }
.btn-deny:hover { background: #a23a3a; box-shadow: 0 2px 8px rgba(185,64,64,0.3); transform: translateY(-1px); }
.empty { text-align: center; padding: 3rem; color: #9d9087; font-size: 1rem; }
.ref { font-size: .75rem; font-family: monospace; color: #8B7355; font-weight: 600; }
@media (max-width: 640px) {
    .stats { grid-template-columns: 1fr; }
    table { font-size: .78rem; }
    th, td { padding: .5rem .6rem; }
    .actions input[type=text] { width: 100px; }
}
</style>
</head>
<body>

<div class="top-bar">
    <div>
        <h1>🌾 AgroBusiness Malawi — Admin</h1>
        <small>KYC Application Review</small>
    </div>
    <a href="?logout=1" class="logout">Logout</a>
</div>

<div class="container">

    <!-- Stats -->
    <div class="stats">
        <div class="stat-box">
            <div class="stat-num pending-color"><?= $counts['pending'] ?></div>
            <div class="stat-label">Pending Review</div>
        </div>
        <div class="stat-box">
            <div class="stat-num approved-color"><?= $counts['approved'] ?></div>
            <div class="stat-label">Approved</div>
        </div>
        <div class="stat-box">
            <div class="stat-num denied-color"><?= $counts['denied'] ?></div>
            <div class="stat-label">Denied</div>
        </div>
    </div>

    <?php if ($actionMsg): ?>
    <div class="msg">✅ <?= htmlspecialchars($actionMsg) ?></div>
    <?php endif; ?>

    <!-- Filters -->
    <div class="filter-tabs">
        <?php foreach (['pending','approved','denied','all'] as $s): ?>
        <button type="button" class="tab <?= $filterStatus === $s ? 'active' : '' ?>" data-status="<?= $s ?>">
            <?= ucfirst($s) ?> <?= $s !== 'all' ? "({$counts[$s]})" : '' ?>
        </button>
        <?php endforeach; ?>
    </div>

    <div class="table-tools">
        <input type="search" id="table-search" placeholder="Search ref, name, phone, district, channel...">
        <select id="type-filter">
            <option value="all">All types</option>
            <option value="farmer">Farmer</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
        </select>
        <select id="channel-filter">
            <option value="all">All channels</option>
            <option value="web">Web</option>
            <option value="ussd">USSD</option>
        </select>
        <select id="district-filter">
            <option value="all">All districts</option>
            <?php foreach (array_unique(array_filter(array_column($apps, 'district_name'))) as $district): ?>
            <option value="<?= htmlspecialchars(strtolower($district)) ?>"><?= htmlspecialchars($district) ?></option>
            <?php endforeach; ?>
        </select>
    </div>
    <div class="table-stats" id="table-stats">Showing <?= count($apps) ?> applications</div>

    <!-- Applications table -->
    <?php if (empty($apps)): ?>
    <div class="empty">No applications found.</div>
    <?php else: ?>
    <table id="applications-table" class="sortable">
        <thead>
            <tr>
                <th>Ref</th>
                <th>Type</th>
                <th>Name</th>
                <th>Phone</th>
                <th>National ID</th>
                <th>District</th>
                <th>Channel</th>
                <th>Date</th>
                <th>Status</th>
                <th data-no-sort>Actions</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($apps as $a): ?>
        <tr data-type="<?= htmlspecialchars(strtolower($a['user_type'])) ?>" data-channel="<?= htmlspecialchars(strtolower($a['channel'])) ?>" data-district="<?= htmlspecialchars(strtolower($a['district_name'] ?? '')) ?>" data-status="<?= htmlspecialchars($a['status']) ?>" data-search="<?= htmlspecialchars(strtolower(implode(' ', [$a['application_ref'], $a['user_type'], $a['full_name'], $a['email'], $a['phone_number'], $a['national_id'], $a['district_name'], $a['channel'], $a['status']]))) ?>">
            <td><span class="ref"><?= htmlspecialchars($a['application_ref']) ?></span></td>
            <td><?= htmlspecialchars(ucfirst($a['user_type'])) ?></td>
            <td><?= htmlspecialchars($a['full_name']) ?><br>
                <?php if ($a['email']): ?><small style="color:#a3a3a3"><?= htmlspecialchars($a['email']) ?></small><?php endif; ?>
            </td>
            <td><?= htmlspecialchars($a['phone_number']) ?></td>
            <td><?= $a['national_id'] ? htmlspecialchars($a['national_id']) : '<span style="color:#6b6b6b">—</span>' ?></td>
            <td><?= $a['district_name'] ? htmlspecialchars($a['district_name']) : '<span style="color:#6b6b6b">—</span>' ?></td>
            <td><span class="badge badge-<?= $a['channel'] ?>"><?= strtoupper($a['channel']) ?></span></td>
            <td data-sort-value="<?= strtotime($a['created_at']) ?>" style="font-size:.78rem;color:#a3a3a3"><?= date('d/m/Y', strtotime($a['created_at'])) ?></td>
            <td>
                <span class="badge badge-<?= $a['status'] ?>"><?= strtoupper($a['status']) ?></span>
                <?php if ($a['denial_reason']): ?>
                <br><small style="color:#6b6b6b;font-size:.72rem"><?= htmlspecialchars(mb_substr($a['denial_reason'], 0, 50)) ?></small>
                <?php endif; ?>
            </td>
            <td class="actions">
                <?php if ($a['status'] === 'pending'): ?>
                <form method="post">
                    <input type="hidden" name="review_id" value="<?= $a['id'] ?>">
                    <input type="text" name="review_notes" placeholder="Notes (optional)">
                    <button type="submit" name="review_action" value="approve" class="btn-approve">Approve</button>
                    <button type="submit" name="review_action" value="deny" class="btn-deny">Deny</button>
                </form>
                <?php else: ?>
                <span style="color:#6b6b6b;font-size:.8rem">Reviewed</span>
                <?php endif; ?>
            </td>
        </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>

    <!-- Community price review queue -->
    <h2 style="margin:2.5rem 0 1rem;font-family:Inter,system-ui,sans-serif;font-size:1.25rem;color:#3e3930">
        🧺 Community Price Review
        <?php if ($priceReviewAvailable): ?><span style="font-size:.85rem;color:#8B7355">(<?= count($pendingPrices) ?> awaiting)</span><?php endif; ?>
    </h2>
    <?php if ($priceMsg): ?>
    <div class="msg">✅ <?= htmlspecialchars($priceMsg) ?></div>
    <?php endif; ?>

    <?php if (!$priceReviewAvailable): ?>
    <div class="empty">
        Price review is not active yet — the <code>crowdsourced_prices.status</code>
        column is missing on this database.
    </div>
    <?php elseif (empty($pendingPrices)): ?>
    <div class="empty">No community prices awaiting review. 🎉</div>
    <?php else: ?>
    <table id="prices-table" class="sortable">
        <thead>
            <tr>
                <th>Crop</th>
                <th>District / Market</th>
                <th>Price/kg</th>
                <th>Price/bag</th>
                <th>Submitted by</th>
                <th>Channel</th>
                <th>Member</th>
                <th>Status</th>
                <th>Date</th>
                <th data-no-sort>Actions</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($pendingPrices as $p): ?>
            <tr>
                <td><?= htmlspecialchars($p['crop_name']) ?></td>
                <td><?= htmlspecialchars($p['district_name'] ?? '—') ?>
                    <?php if ($p['market_name']): ?><br><small style="color:#a3a3a3"><?= htmlspecialchars($p['market_name']) ?></small><?php endif; ?>
                </td>
                <td data-sort-value="<?= (float)$p['price_per_kg'] ?>">MWK <?= number_format((float)$p['price_per_kg']) ?></td>
                <td data-sort-value="<?= (float)$p['price_per_bag'] ?>">MWK <?= number_format((float)$p['price_per_bag']) ?></td>
                <td><?= htmlspecialchars($p['submitted_by']) ?></td>
                <td><span class="badge badge-<?= htmlspecialchars($p['channel']) ?>"><?= strtoupper($p['channel']) ?></span></td>
                <td><?= $p['is_member'] ? '✅' : '<span style="color:#6b6b6b">—</span>' ?></td>
                <td>
                    <span class="badge badge-<?= $p['status'] === 'flagged' ? 'denied' : 'pending' ?>"><?= strtoupper($p['status']) ?></span>
                    <?php if ($p['flag_reason']): ?><br><small style="color:#b94040;font-size:.72rem"><?= htmlspecialchars($p['flag_reason']) ?></small><?php endif; ?>
                </td>
                <td data-sort-value="<?= strtotime($p['created_at']) ?>" style="font-size:.78rem;color:#a3a3a3"><?= date('d/m/Y H:i', strtotime($p['created_at'])) ?></td>
                <td class="actions">
                    <form method="post">
                        <input type="hidden" name="price_review_id" value="<?= $p['id'] ?>">
                        <input type="text" name="price_notes" placeholder="Reason (if rejecting)">
                        <button type="submit" name="price_action" value="approve" class="btn-approve">Approve</button>
                        <button type="submit" name="price_action" value="reject" class="btn-deny">Reject</button>
                    </form>
                </td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>

    <!-- Price management -->
    <h2 style="margin:2.5rem 0 1rem;font-family:Inter,system-ui,sans-serif;font-size:1.25rem;color:#3e3930">
        📈 Price Management
    </h2>
    <?php if ($pmMsg): ?><div class="msg">✅ <?= htmlspecialchars($pmMsg) ?></div><?php endif; ?>
    <?php if ($pmErr): ?><div class="msg" style="background:rgba(185,64,64,.08);border-color:rgba(185,64,64,.3);color:#b94040">⚠️ <?= $pmErr ?></div><?php endif; ?>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem">
        <!-- Refresh from source -->
        <div style="background:#fff;border:1px solid #e8e2d9;border-radius:12px;padding:1.5rem">
            <h3 style="font-size:1rem;margin-bottom:.5rem;color:#3e3930">Update prices from source</h3>
            <p style="font-size:.85rem;color:#6b5f52;margin-bottom:1rem;line-height:1.5">
                Re-fetches the AgroBiz reference rates from the upstream source and refreshes the cache.
            </p>
            <form method="post">
                <button type="submit" name="refresh_source" value="1" class="btn-approve">Refresh from source</button>
            </form>
        </div>

        <!-- Manual price -->
        <div style="background:#fff;border:1px solid #e8e2d9;border-radius:12px;padding:1.5rem">
            <h3 style="font-size:1rem;margin-bottom:1rem;color:#3e3930">Set an individual price</h3>
            <form method="post" id="manual-price-form" style="display:grid;gap:.75rem">
                <div style="display:flex;gap:1rem;font-size:.85rem;color:#6b5f52">
                    <label style="display:flex;align-items:center;gap:.35rem;cursor:pointer">
                        <input type="radio" name="manual_mode" value="community" checked> Community price
                    </label>
                    <label style="display:flex;align-items:center;gap:.35rem;cursor:pointer">
                        <input type="radio" name="manual_mode" value="reference"> Reference override
                    </label>
                </div>
                <select name="m_crop_id" required style="padding:.6rem;border:1px solid #d5cfc4;border-radius:8px;background:#fff">
                    <option value="">— select crop —</option>
                    <?php foreach ($pmCrops as $c): ?><option value="<?= (int)$c['id'] ?>"><?= htmlspecialchars($c['name']) ?></option><?php endforeach; ?>
                </select>
                <select name="m_district_id" id="m_district" style="padding:.6rem;border:1px solid #d5cfc4;border-radius:8px;background:#fff">
                    <option value="0" data-ref-only>All districts (reference only)</option>
                    <?php foreach ($pmDistricts as $d): ?><option value="<?= (int)$d['id'] ?>"><?= htmlspecialchars($d['name']) ?></option><?php endforeach; ?>
                </select>
                <input type="text" name="m_market" id="m_market" placeholder="Market name (community price)" style="padding:.6rem;border:1px solid #d5cfc4;border-radius:8px;background:#fff">
                <input type="text" name="m_note" id="m_note" placeholder="Note (reference override)" style="padding:.6rem;border:1px solid #d5cfc4;border-radius:8px;background:#fff;display:none">
                <input type="number" name="m_price_kg" min="1" step="0.01" required placeholder="Price per kg (MWK)" style="padding:.6rem;border:1px solid #d5cfc4;border-radius:8px;background:#fff">
                <button type="submit" class="btn-approve">Save price</button>
            </form>
        </div>
    </div>

    <!-- Current reference overrides -->
    <?php if (!empty($overrides)): ?>
    <h3 style="font-size:1rem;margin:1.5rem 0 .75rem;color:#3e3930">Active reference overrides (<?= count($overrides) ?>)</h3>
    <table>
        <thead><tr><th>Crop</th><th>District</th><th>Price/kg</th><th>Note</th><th>Updated</th><th data-no-sort>Actions</th></tr></thead>
        <tbody>
        <?php foreach ($overrides as $o): ?>
            <tr>
                <td><?= htmlspecialchars($o['crop_name']) ?></td>
                <td><?= (int)$o['district_id'] === 0 ? '<em>All districts</em>' : htmlspecialchars($o['district_name'] ?? '—') ?></td>
                <td>MWK <?= number_format((float)$o['price_per_kg']) ?></td>
                <td><?= $o['note'] ? htmlspecialchars($o['note']) : '<span style="color:#9d9087">—</span>' ?></td>
                <td style="font-size:.78rem;color:#a3a3a3"><?= date('d/m/Y H:i', strtotime($o['updated_at'])) ?></td>
                <td class="actions">
                    <form method="post" onsubmit="return confirm('Remove this override?')">
                        <input type="hidden" name="delete_override_id" value="<?= (int)$o['id'] ?>">
                        <button type="submit" class="btn-deny">Delete</button>
                    </form>
                </td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>

</div>
<script>
// Toggle market vs note field based on the selected manual-price mode.
(function () {
    const form = document.getElementById('manual-price-form');
    if (!form) return;
    const market = document.getElementById('m_market');
    const note = document.getElementById('m_note');
    const district = document.getElementById('m_district');
    function apply() {
        const mode = form.querySelector('input[name="manual_mode"]:checked').value;
        const isCommunity = mode === 'community';
        market.style.display = isCommunity ? '' : 'none';
        note.style.display = isCommunity ? 'none' : '';
        // Community requires a specific district; "All districts" is reference-only.
        district.querySelector('option[data-ref-only]').disabled = isCommunity;
        if (isCommunity && district.value === '0') district.value = '';
    }
    form.querySelectorAll('input[name="manual_mode"]').forEach(r => r.addEventListener('change', apply));
    apply();
})();
</script>
<script>
const rows = Array.from(document.querySelectorAll('#applications-table tbody tr'));
const search = document.getElementById('table-search');
const typeFilter = document.getElementById('type-filter');
const channelFilter = document.getElementById('channel-filter');
const districtFilter = document.getElementById('district-filter');
const tabs = document.querySelectorAll('.filter-tabs .tab');
const stats = document.getElementById('table-stats');
let activeStatus = '<?= $filterStatus ?>';

function applyTableFilters() {
    const term = search.value.trim().toLowerCase();
    const type = typeFilter.value;
    const channel = channelFilter.value;
    const district = districtFilter.value;
    let visible = 0;

    rows.forEach(row => {
        const show = (!term || row.dataset.search.includes(term))
            && (type === 'all' || row.dataset.type === type)
            && (channel === 'all' || row.dataset.channel === channel)
            && (district === 'all' || row.dataset.district === district)
            && (activeStatus === 'all' || row.dataset.status === activeStatus);
        row.style.display = show ? '' : 'none';
        if (show) visible++;
    });

    stats.textContent = `Showing ${visible} of ${rows.length} applications`;
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeStatus = tab.dataset.status;
        applyTableFilters();
    });
});

[search, typeFilter, channelFilter, districtFilter].forEach(control => {
    if (!control) return;
    control.addEventListener('input', applyTableFilters);
    control.addEventListener('change', applyTableFilters);
});

applyTableFilters();
</script>
<script src="../assets/js/sortable-table.js"></script>
</body>
</html>

<?php
// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function showLogin(?string $error): void {
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Login — AgroBusiness</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Inter, system-ui, sans-serif; background: #f5f2eb; color: #3e3930; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
.card { background: #fff; border: 1px solid #e8e2d9; border-radius: 16px; padding: 2.5rem; width: 100%; max-width: 360px; box-shadow: 0 8px 24px rgba(70,60,50,0.12); }
h2 { margin-bottom: 1.5rem; font-size: 1.4rem; text-align: center; color: #3e3930; font-weight: 700; }
label { display: block; font-size: .85rem; color: #6b5f52; margin-bottom: .4rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
input { width: 100%; padding: .875rem 1rem; background: #faf8f4; border: 1.5px solid #d5cfc4; border-radius: 8px; color: #3e3930; font-size: .95rem; margin-bottom: 1.25rem; outline: none; font-family: inherit; transition: all 0.18s ease; }
input:focus { border-color: #8B7355; background: #fff; box-shadow: 0 0 0 3px rgba(139,115,85,0.1); }
button { width: 100%; padding: .875rem; background: #8B7355; border: none; border-radius: 8px; color: #fff; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.18s ease; }
button:hover { background: #7a6448; box-shadow: 0 6px 20px rgba(139,115,85,0.3); transform: translateY(-2px); }
.error { color: #b94040; font-size: .85rem; margin-bottom: 1rem; text-align: center; font-weight: 600; }
</style>
</head>
<body>
<div class="card">
    <h2>🌾 Admin Login</h2>
    <?php if ($error): ?><p class="error"><?= htmlspecialchars($error) ?></p><?php endif; ?>
    <form method="post">
        <label>Username</label>
        <input type="text" name="username" autocomplete="username" required>
        <label>Password</label>
        <input type="password" name="password" autocomplete="current-password" required>
        <button type="submit">Login</button>
    </form>
</div>
</body>
</html>
<?php
}
