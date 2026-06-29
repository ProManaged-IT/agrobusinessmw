<?php
/**
 * AgroBusiness Malawi — USSD Handler
 *
 * Single entry point for Airtel/TNM gateway POST requests.
 * Gateway must POST to: https://agrobusinessmw.com/api/index.php
 *
 * POST params: sessionId, phoneNumber, serviceCode, text
 * Replies:     CON <menu>   → session continues
 *              END <text>   → session ends
 *
 * Navigation model (stateless):
 *   - text field accumulates all inputs separated by *
 *   - "0" pressed by user = go back (pops last forward input from nav stack)
 *   - "99" = next page within a list
 *   - Any other number = forward selection
 */

error_reporting(0);
ini_set('display_errors', 0);

// ─── DB CONNECTION ────────────────────────────────────────────────────────────

$envFile = dirname(__DIR__) . '/.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (empty($line) || $line[0] === '#' || strpos($line, '=') === false) continue;
        [$k, $v] = explode('=', $line, 2);
        $_ENV[trim($k)] = trim($v);
    }
}

$isLocal = in_array($_SERVER['SERVER_NAME'] ?? 'localhost', ['localhost', '127.0.0.1']);
$host    = $isLocal ? ($_ENV['DB_HOST'] ?? 'promanaged-it.com') : 'localhost';
$db      = @new mysqli(
    $host,
    $_ENV['DB_USER'] ?? '',
    $_ENV['DB_PASS'] ?? '',
    $_ENV['DB_NAME'] ?? '',
    (int)($_ENV['DB_PORT'] ?? 3306)
);
if ($db->connect_error) {
    ussd_end("Service unavailable. Please try again later.");
}
$db->set_charset('utf8mb4');

// ─── PARSE NAVIGATION STACK ───────────────────────────────────────────────────
// Split text by *, then process each input:
//   "0" = pop (back), "99"/"98" = page nav, anything else = forward selection

$rawText = trim($_POST['text'] ?? '');
$nav     = [];
foreach ($rawText === '' ? [] : explode('*', $rawText) as $in) {
    $in = trim($in);
    if ($in === '0') {
        array_pop($nav);                    // back: remove last forward step
    } elseif ($in !== '') {
        $nav[] = $in;                       // forward: record selection
    }
}
$depth = count($nav);

ussd_log("nav=[" . implode(',', $nav) . "] text={$rawText}");

// ─── MAIN MENU ────────────────────────────────────────────────────────────────

if ($depth === 0) {
    ussd_con(
        "AgroBusiness Malawi\n" .
        "1.Crop Prices\n" .
        "2.Weather\n" .
        "3.Market Insights\n" .
        "4.Find Sellers\n" .
        "5.Find Buyers\n" .
        "6.Pest Control\n" .
        "7.Farming Tips\n" .
        "8.Basic Info\n" .
        "9.Register / KYC\n" .
        "0.Exit"
    );
}

$svc = (int)$nav[0];
if ($svc === 0) {
    ussd_end("Thank you for using AgroBusiness Malawi. Goodbye!");
}
if ($svc < 1 || $svc > 9) {
    ussd_end("Invalid option. Please dial again.");
}

// ─── SERVICE DISPATCH ─────────────────────────────────────────────────────────

$pos = 1; // nav[0] is always the service; handlers start reading from pos 1

switch ($svc) {
    case 1: svc_crop_prices($db, $nav, $pos);    break;
    case 2: svc_weather($db, $nav, $pos);         break;
    case 3: svc_market_insights($db, $nav, $pos); break;
    case 4: svc_sellers($db, $nav, $pos);         break;
    case 5: svc_buyers($db, $nav, $pos);          break;
    case 6: svc_pest_control($db, $nav, $pos);    break;
    case 7: svc_farming_tips($db, $nav, $pos);    break;
    case 8: svc_basic_info($db, $nav, $pos);      break;
    case 9: svc_register($db, $nav, $pos, $_POST['phoneNumber'] ?? ''); break;
}

// ─── SERVICE HANDLERS ─────────────────────────────────────────────────────────

function svc_crop_prices($db, $nav, $pos) {
    $depth = count($nav);

    // Sub-menu: choose price source or submit
    if ($pos >= $depth) {
        ussd_con("Crop Prices\n1.ADMARC Official\n2.Community Reports\n3.Report a Price\n0.Back");
    }

    $mode = (int)$nav[$pos++];
    if (!in_array($mode, [1,2,3])) ussd_end("Invalid option. Select 1, 2 or 3.");

    // ── REPORT A PRICE (mode 3) ───────────────────────────────────────────────
    if ($mode === 3) {
        $crops = db_all($db, "SELECT id, name FROM crops ORDER BY name");

        // Step: select crop
        $cropStep = nav_step($nav, $pos);
        if ($cropStep === null || $cropStep['action'] === 'page') {
            list_page($crops, $cropStep['page'] ?? 1, "Report - Select Crop");
        }
        $crop = $crops[$cropStep['idx']] ?? null;
        if (!$crop) ussd_end("Invalid crop.");

        // Step: enter price per kg
        if ($pos >= $depth) {
            ussd_con("Reporting: {$crop['name']}\nEnter price per kg (MWK)\nE.g. 250:");
        }
        $priceInput = trim($nav[$pos++]);
        $price = (float)preg_replace('/[^\d.]/', '', $priceInput);
        if ($price <= 0 || $price > 100000) ussd_end("Invalid price. Enter a number in MWK e.g. 250");

        // Step: enter market name
        if ($pos >= $depth) {
            ussd_con("Enter market name\n(or type SKIP):");
        }
        $market = trim($nav[$pos++]);
        if (strtolower($market) === 'skip') $market = '';

        // Step: confirm
        if ($pos >= $depth) {
            ussd_con("Confirm report:\n{$crop['name']}: MK{$price}/kg\nMarket: " . ($market ?: 'Not given') . "\n1.Submit\n2.Cancel");
        }
        $confirm = (int)$nav[$pos++];
        if ($confirm !== 1) ussd_end("Report cancelled.");

        $callerPhone = $_POST['phoneNumber'] ?? 'ussd-unknown';
        $stmt = $db->prepare(
            "INSERT INTO crowdsourced_prices (crop_id, price_per_kg, unit, market_name, submitted_by, channel)
             VALUES (?,?,'kg',?,?,'ussd')"
        );
        $stmt->bind_param('idss', $crop['id'], $price, $market, $callerPhone);
        $stmt->execute();
        ussd_end("Price reported!\n{$crop['name']}: MK{$price}/kg\nThank you for helping fellow farmers.");
    }

    // ── SELECT CROP (modes 1 & 2) ─────────────────────────────────────────────
    $crops = db_all($db, "SELECT id, name FROM crops ORDER BY name");
    $cropStep = nav_step($nav, $pos);
    if ($cropStep === null || $cropStep['action'] === 'page') {
        $title = $mode === 1 ? "ADMARC Prices" : "Community Prices";
        list_page($crops, $cropStep['page'] ?? 1, $title . " - Crop");
    }
    $crop = $crops[$cropStep['idx']] ?? null;
    if (!$crop) ussd_end("Invalid crop.");

    if ($mode === 1) {
        // ── ADMARC OFFICIAL PRICES — read from shared file cache ─────────────
        $cacheFile = dirname(__DIR__) . '/config/admarc_cache.json';
        $cached    = file_exists($cacheFile) ? json_decode(file_get_contents($cacheFile), true) : null;
        $allRows   = $cached['data'] ?? [];

        // Filter to this crop and take up to 3 depots
        $rows = array_values(array_filter($allRows, fn($r) => (int)$r['crop_id'] === (int)$crop['id']));
        $rows = array_slice($rows, 0, 3);

        if (empty($rows)) {
            $age = $cached ? round((time() - $cached['fetched_at']) / 3600) . 'h ago' : 'never fetched';
            ussd_end("No ADMARC data for {$crop['name']}.\nCache: {$age}.\nTry option 2 for community prices.");
        }

        $out = "ADMARC: {$crop['name']}\n";
        foreach ($rows as $r) {
            $buy  = $r['buying_price']  ? 'MK' . number_format((float)$r['buying_price'])  : 'N/A';
            $sell = $r['selling_price'] ? 'MK' . number_format((float)$r['selling_price']) : 'N/A';
            $out .= "{$r['depot_name']}\nBuy:{$buy} Sell:{$sell}\n";
        }
        $out .= "Date: " . ($rows[0]['price_date'] ?? date('d/m/Y'));
        ussd_end(trim($out));

    } else {
        // ── COMMUNITY REPORTED PRICES ─────────────────────────────────────────
        $stmt = $db->prepare(
            "SELECT ROUND(AVG(price_per_kg),0) as avg_p,
                    MIN(price_per_kg) as min_p,
                    MAX(price_per_kg) as max_p,
                    COUNT(*) as reports,
                    unit
             FROM crowdsourced_prices
             WHERE crop_id = ?
               AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)"
        );
        $stmt->bind_param('i', $crop['id']);
        $stmt->execute();
        $agg = $stmt->get_result()->fetch_assoc();

        if (!$agg || !$agg['reports']) ussd_end("No community reports for {$crop['name']} yet.\nBe the first! Use option 3.");

        // Top 3 most recent reports
        $stmt2 = $db->prepare(
            "SELECT cp.price_per_kg, cp.market_name, d.name as district, cp.created_at
             FROM crowdsourced_prices cp
             LEFT JOIN districts d ON cp.district_id = d.id
             WHERE cp.crop_id = ?
             ORDER BY cp.created_at DESC LIMIT 3"
        );
        $stmt2->bind_param('i', $crop['id']);
        $stmt2->execute();
        $recent = $stmt2->get_result()->fetch_all(MYSQLI_ASSOC);

        $out  = "Community: {$crop['name']}\n";
        $out .= "Avg:MK{$agg['avg_p']} ({$agg['reports']} reports)\n";
        $out .= "Range:MK{$agg['min_p']}-MK{$agg['max_p']}\n";
        foreach ($recent as $r) {
            $mkt = $r['market_name'] ?: ($r['district'] ?: 'Unknown');
            $out .= "- MK{$r['price_per_kg']} at {$mkt}\n";
        }
        ussd_end(trim($out));
    }
}

function svc_weather($db, $nav, $pos) {
    $regionStep = nav_region($nav, $pos);
    if ($regionStep === null) {
        ussd_con("Weather\n1.Northern\n2.Central\n3.Southern\n0.Back");
    }

    $districts = region_districts($db, $regionStep);
    $distStep  = nav_step($nav, $pos);
    if ($distStep === null || $distStep['action'] === 'page') {
        list_page($districts, $distStep['page'] ?? 1, "Weather - District");
    }

    $district = $districts[$distStep['idx']] ?? null;
    if (!$district) ussd_end("Invalid district.");

    ussd_end(fetch_weather($district['name']));
}

function svc_market_insights($db, $nav, $pos) {
    $regionStep = nav_region($nav, $pos);
    if ($regionStep === null) {
        ussd_con("Market Insights\n1.Northern\n2.Central\n3.Southern\n0.Back");
    }

    $districts = region_districts($db, $regionStep);
    $distStep  = nav_step($nav, $pos);
    if ($distStep === null || $distStep['action'] === 'page') {
        list_page($districts, $distStep['page'] ?? 1, "Market - District");
    }

    $district = $districts[$distStep['idx']] ?? null;
    if (!$district) ussd_end("Invalid district.");

    $stmt = $db->prepare(
        "SELECT insight_en FROM market_insights WHERE district_id=? ORDER BY id DESC LIMIT 3"
    );
    $stmt->bind_param('i', $district['id']);
    $stmt->execute();
    $rows = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    if (empty($rows)) ussd_end("No market data for {$district['name']} yet.");

    $out = "Market: {$district['name']}\n";
    foreach ($rows as $r) {
        $out .= "- " . mb_substr($r['insight_en'], 0, 60) . "\n";
    }
    ussd_end(trim($out));
}

function svc_sellers($db, $nav, $pos) {
    $regionStep = nav_region($nav, $pos);
    if ($regionStep === null) {
        ussd_con("Find Sellers\n1.Northern\n2.Central\n3.Southern\n0.Back");
    }

    $districts = region_districts($db, $regionStep);
    $distStep  = nav_step($nav, $pos);
    if ($distStep === null || $distStep['action'] === 'page') {
        list_page($districts, $distStep['page'] ?? 1, "Sellers - District");
    }

    $district = $districts[$distStep['idx']] ?? null;
    if (!$district) ussd_end("Invalid district.");

    $stmt = $db->prepare(
        "SELECT s.name, scd.phone_number
         FROM sellers s
         JOIN seller_contact_details scd ON s.contact_id = scd.id
         WHERE s.district_id = ?
         ORDER BY s.name"
    );
    $stmt->bind_param('i', $district['id']);
    $stmt->execute();
    $sellers = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    if (empty($sellers)) ussd_end("No sellers found in {$district['name']}.");

    // Paginate sellers list
    $selStep = nav_step($nav, $pos);
    if ($selStep === null || $selStep['action'] === 'page') {
        list_page($sellers, $selStep['page'] ?? 1, "Sellers: {$district['name']}",
            fn($s) => $s['name'] . ' ' . $s['phone_number']);
    }

    $seller = $sellers[$selStep['idx']] ?? null;
    if (!$seller) ussd_end("Invalid selection.");
    ussd_end("{$seller['name']}\nPhone: {$seller['phone_number']}");
}

function svc_buyers($db, $nav, $pos) {
    $regionStep = nav_region($nav, $pos);
    if ($regionStep === null) {
        ussd_con("Find Buyers\n1.Northern\n2.Central\n3.Southern\n0.Back");
    }

    $districts = region_districts($db, $regionStep);
    $distStep  = nav_step($nav, $pos);
    if ($distStep === null || $distStep['action'] === 'page') {
        list_page($districts, $distStep['page'] ?? 1, "Buyers - District");
    }

    $district = $districts[$distStep['idx']] ?? null;
    if (!$district) ussd_end("Invalid district.");

    $stmt = $db->prepare(
        "SELECT b.name, bcd.phone_number
         FROM buyers b
         JOIN buyer_contact_details bcd ON b.contact_id = bcd.id
         WHERE b.district_id = ?
         ORDER BY b.name"
    );
    $stmt->bind_param('i', $district['id']);
    $stmt->execute();
    $buyers = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    if (empty($buyers)) ussd_end("No buyers found in {$district['name']}.");

    // Paginate buyers list
    $buyStep = nav_step($nav, $pos);
    if ($buyStep === null || $buyStep['action'] === 'page') {
        list_page($buyers, $buyStep['page'] ?? 1, "Buyers: {$district['name']}",
            fn($b) => $b['name'] . ' ' . $b['phone_number']);
    }

    $buyer = $buyers[$buyStep['idx']] ?? null;
    if (!$buyer) ussd_end("Invalid selection.");
    ussd_end("{$buyer['name']}\nPhone: {$buyer['phone_number']}");
}

function svc_pest_control($db, $nav, $pos) {
    $regionStep = nav_region($nav, $pos);
    if ($regionStep === null) {
        ussd_con("Pest Control\n1.Northern\n2.Central\n3.Southern\n0.Back");
    }

    $districts = region_districts($db, $regionStep);
    $distStep  = nav_step($nav, $pos);
    if ($distStep === null || $distStep['action'] === 'page') {
        list_page($districts, $distStep['page'] ?? 1, "Pest - District");
    }

    $district = $districts[$distStep['idx']] ?? null;
    if (!$district) ussd_end("Invalid district.");

    $crops    = db_all($db, "SELECT id, name FROM crops ORDER BY name");
    $cropStep = nav_step($nav, $pos);
    if ($cropStep === null || $cropStep['action'] === 'page') {
        list_page($crops, $cropStep['page'] ?? 1, "Pest - Crop");
    }

    $crop = $crops[$cropStep['idx']] ?? null;
    if (!$crop) ussd_end("Invalid crop.");

    $stmt = $db->prepare(
        "SELECT tip_en FROM pest_control_tips
         WHERE crop_id=? AND district_id=?
         ORDER BY id ASC LIMIT 3"
    );
    $stmt->bind_param('ii', $crop['id'], $district['id']);
    $stmt->execute();
    $tips = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    if (empty($tips)) {
        ussd_end("No pest tips for {$crop['name']} in {$district['name']}.");
    }

    $out = "Pest: {$crop['name']} / {$district['name']}\n";
    foreach ($tips as $t) {
        $out .= "- " . mb_substr($t['tip_en'], 0, 55) . "\n";
    }
    ussd_end(trim($out));
}

function svc_farming_tips($db, $nav, $pos) {
    $crops    = db_all($db, "SELECT id, name FROM crops ORDER BY name");
    $cropStep = nav_step($nav, $pos);
    if ($cropStep === null || $cropStep['action'] === 'page') {
        list_page($crops, $cropStep['page'] ?? 1, "Farming Tips - Crop");
    }

    $crop = $crops[$cropStep['idx']] ?? null;
    if (!$crop) ussd_end("Invalid crop.");

    $stmt = $db->prepare(
        "SELECT practice_type, practice_en
         FROM farming_best_practices
         WHERE crop_id=?
         ORDER BY practice_type
         LIMIT 4"
    );
    $stmt->bind_param('i', $crop['id']);
    $stmt->execute();
    $practices = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    if (empty($practices)) ussd_end("No farming tips for {$crop['name']} yet.");

    $out = "Tips: {$crop['name']}\n";
    foreach ($practices as $p) {
        $out .= "- " . mb_substr($p['practice_en'], 0, 55) . "\n";
    }
    ussd_end(trim($out));
}

function svc_basic_info($db, $nav, $pos) {
    $topics    = db_all($db, "SELECT id, topic, info_en FROM basic_farming_info ORDER BY id");
    $topicStep = nav_step($nav, $pos);
    if ($topicStep === null || $topicStep['action'] === 'page') {
        list_page($topics, $topicStep['page'] ?? 1, "Basic Info");
    }

    $topic = $topics[$topicStep['idx']] ?? null;
    if (!$topic) ussd_end("Invalid selection.");

    $info = mb_substr($topic['info_en'], 0, 130);
    ussd_end("{$topic['topic']}:\n{$info}");
}

// ─── USSD REGISTRATION ───────────────────────────────────────────────────────

function svc_register($db, $nav, $pos, $callerPhone) {
    $depth = count($nav);

    // Collect inputs step by step using text-input reads (no page logic)
    // nav[0]=9, nav[1]=type, nav[2]=name, nav[3]=nationalId, nav[4]=region,
    // nav[5]=district (within region), nav[6]=village (optional/SKIP), nav[7]=confirm

    // Step: choose type
    if ($pos >= $depth) {
        ussd_con("Register\nI am a:\n1.Farmer\n2.Seller\n3.Buyer\n0.Back");
    }

    $typeInput = (int)$nav[$pos++];
    $typeMap   = [1 => 'farmer', 2 => 'seller', 3 => 'buyer'];
    $userType  = $typeMap[$typeInput] ?? null;
    if (!$userType) ussd_end("Invalid type. Please select 1, 2 or 3.");

    // Step: full name
    if ($pos >= $depth) {
        ussd_con("Register (" . ucfirst($userType) . ")\nEnter your full name:");
    }
    $fullName = trim($nav[$pos++]);
    if (strlen($fullName) < 2) ussd_end("Name too short. Please re-dial and enter your full name.");

    // Step: national ID
    if ($pos >= $depth) {
        ussd_con("Enter your National ID\n(or type SKIP to continue):");
    }
    $nationalId = trim($nav[$pos++]);
    if (strtolower($nationalId) === 'skip') $nationalId = '';

    // Step: region
    if ($pos >= $depth) {
        ussd_con("Select Region:\n1.Northern\n2.Central\n3.Southern\n0.Back");
    }
    $regionInput = nav_region($nav, $pos);
    if ($regionInput === null) ussd_con("Select Region:\n1.Northern\n2.Central\n3.Southern\n0.Back");

    // Step: district from region
    $districts = region_districts($db, $regionInput);
    $distStep  = nav_step($nav, $pos);
    if ($distStep === null || $distStep['action'] === 'page') {
        $page = $distStep['page'] ?? 1;
        list_page($districts, $page, "Select District");
    }
    $district = $districts[$distStep['idx']] ?? null;
    if (!$district) ussd_end("Invalid district selection.");

    // Step: village / area
    if ($pos >= $depth) {
        ussd_con("Enter your village/area\n(or type SKIP):");
    }
    $village = trim($nav[$pos++]);
    if (strtolower($village) === 'skip') $village = '';

    // Step: confirm
    if ($pos >= $depth) {
        ussd_con(
            "Confirm registration:\n" .
            "Type: " . ucfirst($userType) . "\n" .
            "Name: {$fullName}\n" .
            "District: {$district['name']}\n" .
            "1.Confirm\n2.Cancel"
        );
    }

    $confirm = (int)$nav[$pos++];
    if ($confirm !== 1) ussd_end("Registration cancelled.");

    // Submit to DB
    $phone = $callerPhone ?: 'unknown';
    $ref   = 'AGR-' . date('Ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 5));

    $stmt = $db->prepare(
        "INSERT INTO onboarding_applications
         (application_ref, user_type, full_name, phone_number, national_id,
          district_id, village, channel)
         VALUES (?,?,?,?,?,?,?,'ussd')"
    );
    $stmt->bind_param(
        'sssssss',
        $ref, $userType, $fullName, $phone, $nationalId,
        $district['id'], $village
    );
    $stmt->execute();

    ussd_end(
        "Registration submitted!\n" .
        "Ref: {$ref}\n" .
        "We will review and notify you.\n" .
        "Save your reference number."
    );
}

// ─── NAVIGATION HELPERS ───────────────────────────────────────────────────────

define('PAGE_SIZE', 5);

/**
 * Read one navigation step from $nav starting at &$pos.
 * Handles "99" (next page) and "98" (prev page) within the step.
 * Advances &$pos past all inputs consumed by this step.
 *
 * Returns:
 *   null                              — no input yet (show page 1)
 *   ['action'=>'page', 'page'=>N]     — still paginating, show page N
 *   ['action'=>'select', 'idx'=>N, 'page'=>N] — item selected, absolute index
 */
function nav_step(array $nav, int &$pos): ?array {
    if ($pos >= count($nav)) return null;

    $page = 1;
    while ($pos < count($nav)) {
        $in = $nav[$pos++];
        if ($in === '99') {
            $page++;
        } elseif ($in === '98') {
            $page = max(1, $page - 1);
        } else {
            $sel = (int)$in;
            if ($sel >= 1 && $sel <= PAGE_SIZE) {
                $idx = ($page - 1) * PAGE_SIZE + ($sel - 1);
                return ['action' => 'select', 'idx' => $idx, 'page' => $page];
            }
            // Out-of-range number: treat as invalid, stay on page
        }
    }

    // Consumed inputs but only got page navigation — show that page
    return ['action' => 'page', 'page' => $page];
}

/**
 * Read region selection (1/2/3) from nav at &$pos.
 * Returns region index (1-3) or null if no input yet.
 */
function nav_region(array $nav, int &$pos): ?int {
    if ($pos >= count($nav)) return null;
    $r = (int)$nav[$pos++];
    if ($r < 1 || $r > 3) {
        // Undo the advance so the caller can re-show the region menu
        $pos--;
        return null;
    }
    return $r;
}

// ─── LIST DISPLAY ─────────────────────────────────────────────────────────────

/**
 * Display a paginated list via CON. Never returns — calls ussd_con().
 * Items must have a 'name' key, or pass $labelFn callable.
 */
function list_page(array $items, int $page, string $title, ?callable $labelFn = null): void {
    $total  = count($items);
    $pages  = max(1, (int)ceil($total / PAGE_SIZE));
    $page   = max(1, min($page, $pages));
    $offset = ($page - 1) * PAGE_SIZE;
    $slice  = array_slice($items, $offset, PAGE_SIZE);

    $header = $pages > 1 ? "{$title} ({$page}/{$pages})" : $title;
    $out    = $header . "\n";

    foreach ($slice as $i => $item) {
        $label = $labelFn ? $labelFn($item) : ($item['name'] ?? '?');
        $out  .= ($i + 1) . ".{$label}\n";
    }

    $footer = [];
    if ($page < $pages) $footer[] = "99.More";
    if ($page > 1)      $footer[] = "98.Prev";
    $footer[] = "0.Back";
    $out .= implode(' ', $footer);

    ussd_con(trim($out));
}

// ─── DISTRICT HELPERS ─────────────────────────────────────────────────────────

const REGION_DISTRICTS = [
    1 => ['Chitipa','Karonga','Likoma','Mzimba','Nkhata Bay','Rumphi'],
    2 => ['Dedza','Dowa','Kasungu','Lilongwe','Mchinji','Nkhotakota','Ntcheu','Ntchisi','Salima'],
    3 => ['Balaka','Blantyre','Chikwawa','Chiradzulu','Machinga','Mangochi','Mulanje','Mwanza','Neno','Nsanje','Phalombe','Thyolo','Zomba'],
];

function region_districts($db, int $region): array {
    $names = REGION_DISTRICTS[$region] ?? [];
    if (empty($names)) return [];

    $ph   = implode(',', array_fill(0, count($names), '?'));
    $stmt = $db->prepare("SELECT id, name FROM districts WHERE name IN ({$ph}) ORDER BY name");
    $stmt->bind_param(str_repeat('s', count($names)), ...$names);
    $stmt->execute();
    return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
}

// ─── WEATHER ──────────────────────────────────────────────────────────────────

function fetch_weather(string $districtName): string {
    $coords = district_coords($districtName);
    if (!$coords) return "Weather unavailable for {$districtName}.";

    [$lat, $lon] = $coords;
    $url = "https://api.open-meteo.com/v1/forecast?latitude={$lat}&longitude={$lon}"
         . "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum"
         . "&timezone=Africa%2FBlantyre&forecast_days=3";

    $ctx  = stream_context_create(['http' => ['timeout' => 5]]);
    $raw  = @file_get_contents($url, false, $ctx);
    if (!$raw) return "Weather service timeout. Try again.";

    $data = json_decode($raw, true);
    if (!isset($data['daily']['time'])) return "Weather data error.";

    $d   = $data['daily'];
    $out = "Weather: {$districtName}\n";
    for ($i = 0; $i < 3 && isset($d['time'][$i]); $i++) {
        $day  = date('D d/m', strtotime($d['time'][$i]));
        $hi   = round($d['temperature_2m_max'][$i]);
        $lo   = round($d['temperature_2m_min'][$i]);
        $rain = round($d['precipitation_sum'][$i], 1);
        $out .= "{$day}: {$lo}-{$hi}C, Rain:{$rain}mm\n";
    }
    return trim($out);
}

function district_coords(string $name): ?array {
    $map = [
        'Balaka'     => [-14.9833,  34.9667],
        'Blantyre'   => [-15.7861,  35.0058],
        'Chikwawa'   => [-16.0333,  34.8000],
        'Chiradzulu' => [-15.6833,  35.1500],
        'Chitipa'    => [ -9.7000,  33.2667],
        'Dedza'      => [-14.3667,  34.3333],
        'Dowa'       => [-13.6500,  33.9333],
        'Karonga'    => [ -9.9333,  33.9333],
        'Kasungu'    => [-13.0333,  33.4667],
        'Likoma'     => [-12.0667,  34.7333],
        'Lilongwe'   => [-13.9669,  33.7873],
        'Machinga'   => [-14.9667,  35.5167],
        'Mangochi'   => [-14.4667,  35.2667],
        'Mchinji'    => [-13.8000,  32.8833],
        'Mulanje'    => [-16.0333,  35.5000],
        'Mwanza'     => [-15.6167,  34.5167],
        'Mzimba'     => [-11.9000,  33.6000],
        'Neno'       => [-15.4000,  34.6500],
        'Nkhata Bay' => [-11.6000,  34.3000],
        'Nkhotakota' => [-12.9167,  34.3000],
        'Nsanje'     => [-16.9167,  35.2500],
        'Ntcheu'     => [-14.8167,  34.6333],
        'Ntchisi'    => [-13.3833,  33.8833],
        'Phalombe'   => [-15.8000,  35.6500],
        'Rumphi'     => [-11.0167,  33.8500],
        'Salima'     => [-13.7833,  34.4500],
        'Thyolo'     => [-16.0667,  35.1333],
        'Zomba'      => [-15.3833,  35.3167],
    ];
    return $map[$name] ?? null;
}

// ─── DB HELPER ────────────────────────────────────────────────────────────────

function db_all(mysqli $db, string $sql): array {
    $r = $db->query($sql);
    return $r ? $r->fetch_all(MYSQLI_ASSOC) : [];
}

// ─── USSD OUTPUT ──────────────────────────────────────────────────────────────

function ussd_con(string $msg): never {
    ussd_respond('CON', $msg);
}

function ussd_end(string $msg): never {
    ussd_respond('END', $msg);
}

function ussd_respond(string $type, string $msg): never {
    // Trim to USSD safe length (182 chars for msg body)
    $msg = mb_substr(trim($msg), 0, 182);
    ussd_log("{$type}: " . substr($msg, 0, 80));
    header('Content-Type: text/plain; charset=utf-8');
    echo "{$type} {$msg}";
    exit;
}

function ussd_log(string $msg): void {
    $logFile = __DIR__ . '/../config/ussd_errors.log';
    $line    = '[' . date('d-M-Y H:i:s') . '] ' . $msg . "\n";
    @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
}
