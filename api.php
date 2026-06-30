<?php
// AgroBusiness Malawi - Complete API Endpoints
// Place this file at: /home/p601229/public_html/agrobusinessmw/api.php

// --- CRITICAL FIX 1: ERROR CATCHING & JSON HEADERS ---
// This ensures even a crash returns readable JSON
http_response_code(200); // Force OK so frontend can read the error message
register_shutdown_function(function () {
    $error = error_get_last();
    // Catch hard crashes (Fatal Errors)
    if ($error && ($error['type'] === E_ERROR || $error['type'] === E_PARSE || $error['type'] === E_CORE_ERROR)) {
        if (ob_get_length()) ob_clean(); // Clear any partial HTML output
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'error' => 'Fatal PHP Error: ' . $error['message'],
            'file' => $error['file'],
            'line' => $error['line']
        ]);
        exit;
    }
});

// Disable HTML error printing (breaks JSON)
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Start output buffering
ob_start();

// ── Compatibility helpers: get_result() requires mysqlnd which may not be available ──
function stmt_fetch_all(mysqli_stmt $stmt): array
{
    $meta = $stmt->result_metadata();
    if (!$meta) return [];
    $fields = [];
    $row = [];
    while ($field = $meta->fetch_field()) {
        $row[$field->name] = null;
        $fields[] = &$row[$field->name];
    }
    call_user_func_array([$stmt, 'bind_result'], $fields);
    $rows = [];
    while ($stmt->fetch()) {
        $rows[] = array_map(fn($v) => $v, $row);
    }
    $meta->free();
    $stmt->free_result();
    return $rows;
}
function stmt_fetch_one(mysqli_stmt $stmt): ?array
{
    $rows = stmt_fetch_all($stmt);
    return $rows[0] ?? null;
}

/**
 * Send an email via SMTPS (port 465 / implicit TLS) using credentials from .env.
 * Falls back to PHP mail() if the socket connection fails.
 *
 * @return bool  true on success, false on failure
 */
function send_smtp_email(string $to, string $subject, string $plainBody): bool
{
    $smtpHost = trim($_ENV['Outgoing Server'] ?? 'blue.webhostingireland.ie');
    $smtpPort = (int)trim($_ENV['SMTP Port']       ?? '465');
    $smtpUser = trim($_ENV['Username']             ?? '');
    $smtpPass = trim($_ENV['Password']             ?? '');
    $fromAddr = $smtpUser ?: 'noreply@agrobusinessmw.com';
    $fromName = 'AgroBusiness Malawi';

    // Build raw email message
    $boundary = uniqid('', true);
    $msgId    = '<' . uniqid('agro-') . '@agrobusinessmw.com>';
    $rawMsg   = "From: {$fromName} <{$fromAddr}>\r\n"
              . "To: {$to}\r\n"
              . "Subject: {$subject}\r\n"
              . "Message-ID: {$msgId}\r\n"
              . "Date: " . date('r') . "\r\n"
              . "MIME-Version: 1.0\r\n"
              . "Content-Type: text/plain; charset=utf-8\r\n"
              . "Content-Transfer-Encoding: 8bit\r\n"
              . "\r\n"
              . $plainBody;

    // Dot-stuffing: lines starting with "." must be doubled
    $rawMsg = preg_replace('/^\.$/m', '..', $rawMsg);

    $ctx = stream_context_create([
        'ssl' => [
            // Peer verification is disabled to support shared-hosting certs that may
            // not be trusted in the local CA bundle. The connection is still encrypted.
            'verify_peer'      => false,
            'verify_peer_name' => false,
            'allow_self_signed'=> true,
        ],
    ]);

    $socket = @stream_socket_client(
        "ssl://{$smtpHost}:{$smtpPort}",
        $errno,
        $errstr,
        15,
        STREAM_CLIENT_CONNECT,
        $ctx
    );

    if (!$socket) {
        // Fallback to system mail()
        $headers = "From: {$fromName} <{$fromAddr}>\r\nContent-Type: text/plain; charset=utf-8";
        return @mail($to, $subject, $plainBody, $headers);
    }

    stream_set_timeout($socket, 10);

    // Read a full (possibly multi-line) SMTP response; returns the last line.
    $readResp = function () use ($socket): string {
        $last = '';
        while (true) {
            $line = fgets($socket, 1024);
            if ($line === false || $line === '') break;
            $last = $line;
            // A line like "250-..." means more follows; "250 ..." means done.
            if (strlen($line) >= 4 && $line[3] !== '-') break;
        }
        return $last;
    };
    $write = function (string $cmd) use ($socket): void { fwrite($socket, $cmd . "\r\n"); };

    // Consume greeting
    $readResp();

    // EHLO
    $helo = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $write("EHLO {$helo}");
    $readResp(); // consume full EHLO response (may be many lines)

    // AUTH LOGIN
    $write('AUTH LOGIN');
    $readResp();                            // 334 VXNlcm5hbWU6
    $write(base64_encode($smtpUser));
    $readResp();                            // 334 UGFzc3dvcmQ6
    $write(base64_encode($smtpPass));
    $authResp = $readResp();               // 235 or 535

    if (substr($authResp, 0, 3) !== '235') {
        $write('QUIT');
        fclose($socket);
        return false;
    }

    $write("MAIL FROM:<{$fromAddr}>");
    $readResp();
    $write("RCPT TO:<{$to}>");
    $readResp();
    $write('DATA');
    $readResp(); // 354

    fwrite($socket, $rawMsg . "\r\n.\r\n");
    $dataResp = $readResp(); // 250 or error

    $write('QUIT');
    $readResp();
    fclose($socket);

    return substr($dataResp, 0, 3) === '250';
}

// Set JSON header & CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// --- LOAD .ENV CREDENTIALS ---
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if ($line[0] === '#' || strpos($line, '=') === false) continue;
        [$key, $val] = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($val);
    }
}

$host     = $_ENV['DB_HOST']     ?? '';
$username = $_ENV['DB_USER']     ?? '';
$password = $_ENV['DB_PASS']     ?? '';
$database = $_ENV['DB_NAME']     ?? '';
$port     = (int)($_ENV['DB_PORT'] ?? 3306);

// Connect to database
try {
    if ($host === '' || $username === '' || $database === '') {
        throw new Exception('Database credentials are missing from .env.');
    }
    if (!class_exists('mysqli')) {
        throw new Exception("Critical Error: MySQLi extension is not loaded in php.ini.");
    }

    $mysqli = mysqli_init();
    $mysqli->options(MYSQLI_OPT_CONNECT_TIMEOUT, 10); // 10s Timeout

    // Suppress warnings to handle errors manually
    if (!@$mysqli->real_connect($host, $username, $password, $database, $port)) {
        throw new Exception("Connect Failed: " . mysqli_connect_error());
    }

    $mysqli->set_charset('utf8mb4');
} catch (Exception $e) {
    ob_clean();
    // Return 200 OK with error details so the App can display it
    http_response_code(200);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'hint' => "Check database credentials in .env.",
        'environment' => $_SERVER['HTTP_HOST'] ?? 'unknown',
        'timestamp' => date('c')
    ]);
    exit;
}

// Get action parameter
$action = $_GET['action'] ?? '';

try {
    switch ($action) {
        case 'test':
            // Test database connection
            $result = $mysqli->query("SELECT COUNT(*) as count FROM districts");
            if ($result) {
                $row = $result->fetch_assoc();
                echo json_encode([
                    'success' => true,
                    'message' => 'Database connection successful',
                    'districts_count' => $row['count'],
                    'environment' => $_SERVER['HTTP_HOST'] ?? 'unknown',
                    'timestamp' => date('c')
                ]);
            } else {
                throw new Exception('Test query failed');
            }
            break;

        case 'districts':
            // Get all districts
            $query = "SELECT id, name FROM districts ORDER BY name ASC";
            $result = $mysqli->query($query);

            if (!$result) {
                throw new Exception('Districts query failed: ' . $mysqli->error);
            }

            $districts = [];
            while ($row = $result->fetch_assoc()) {
                $districts[] = $row;
            }

            echo json_encode([
                'success' => true,
                'data' => $districts,
                'count' => count($districts),
                'timestamp' => date('c')
            ]);
            break;

        case 'crops':
            // Get all crops
            $query = "SELECT id, name FROM crops ORDER BY name ASC";
            $result = $mysqli->query($query);

            if (!$result) {
                throw new Exception('Crops query failed: ' . $mysqli->error);
            }

            $crops = [];
            while ($row = $result->fetch_assoc()) {
                $crops[] = $row;
            }

            echo json_encode([
                'success' => true,
                'data' => $crops,
                'count' => count($crops),
                'timestamp' => date('c')
            ]);
            break;

        case 'crop_prices':
            // Get crop prices
            $query = "
                SELECT
                    c.id,
                    c.name,
                    COALESCE(cp.min_price, '') AS min_price,
                    COALESCE(cp.market_price, '') AS market_price,
                    COALESCE(cp.unit, 'kg') AS unit
                FROM crops c
                LEFT JOIN crop_prices cp ON c.id = cp.crop_id
                ORDER BY c.name ASC
            ";

            $result = $mysqli->query($query);

            if (!$result) {
                throw new Exception('Crop prices query failed: ' . $mysqli->error);
            }

            $crops = [];
            while ($row = $result->fetch_assoc()) {
                $crops[] = $row;
            }

            echo json_encode([
                'success' => true,
                'data' => $crops,
                'count' => count($crops),
                'timestamp' => date('c')
            ]);
            break;

        case 'market_insights':
            // Get market insights for a district
            $district_id = (int)($_GET['district_id'] ?? 0);

            if (!$district_id) {
                throw new Exception('District ID is required');
            }

            $query = "
                SELECT
                    mi.id,
                    mi.district_id,
                    d.name as district_name,
                    mi.insight_en,
                    mi.insight_ci
                FROM market_insights mi
                JOIN districts d ON mi.district_id = d.id
                WHERE mi.district_id = ?
                ORDER BY mi.id DESC
            ";

            $stmt = $mysqli->prepare($query);
            $stmt->bind_param('i', $district_id);
            $stmt->execute();
            $insights = stmt_fetch_all($stmt);

            echo json_encode([
                'success' => true,
                'data' => $insights,
                'count' => count($insights),
                'timestamp' => date('c')
            ]);
            break;

        case 'sellers':
            $district_id = (int)($_GET['district_id'] ?? 0);
            $crop        = trim($_GET['crop'] ?? '');

            if (!$district_id) {
                throw new Exception('District ID is required');
            }

            $query = "
                SELECT s.id, s.name, s.district_id, d.name as district_name,
                       scd.phone_number, scd.email, scd.address,
                       GROUP_CONCAT(c.name ORDER BY c.name SEPARATOR ', ') as crops_display,
                       ROUND(AVG(r.rating_value), 1) as rating
                FROM sellers s
                JOIN districts d ON s.district_id = d.id
                JOIN seller_contact_details scd ON s.contact_id = scd.id
                LEFT JOIN seller_crops sc ON s.id = sc.seller_id
                LEFT JOIN crops c ON sc.crop_id = c.id
                LEFT JOIN ratings r ON s.id = r.seller_id
                WHERE s.district_id = ?";

            if ($crop !== '') {
                $query .= " AND s.id IN (
                    SELECT sc2.seller_id FROM seller_crops sc2
                    JOIN crops c2 ON sc2.crop_id = c2.id WHERE c2.name = ?)";
            }

            $query .= " GROUP BY s.id ORDER BY ROUND(AVG(r.rating_value), 1) DESC, s.name ASC";

            $stmt = $mysqli->prepare($query);
            if ($crop !== '') {
                $stmt->bind_param('is', $district_id, $crop);
            } else {
                $stmt->bind_param('i', $district_id);
            }
            $stmt->execute();
            $sellers = stmt_fetch_all($stmt);

            echo json_encode(['success' => true, 'data' => $sellers, 'count' => count($sellers), 'timestamp' => date('c')]);
            break;

        case 'buyers':
            $district_id = (int)($_GET['district_id'] ?? 0);
            $crop        = trim($_GET['crop'] ?? '');

            if (!$district_id) {
                throw new Exception('District ID is required');
            }

            $query = "
                SELECT b.id, b.name, b.district_id, d.name as district_name,
                       bcd.phone_number, bcd.email, bcd.address,
                       GROUP_CONCAT(c.name ORDER BY c.name SEPARATOR ', ') as crops_display
                FROM buyers b
                JOIN districts d ON b.district_id = d.id
                JOIN buyer_contact_details bcd ON b.contact_id = bcd.id
                LEFT JOIN buyer_crops bc ON b.id = bc.buyer_id
                LEFT JOIN crops c ON bc.crop_id = c.id
                WHERE b.district_id = ?";

            if ($crop !== '') {
                $query .= " AND b.id IN (
                    SELECT bc2.buyer_id FROM buyer_crops bc2
                    JOIN crops c2 ON bc2.crop_id = c2.id WHERE c2.name = ?)";
            }

            $query .= " GROUP BY b.id ORDER BY b.name ASC";

            $stmt = $mysqli->prepare($query);
            if ($crop !== '') {
                $stmt->bind_param('is', $district_id, $crop);
            } else {
                $stmt->bind_param('i', $district_id);
            }
            $stmt->execute();
            $buyers = stmt_fetch_all($stmt);

            echo json_encode(['success' => true, 'data' => $buyers, 'count' => count($buyers), 'timestamp' => date('c')]);
            break;

        case 'pest_control':
            // Get pest control tips
            $crop_id = (int)($_GET['crop_id'] ?? 0);
            $district_id = (int)($_GET['district_id'] ?? 0);

            if (!$crop_id || !$district_id) {
                throw new Exception('Crop ID and District ID are required');
            }

            $query = "
                SELECT
                    pct.id,
                    pct.crop_id,
                    pct.district_id,
                    c.name as crop_name,
                    d.name as district_name,
                    pct.tip_en,
                    pct.tip_ci
                FROM pest_control_tips pct
                JOIN crops c ON pct.crop_id = c.id
                JOIN districts d ON pct.district_id = d.id
                WHERE pct.crop_id = ? AND pct.district_id = ?
                ORDER BY pct.id ASC
            ";

            $stmt = $mysqli->prepare($query);
            $stmt->bind_param('ii', $crop_id, $district_id);
            $stmt->execute();
            $tips = stmt_fetch_all($stmt);

            echo json_encode([
                'success' => true,
                'data' => $tips,
                'count' => count($tips),
                'timestamp' => date('c')
            ]);
            break;

        case 'farming_tips':
            // Get farming tips for a crop
            $crop_id = (int)($_GET['crop_id'] ?? 0);

            if (!$crop_id) {
                throw new Exception('Crop ID is required');
            }

            $query = "
                SELECT
                    fbp.id,
                    fbp.crop_id,
                    c.name as crop_name,
                    fbp.practice_type,
                    fbp.practice_en,
                    fbp.practice_ci
                FROM farming_best_practices fbp
                JOIN crops c ON fbp.crop_id = c.id
                WHERE fbp.crop_id = ?
                ORDER BY fbp.practice_type ASC
            ";

            $stmt = $mysqli->prepare($query);
            $stmt->bind_param('i', $crop_id);
            $stmt->execute();
            $practices = stmt_fetch_all($stmt);

            echo json_encode([
                'success' => true,
                'data' => $practices,
                'count' => count($practices),
                'timestamp' => date('c')
            ]);
            break;

        case 'basic_info':
            // Get basic farming information
            $query = "
                SELECT
                    id,
                    topic,
                    info_en,
                    info_ci
                FROM basic_farming_info
                ORDER BY id ASC
            ";

            $result = $mysqli->query($query);

            if (!$result) {
                throw new Exception('Basic info query failed: ' . $mysqli->error);
            }

            $info = [];
            while ($row = $result->fetch_assoc()) {
                $info[] = $row;
            }

            echo json_encode([
                'success' => true,
                'data' => $info,
                'count' => count($info),
                'timestamp' => date('c')
            ]);
            break;

        // ── ONBOARDING: Submit application ──────────────────────────
        case 'submit_application':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                throw new Exception('POST method required');
            }

            $body      = json_decode(file_get_contents('php://input'), true) ?? [];
            $userType  = trim($body['user_type']  ?? '');
            $fullName  = trim($body['full_name']   ?? '');
            $phone     = trim($body['phone_number'] ?? '');
            $email     = trim($body['email']        ?? '');
            $nationalId = trim($body['national_id'] ?? '');
            $districtId = (int)($body['district_id'] ?? 0) ?: null;
            $village   = trim($body['village']      ?? '');
            $crops     = trim($body['crops_of_interest'] ?? '');
            $business  = trim($body['business_name'] ?? '');
            $channel   = in_array($body['channel'] ?? '', ['web', 'ussd']) ? $body['channel'] : 'web';

            if (!in_array($userType, ['farmer', 'seller', 'buyer'])) {
                throw new Exception('Invalid user type');
            }
            if (strlen($fullName) < 2) {
                throw new Exception('Full name is required');
            }
            if (!preg_match('/^\+?[0-9\s\-]{8,20}$/', $phone)) {
                throw new Exception('Valid phone number is required');
            }
            if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new Exception('Valid email is required');
            }
            if (!$districtId) {
                throw new Exception('District is required');
            }
            if (!$village || strlen($village) < 2) {
                throw new Exception('Village / town is required');
            }
            if (in_array($userType, ['seller', 'buyer']) && $business === '') {
                throw new Exception('Business name is required for sellers and buyers');
            }

            $districtStmt = $mysqli->prepare("SELECT id FROM districts WHERE id = ?");
            $districtStmt->bind_param('i', $districtId);
            $districtStmt->execute();
            if (!stmt_fetch_one($districtStmt)) {
                throw new Exception('Selected district is invalid');
            }

            if ($userType === 'farmer') {
                $business = null;
            }

            // Generate unique reference
            $ref = 'AGR-' . date('Ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 5));

            $stmt = $mysqli->prepare(
                "INSERT INTO onboarding_applications
                 (application_ref, user_type, full_name, phone_number, email, national_id,
                  district_id, village, crops_of_interest, business_name, channel)
                 VALUES (?,?,?,?,?,?,?,?,?,?,?)"
            );
            $stmt->bind_param(
                'ssssssissss',
                $ref,
                $userType,
                $fullName,
                $phone,
                $email,
                $nationalId,
                $districtId,
                $village,
                $crops,
                $business,
                $channel
            );
            $stmt->execute();

            // Send confirmation email if provided
            if ($email) {
                $subject = "AgroBusiness Malawi — Application Received ({$ref})";
                $message = "Dear {$fullName},\n\nYour application has been received.\n"
                    . "Reference: {$ref}\nType: " . ucfirst($userType) . "\n\n"
                    . "We will review and notify you within 2-3 business days.\n\n"
                    . "AgroBusiness Malawi Team";
                send_smtp_email($email, $subject, $message);
            }

            echo json_encode([
                'success'   => true,
                'message'   => 'Application submitted successfully',
                'ref'       => $ref,
                'timestamp' => date('c')
            ]);
            break;

        // ── ONBOARDING: Check application status ────────────────────
        case 'check_application':
            $ref  = strtoupper(trim($_GET['ref'] ?? ''));
            if (!$ref) throw new Exception('Reference number is required');

            $stmt = $mysqli->prepare(
                "SELECT a.application_ref, a.user_type, a.full_name, a.status,
                        a.denial_reason, a.created_at, a.reviewed_at,
                        d.name as district_name
                 FROM onboarding_applications a
                 LEFT JOIN districts d ON a.district_id = d.id
                 WHERE a.application_ref = ?"
            );
            $stmt->bind_param('s', $ref);
            $stmt->execute();
            $row = stmt_fetch_one($stmt);

            if (!$row) throw new Exception('Application not found');

            echo json_encode(['success' => true, 'data' => $row, 'timestamp' => date('c')]);
            break;

        // ── ONBOARDING: Admin — list applications ───────────────────
        case 'admin_applications':
            $adminToken = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? ($_GET['token'] ?? '');
            $envAdminToken = $_ENV['ADMIN_TOKEN'] ?? 'agro_admin_2024';
            if ($adminToken !== $envAdminToken) {
                http_response_code(200);
                echo json_encode(['success' => false, 'error' => 'Unauthorized']);
                exit;
            }

            $status = $_GET['status'] ?? 'pending';
            if (!in_array($status, ['pending', 'approved', 'denied', 'all'])) $status = 'pending';

            $sql = "SELECT a.id, a.application_ref, a.user_type, a.full_name, a.phone_number,
                           a.email, a.national_id, a.channel, a.status, a.created_at, a.reviewed_at,
                           d.name as district_name
                    FROM onboarding_applications a
                    LEFT JOIN districts d ON a.district_id = d.id";
            if ($status !== 'all') {
                $stmt3 = $mysqli->prepare($sql . " WHERE a.status = ? ORDER BY a.created_at DESC LIMIT 100");
                $stmt3->bind_param('s', $status);
                $stmt3->execute();
                $apps = stmt_fetch_all($stmt3);
            } else {
                $result = $mysqli->query($sql . " ORDER BY a.created_at DESC LIMIT 100");
                $apps = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];
            }

            echo json_encode(['success' => true, 'data' => $apps, 'count' => count($apps), 'timestamp' => date('c')]);
            break;

        // ── ONBOARDING: Admin — approve / deny ──────────────────────
        case 'admin_review':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') throw new Exception('POST method required');

            $adminToken = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';
            $envAdminToken = $_ENV['ADMIN_TOKEN'] ?? 'agro_admin_2024';
            if ($adminToken !== $envAdminToken) {
                http_response_code(200);
                echo json_encode(['success' => false, 'error' => 'Unauthorized']);
                exit;
            }

            $body    = json_decode(file_get_contents('php://input'), true) ?? [];
            $appId   = (int)($body['application_id'] ?? 0);
            $action  = $body['action'] ?? '';
            $notes   = trim($body['notes'] ?? '');

            if (!$appId || !in_array($action, ['approve', 'deny'])) {
                throw new Exception('application_id and action (approve/deny) are required');
            }

            $newStatus = $action === 'approve' ? 'approved' : 'denied';
            $stmt = $mysqli->prepare(
                "UPDATE onboarding_applications
                 SET status=?, admin_notes=?, denial_reason=?, reviewed_at=NOW()
                 WHERE id=?"
            );
            $denial = $action === 'deny' ? $notes : null;
            $adminNotes = $action === 'approve' ? $notes : null;
            $stmt->bind_param('sssi', $newStatus, $adminNotes, $denial, $appId);
            $stmt->execute();

            // Fetch applicant details to send notification
            $stmt2 = $mysqli->prepare(
                "SELECT full_name, email, phone_number, application_ref, user_type
                 FROM onboarding_applications WHERE id=?"
            );
            $stmt2->bind_param('i', $appId);
            $stmt2->execute();
            $app = stmt_fetch_one($stmt2);

            if ($app && $app['email']) {
                if ($action === 'approve') {
                    $subject = "AgroBusiness Malawi — Application Approved! ({$app['application_ref']})";
                    $msg     = "Dear {$app['full_name']},\n\nGreat news! Your application ({$app['application_ref']}) "
                        . "has been APPROVED.\n\nYou can now use all features of AgroBusiness Malawi.\n\n"
                        . ($notes ? "Admin notes: {$notes}\n\n" : '')
                        . "Welcome to the platform!\nAgroBusiness Malawi Team";
                } else {
                    $subject = "AgroBusiness Malawi — Application Update ({$app['application_ref']})";
                    $msg     = "Dear {$app['full_name']},\n\nUnfortunately, your application ({$app['application_ref']}) "
                        . "could not be approved at this time.\n\n"
                        . ($notes ? "Reason: {$notes}\n\n" : '')
                        . "Please contact us if you have questions.\nAgroBusiness Malawi Team";
                }
                send_smtp_email($app['email'], $subject, $msg);
            }

            echo json_encode([
                'success'   => true,
                'message'   => "Application {$newStatus}",
                'ref'       => $app['application_ref'] ?? '',
                'timestamp' => date('c')
            ]);
            break;

        // ─── PRICE DATA ─────────────────────────────────────────────────────────

        case 'dual_crop_prices':
            $crop_id = isset($_GET['crop_id']) ? (int)$_GET['crop_id'] : null;

            $fews_cache = ['data' => [], 'source_url' => null, 'fetched_at' => null, 'error' => null];
            try {
                $fews_cache = fews_get_prices($mysqli);
            } catch (Throwable $fe) {
                $fews_cache['error'] = $fe->getMessage();
            }
            $fews = $fews_cache['data'] ?? [];
            if ($crop_id) {
                $fews = array_values(array_filter($fews, function ($r) use ($crop_id) {
                    return (int)$r['crop_id'] === $crop_id;
                }));
            }

            $community = [];
            $community_error = null;
            try {
                if ($crop_id) {
                    $stmt2 = $mysqli->prepare(
                        "SELECT cp.crop_id, c.name as crop_name,
                                d.name as district_name, cp.district_id,
                                cp.market_name,
                                ROUND(AVG(cp.price_per_kg),0) as avg_price,
                                ROUND(AVG(cp.price_per_bag),0) as avg_price_bag,
                                MIN(cp.price_per_kg) as min_price,
                                MIN(cp.price_per_bag) as min_price_bag,
                                MAX(cp.price_per_kg) as max_price,
                                MAX(cp.price_per_bag) as max_price_bag,
                                COUNT(*) as report_count,
                                MAX(cp.created_at) as last_reported,
                                cp.unit
                         FROM crowdsourced_prices cp
                         JOIN crops c ON cp.crop_id = c.id
                         LEFT JOIN districts d ON cp.district_id = d.id
                         WHERE cp.crop_id = ?
                         GROUP BY cp.crop_id, cp.district_id, cp.market_name
                         ORDER BY report_count DESC, last_reported DESC"
                    );
                    if (!$stmt2) throw new Exception($mysqli->error);
                    $stmt2->bind_param('i', $crop_id);
                } else {
                    $stmt2 = $mysqli->prepare(
                        "SELECT cp.crop_id, c.name as crop_name,
                                d.name as district_name, cp.district_id,
                                cp.market_name,
                                ROUND(AVG(cp.price_per_kg),0) as avg_price,
                                ROUND(AVG(cp.price_per_bag),0) as avg_price_bag,
                                MIN(cp.price_per_kg) as min_price,
                                MIN(cp.price_per_bag) as min_price_bag,
                                MAX(cp.price_per_kg) as max_price,
                                MAX(cp.price_per_bag) as max_price_bag,
                                COUNT(*) as report_count,
                                MAX(cp.created_at) as last_reported,
                                cp.unit
                         FROM crowdsourced_prices cp
                         JOIN crops c ON cp.crop_id = c.id
                         LEFT JOIN districts d ON cp.district_id = d.id
                         GROUP BY cp.crop_id, cp.district_id, cp.market_name
                         ORDER BY c.name, report_count DESC"
                    );
                    if (!$stmt2) throw new Exception($mysqli->error);
                }
                $stmt2->execute();
                $community = stmt_fetch_all($stmt2);
            } catch (Throwable $ce) {
                $community_error = $ce->getMessage();
            }

            echo json_encode([
                'success'          => true,
                'fews'             => $fews,
                'community'        => $community,
                'fews_count'       => count($fews),
                'community_count'  => count($community),
                'fews_source'      => $fews_cache['source_url'] ?? null,
                'fews_cached_at'   => $fews_cache['fetched_at'] ?? null,
                'fews_error'       => $fews_cache['error'] ?? null,
                'community_error'  => $community_error,
            ]);
            break;

        case 'submit_price':
            // Farmer submits a crowdsourced price
            $body = json_decode(file_get_contents('php://input'), true) ?? [];
            $crop_id    = (int)($body['crop_id']    ?? 0);
            $district_id = isset($body['district_id']) ? (int)$body['district_id'] : null;
            $price      = (float)($body['price_per_kg'] ?? 0);
            $unit       = preg_replace('/[^a-zA-Z\/]/', '', $body['unit'] ?? 'kg');
            $market     = mb_substr(trim($body['market_name'] ?? ''), 0, 200);
            $phone      = mb_substr(trim($body['phone'] ?? 'anonymous'), 0, 50);
            $channel    = in_array($body['channel'] ?? 'web', ['web', 'ussd']) ? ($body['channel'] ?? 'web') : 'web';

            if (!$crop_id || $price <= 0) {
                throw new Exception('crop_id and price_per_kg are required.');
            }
            if ($price > 100000) {
                throw new Exception('Price seems too high. Please enter price per kg in MWK.');
            }

            $price_per_bag = round($price * 50, 2);
            $stmt = $mysqli->prepare(
                "INSERT INTO crowdsourced_prices
                 (crop_id, district_id, price_per_kg, price_per_bag, unit, market_name, submitted_by, channel)
                 VALUES (?,?,?,?,?,?,?,?)"
            );
            $stmt->bind_param('iiddssss', $crop_id, $district_id, $price, $price_per_bag, $unit, $market, $phone, $channel);
            $stmt->execute();

            echo json_encode([
                'success' => true,
                'message' => 'Price report submitted. Thank you for helping fellow farmers!',
                'id'      => $mysqli->insert_id,
            ]);
            break;

        case 'fews_prices_refresh':
            $adminToken = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? $_GET['token'] ?? '';
            if ($adminToken !== ($_ENV['ADMIN_TOKEN'] ?? 'agro_admin_2024')) {
                throw new Exception('Unauthorized.');
            }
            $cacheFile = __DIR__ . '/config/fews_prices_cache.json';
            if (file_exists($cacheFile)) unlink($cacheFile);
            $result = fews_get_prices($mysqli);
            echo json_encode([
                'success'       => true,
                'rows'          => count($result['data'] ?? []),
                'source_url'    => $result['source_url'] ?? null,
                'error'         => $result['error'] ?? null,
                'fetched_at'    => $result['fetched_at'] ?? null,
            ]);
            break;

        // ── TEST: Send a test email via SMTP ────────────────────────
        case 'test_email':
            $adminToken    = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? ($_GET['token'] ?? '');
            $envAdminToken = $_ENV['ADMIN_TOKEN'] ?? 'agro_admin_2024';
            if ($adminToken !== $envAdminToken) {
                throw new Exception('Unauthorised — provide valid admin token');
            }
            $toAddr = trim($_GET['to'] ?? '');
            if (!$toAddr || !filter_var($toAddr, FILTER_VALIDATE_EMAIL)) {
                throw new Exception('Provide a valid "to" email address: ?to=you@example.com');
            }
            $testSubject = 'AgroBusiness Malawi — SMTP Test';
            $testBody    = "Hello,\n\nThis is a test email from AgroBusiness Malawi to confirm that SMTP is configured correctly.\n\n"
                         . "Sent: " . date('Y-m-d H:i:s T') . "\n\nAgroBusiness Malawi Team";
            $sent = send_smtp_email($toAddr, $testSubject, $testBody);
            echo json_encode([
                'success'   => $sent,
                'message'   => $sent ? "Test email sent to {$toAddr}" : 'SMTP send failed — check server logs',
                'to'        => $toAddr,
                'smtp_host' => $_ENV['Outgoing Server'] ?? '(not set)',
                'smtp_port' => $_ENV['SMTP Port'] ?? '(not set)',
                'smtp_user' => $_ENV['Username'] ?? '(not set)',
                'timestamp' => date('c'),
            ]);
            break;

        default:
            throw new Exception('Invalid action specified. Available actions: test, districts, crops, crop_prices, dual_crop_prices, submit_price, fews_prices_refresh, market_insights, sellers, buyers, pest_control, farming_tips, basic_info, submit_application, check_application, admin_applications, admin_review, test_email');
    }
} catch (Throwable $e) {
    ob_clean();
    http_response_code(200);
    echo json_encode([
        'success'   => false,
        'error'     => $e->getMessage(),
        'action'    => $action ?? '',
        'timestamp' => date('c')
    ]);
}

// ─── FEWS NET PRICE FETCH + FILE CACHE ──────────────────────────────────────

function fews_get_prices($db)
{
    $cacheFile = __DIR__ . '/config/fews_prices_cache.json';
    $ttl = 6 * 3600;

    if (file_exists($cacheFile)) {
        $cached = json_decode(file_get_contents($cacheFile), true);
        if ($cached && isset($cached['data']) && (time() - (int)($cached['fetched_at'] ?? 0)) < $ttl) {
            return $cached;
        }
    }

    $fresh = fews_fetch_prices($db);
    $fresh['fetched_at'] = time();
    @file_put_contents($cacheFile, json_encode($fresh), LOCK_EX);
    return $fresh;
}

function fews_fetch_prices($db)
{
    $sourceUrl = 'https://fdw.fews.net/api/marketpricefacts/?format=json&country_code=MW&ordering=-period_date&page_size=250';
    $ctx = stream_context_create(['http' => [
        'timeout' => 20,
        'user_agent' => 'AgroBusiness-Malawi/1.0',
    ]]);
    $raw = @file_get_contents($sourceUrl, false, $ctx);
    if (!$raw) {
        return ['data' => [], 'source_url' => $sourceUrl, 'error' => 'FEWS NET prices unavailable. Showing community prices only.'];
    }

    $json = json_decode($raw, true);
    if (!is_array($json) || !isset($json['results']) || !is_array($json['results'])) {
        return ['data' => [], 'source_url' => $sourceUrl, 'error' => 'FEWS NET returned an unexpected response.'];
    }

    $cropMap = [];
    $r = $db->query("SELECT id, name FROM crops");
    while ($row = $r->fetch_assoc()) {
        $cropMap[] = ['id' => (int)$row['id'], 'name' => $row['name'], 'match' => strtolower($row['name'])];
    }

    $aliases = [
        'maize' => ['maize', 'maize grain'],
        'rice' => ['rice', 'rice milled'],
        'beans' => ['beans', 'bean', 'cowpeas', 'cowpea'],
        'groundnuts' => ['groundnut', 'groundnuts', 'peanut'],
        'cassava' => ['cassava'],
        'sorghum' => ['sorghum'],
        'millet' => ['millet'],
        'soybeans' => ['soybean', 'soybeans', 'soya'],
        'tobacco' => ['tobacco'],
    ];

    $districtMap = fews_district_map($db);

    $rows = [];
    $seen = [];
    foreach ($json['results'] as $item) {
        if (($item['country_code'] ?? '') !== 'MW' || !isset($item['value'])) continue;

        $product = strtolower($item['product'] ?? '');
        $matched = null;
        foreach ($cropMap as $crop) {
            $terms = $aliases[$crop['match']] ?? [$crop['match']];
            foreach ($terms as $term) {
                if (strpos($product, $term) !== false) {
                    $matched = $crop;
                    break 2;
                }
            }
        }
        if (!$matched) continue;

        $key = $matched['id'] . '|' . ($item['market'] ?? '') . '|' . ($item['period_date'] ?? '');
        if (isset($seen[$key])) continue;
        $seen[$key] = true;

        $marketName = $item['market'] ?? '';
        $district = fews_match_district($marketName, $districtMap);

        $rows[] = [
            'crop_id' => $matched['id'],
            'crop_name' => $matched['name'],
            'district_id' => $district['id'],
            'district_name' => $district['name'] ?: ($item['admin_1'] ?? ''),
            'market_name' => $marketName,
            'price' => (float)$item['value'],
            'price_type' => $item['price_type'] ?? 'Retail',
            'unit' => $item['unit'] ?? 'kg',
            'currency' => $item['currency'] ?? 'MWK',
            'price_date' => $item['period_date'] ?? null,
            'source_organization' => $item['source_organization'] ?? 'FEWS NET',
        ];
    }

    return [
        'data' => $rows,
        'source_url' => $sourceUrl,
        'error' => empty($rows) ? 'FEWS NET returned no Malawi crop prices matching local crops.' : null,
    ];
}

function fews_district_map($db)
{
    $map = [];
    $r = $db->query("SELECT id, name FROM districts");
    while ($row = $r->fetch_assoc()) {
        $map[] = ['id' => (int)$row['id'], 'name' => $row['name'], 'match' => strtolower($row['name'])];
    }
    return $map;
}

function fews_match_district($marketName, $districtMap)
{
    $market = strtolower($marketName);
    foreach ($districtMap as $district) {
        if (strpos($market, $district['match']) !== false) {
            return ['id' => $district['id'], 'name' => $district['name']];
        }
    }
    return ['id' => null, 'name' => ''];
}

// Close database connection
if (isset($mysqli)) {
    $mysqli->close();
}
