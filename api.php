<?php
// AgroBusiness Malawi - Complete API Endpoints
// Place this file at: /home/p601229/public_html/agrobusinessmw/api.php

// --- CRITICAL FIX 1: ERROR CATCHING & JSON HEADERS ---
// This ensures even a crash returns readable JSON
http_response_code(200); // Force OK so frontend can read the error message
register_shutdown_function(function() {
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

$host     = $_ENV['DB_HOST']     ?? 'promanaged-it.com';
$username = $_ENV['DB_USER']     ?? '';
$password = $_ENV['DB_PASS']     ?? '';
$database = $_ENV['DB_NAME']     ?? '';
$port     = (int)($_ENV['DB_PORT'] ?? 3306);

// On production server, connect via localhost socket instead of remote host
$is_local = ($_SERVER['SERVER_NAME'] === 'localhost' || $_SERVER['SERVER_NAME'] === '127.0.0.1');
if (!$is_local) {
    $host = 'localhost';
}


// Connect to database
try {
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
        'hint' => $is_local ? "Is your IP whitelisted in CPanel > Remote MySQL?" : "Check database credentials.",
        'environment' => $is_local ? 'Local -> Remote' : 'Production',
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
                    'environment' => $is_local ? 'Local -> Remote' : 'Production',
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
            $result = $stmt->get_result();
            
            $insights = [];
            while ($row = $result->fetch_assoc()) {
                $insights[] = $row;
            }
            
            echo json_encode([
                'success' => true,
                'data' => $insights,
                'count' => count($insights),
                'timestamp' => date('c')
            ]);
            break;
            
        case 'sellers':
            // Get sellers for a district
            $district_id = (int)($_GET['district_id'] ?? 0);
            
            if (!$district_id) {
                throw new Exception('District ID is required');
            }
            
            $query = "
                SELECT 
                    s.id,
                    s.name,
                    s.district_id,
                    d.name as district_name,
                    scd.phone_number,
                    scd.email,
                    scd.address,
                    GROUP_CONCAT(c.name SEPARATOR ', ') as crops_display,
                    ROUND(AVG(r.rating_value), 1) as rating
                FROM sellers s
                JOIN districts d ON s.district_id = d.id
                JOIN seller_contact_details scd ON s.contact_id = scd.id
                LEFT JOIN seller_crops sc ON s.id = sc.seller_id
                LEFT JOIN crops c ON sc.crop_id = c.id
                LEFT JOIN ratings r ON s.id = r.seller_id
                WHERE s.district_id = ?
                GROUP BY s.id
                ORDER BY s.name ASC
            ";
            
            $stmt = $mysqli->prepare($query);
            $stmt->bind_param('i', $district_id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $sellers = [];
            while ($row = $result->fetch_assoc()) {
                $sellers[] = $row;
            }
            
            echo json_encode([
                'success' => true,
                'data' => $sellers,
                'count' => count($sellers),
                'timestamp' => date('c')
            ]);
            break;
            
        case 'buyers':
            // Get buyers for a district
            $district_id = (int)($_GET['district_id'] ?? 0);
            
            if (!$district_id) {
                throw new Exception('District ID is required');
            }
            
            $query = "
                SELECT 
                    b.id,
                    b.name,
                    b.district_id,
                    d.name as district_name,
                    bcd.phone_number,
                    bcd.email,
                    bcd.address,
                    GROUP_CONCAT(c.name SEPARATOR ', ') as crops_display
                FROM buyers b
                JOIN districts d ON b.district_id = d.id
                JOIN buyer_contact_details bcd ON b.contact_id = bcd.id
                LEFT JOIN buyer_crops bc ON b.id = bc.buyer_id
                LEFT JOIN crops c ON bc.crop_id = c.id
                WHERE b.district_id = ?
                GROUP BY b.id
                ORDER BY b.name ASC
            ";
            
            $stmt = $mysqli->prepare($query);
            $stmt->bind_param('i', $district_id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $buyers = [];
            while ($row = $result->fetch_assoc()) {
                $buyers[] = $row;
            }
            
            echo json_encode([
                'success' => true,
                'data' => $buyers,
                'count' => count($buyers),
                'timestamp' => date('c')
            ]);
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
            $result = $stmt->get_result();
            
            $tips = [];
            while ($row = $result->fetch_assoc()) {
                $tips[] = $row;
            }
            
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
            $result = $stmt->get_result();
            
            $practices = [];
            while ($row = $result->fetch_assoc()) {
                $practices[] = $row;
            }
            
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
            $channel   = in_array($body['channel'] ?? '', ['web','ussd']) ? $body['channel'] : 'web';

            if (!in_array($userType, ['farmer','seller','buyer'])) {
                throw new Exception('Invalid user type');
            }
            if (strlen($fullName) < 2) {
                throw new Exception('Full name is required');
            }
            if (!preg_match('/^\+?[0-9\s\-]{8,20}$/', $phone)) {
                throw new Exception('Valid phone number is required');
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
                $ref, $userType, $fullName, $phone, $email, $nationalId,
                $districtId, $village, $crops, $business, $channel
            );
            $stmt->execute();

            // Send confirmation email if provided
            if ($email) {
                $subject = "AgroBusiness Malawi — Application Received ({$ref})";
                $message = "Dear {$fullName},\n\nYour application has been received.\n"
                         . "Reference: {$ref}\nType: " . ucfirst($userType) . "\n\n"
                         . "We will review and notify you within 2-3 business days.\n\n"
                         . "AgroBusiness Malawi Team";
                @mail($email, $subject, $message,
                    "From: noreply@agrobusinessmw.com\r\nContent-Type: text/plain; charset=utf-8");
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
            $row = $stmt->get_result()->fetch_assoc();

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
            if (!in_array($status, ['pending','approved','denied','all'])) $status = 'pending';

            $sql = "SELECT a.id, a.application_ref, a.user_type, a.full_name, a.phone_number,
                           a.email, a.national_id, a.channel, a.status, a.created_at, a.reviewed_at,
                           d.name as district_name
                    FROM onboarding_applications a
                    LEFT JOIN districts d ON a.district_id = d.id";
            if ($status !== 'all') {
                $stmt3 = $mysqli->prepare($sql . " WHERE a.status = ? ORDER BY a.created_at DESC LIMIT 100");
                $stmt3->bind_param('s', $status);
                $stmt3->execute();
                $apps = $stmt3->get_result()->fetch_all(MYSQLI_ASSOC);
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

            if (!$appId || !in_array($action, ['approve','deny'])) {
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
            $app = $stmt2->get_result()->fetch_assoc();

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
                @mail($app['email'], $subject, $msg,
                    "From: noreply@agrobusinessmw.com\r\nContent-Type: text/plain; charset=utf-8");
            }

            echo json_encode([
                'success'   => true,
                'message'   => "Application {$newStatus}",
                'ref'       => $app['application_ref'] ?? '',
                'timestamp' => date('c')
            ]);
            break;

        // ─── DUAL PRICE DATA ────────────────────────────────────────────────────

        case 'dual_crop_prices':
            $crop_id = isset($_GET['crop_id']) ? (int)$_GET['crop_id'] : null;

            // ADMARC — live scrape with 6h file cache, no DB table needed
            $admarc_cache = admarc_get_prices($mysqli);
            $admarc = $admarc_cache['data'] ?? [];
            if ($crop_id) {
                $admarc = array_values(array_filter($admarc, fn($r) => (int)$r['crop_id'] === $crop_id));
            }

            // Community prices — aggregated per crop + district
            $community = [];
            if ($crop_id) {
                $stmt2 = $mysqli->prepare(
                    "SELECT cp.crop_id, c.name as crop_name,
                            d.name as district_name, cp.district_id,
                            cp.market_name,
                            ROUND(AVG(cp.price_per_kg),0) as avg_price,
                            MIN(cp.price_per_kg) as min_price,
                            MAX(cp.price_per_kg) as max_price,
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
                if (!$stmt2) throw new Exception('Community prices query failed: ' . $mysqli->error);
                $stmt2->bind_param('i', $crop_id);
            } else {
                $stmt2 = $mysqli->prepare(
                    "SELECT cp.crop_id, c.name as crop_name,
                            d.name as district_name, cp.district_id,
                            cp.market_name,
                            ROUND(AVG(cp.price_per_kg),0) as avg_price,
                            MIN(cp.price_per_kg) as min_price,
                            MAX(cp.price_per_kg) as max_price,
                            COUNT(*) as report_count,
                            MAX(cp.created_at) as last_reported,
                            cp.unit
                     FROM crowdsourced_prices cp
                     JOIN crops c ON cp.crop_id = c.id
                     LEFT JOIN districts d ON cp.district_id = d.id
                     GROUP BY cp.crop_id, cp.district_id, cp.market_name
                     ORDER BY c.name, report_count DESC"
                );
                if (!$stmt2) throw new Exception('Community prices query failed: ' . $mysqli->error);
            }
            $stmt2->execute();
            $r2 = $stmt2->get_result();
            $community = $r2 ? $r2->fetch_all(MYSQLI_ASSOC) : [];

            echo json_encode([
                'success'         => true,
                'admarc'          => $admarc,
                'community'       => $community,
                'admarc_count'    => count($admarc),
                'community_count' => count($community),
                'admarc_source'   => $admarc_cache['source_url'] ?? null,
                'admarc_cached_at'=> $admarc_cache['fetched_at'] ?? null,
                'admarc_error'    => $admarc_cache['error'] ?? null,
            ]);
            break;

        case 'submit_price':
            // Farmer submits a crowdsourced price
            $body = json_decode(file_get_contents('php://input'), true) ?? [];
            $crop_id    = (int)($body['crop_id']    ?? 0);
            $district_id= isset($body['district_id']) ? (int)$body['district_id'] : null;
            $price      = (float)($body['price_per_kg'] ?? 0);
            $unit       = preg_replace('/[^a-zA-Z\/]/', '', $body['unit'] ?? 'kg');
            $market     = mb_substr(trim($body['market_name'] ?? ''), 0, 200);
            $phone      = mb_substr(trim($body['phone'] ?? 'anonymous'), 0, 50);
            $channel    = in_array($body['channel'] ?? 'web', ['web','ussd']) ? ($body['channel'] ?? 'web') : 'web';

            if (!$crop_id || $price <= 0) {
                throw new Exception('crop_id and price_per_kg are required.');
            }
            if ($price > 100000) {
                throw new Exception('Price seems too high. Please enter price per kg in MWK.');
            }

            $stmt = $mysqli->prepare(
                "INSERT INTO crowdsourced_prices
                 (crop_id, district_id, price_per_kg, unit, market_name, submitted_by, channel)
                 VALUES (?,?,?,?,?,?,?)"
            );
            $stmt->bind_param('iidssss', $crop_id, $district_id, $price, $unit, $market, $phone, $channel);
            $stmt->execute();

            echo json_encode([
                'success' => true,
                'message' => 'Price report submitted. Thank you for helping fellow farmers!',
                'id'      => $mysqli->insert_id,
            ]);
            break;

        case 'admarc_scrape':
            // Force-refresh the ADMARC cache (admin-only)
            $adminToken = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? $_GET['token'] ?? '';
            if ($adminToken !== ($_ENV['ADMIN_TOKEN'] ?? 'agro_admin_2024')) {
                throw new Exception('Unauthorized.');
            }
            // Delete cache file so admarc_get_prices() fetches fresh
            $cacheFile = __DIR__ . '/config/admarc_cache.json';
            if (file_exists($cacheFile)) unlink($cacheFile);
            $result = admarc_get_prices($mysqli);
            echo json_encode([
                'success'       => true,
                'rows'          => count($result['data'] ?? []),
                'source_url'    => $result['source_url'] ?? null,
                'error'         => $result['error'] ?? null,
                'fetched_at'    => $result['fetched_at'] ?? null,
            ]);
            break;

        default:
            throw new Exception('Invalid action specified. Available actions: test, districts, crops, crop_prices, dual_crop_prices, submit_price, admarc_scrape, market_insights, sellers, buyers, pest_control, farming_tips, basic_info, submit_application, check_application, admin_applications, admin_review');
    }

} catch (Exception $e) {
    ob_clean();
    http_response_code(200);
    echo json_encode([
        'success'   => false,
        'error'     => $e->getMessage(),
        'action'    => $action ?? '',
        'timestamp' => date('c')
    ]);
}

// ─── ADMARC LIVE FETCH + FILE CACHE ─────────────────────────────────────────

/**
 * Returns cached ADMARC prices (6h TTL). Fetches live if cache is stale.
 * Never touches the admarc_prices DB table.
 */
function admarc_get_prices(mysqli $db): array {
    $cacheFile = __DIR__ . '/config/admarc_cache.json';
    $ttl       = 6 * 3600; // 6 hours

    if (file_exists($cacheFile)) {
        $cached = json_decode(file_get_contents($cacheFile), true);
        if ($cached && (time() - (int)($cached['fetched_at'] ?? 0)) < $ttl) {
            return $cached;
        }
    }

    $fresh = admarc_scrape_live($db);
    $fresh['fetched_at'] = time();
    @file_put_contents($cacheFile, json_encode($fresh), LOCK_EX);
    return $fresh;
}

/**
 * Fetches ADMARC commodity prices from their public website and returns
 * a structured array. No DB writes — caller decides what to do with the data.
 *
 * Returns: ['data'=>[...rows], 'source_url'=>'...', 'error'=>null|string]
 */
function admarc_scrape_live(mysqli $db): array {
    $sources = [
        'https://admarc.mw/commodity-prices',
        'https://www.admarc.mw/commodity-prices',
        'https://admarc.mw/prices',
        'https://admarc.co.mw/commodity-prices',
        'https://admarc.co.mw/prices',
    ];
    $ctx = stream_context_create(['http' => [
        'timeout'         => 10,
        'user_agent'      => 'Mozilla/5.0 (compatible; AgroBusiness-Malawi/1.0)',
        'follow_location' => 1,
    ]]);

    $html = null; $usedUrl = null;
    foreach ($sources as $url) {
        $raw = @file_get_contents($url, false, $ctx);
        if ($raw && strlen($raw) > 500) { $html = $raw; $usedUrl = $url; break; }
    }

    if (!$html) {
        return [
            'data'       => [],
            'source_url' => null,
            'error'      => 'ADMARC website unreachable. Showing community prices only.',
        ];
    }

    if (!class_exists('DOMDocument')) {
        return [
            'data'       => [],
            'source_url' => $usedUrl,
            'error'      => 'HTML parser unavailable on this server.',
        ];
    }

    // Build crop name → id map
    $cropMap = [];
    $r = $db->query("SELECT id, name FROM crops");
    while ($row = $r->fetch_assoc()) {
        $cropMap[strtolower($row['name'])] = ['id' => (int)$row['id'], 'name' => $row['name']];
    }

    libxml_use_internal_errors(true);
    $dom = new DOMDocument();
    $dom->loadHTML($html);
    libxml_clear_errors();
    $xpath = new DOMXPath($dom);

    $rows   = [];
    $today  = date('Y-m-d');

    foreach ($xpath->query('//table//tr') as $tr) {
        $cells = $xpath->query('td', $tr);
        if ($cells->length < 2) continue;
        $cols = [];
        foreach ($cells as $td) $cols[] = trim($td->textContent);

        // Match a crop name in any of the first two columns
        $matched = null;
        foreach ([0, 1] as $ci) {
            $lower = strtolower($cols[$ci] ?? '');
            foreach ($cropMap as $name => $info) {
                if (str_contains($lower, $name)) { $matched = $info; break 2; }
            }
        }
        if (!$matched) continue;

        // Extract all numeric values from the row
        $prices = [];
        foreach ($cols as $c) {
            $n = (float)preg_replace('/[^\d.]/', '', $c);
            if ($n > 10 && $n < 500000) $prices[] = $n;
        }
        if (empty($prices)) continue;

        $buying  = $prices[0];
        $selling = isset($prices[1]) ? $prices[1] : round($buying * 1.28, 2);
        // Depot name: use first column if it doesn't look like a crop name,
        // otherwise label generically
        $depot = preg_match('/[a-z]{4,}/i', $cols[0]) ? trim($cols[0]) : 'ADMARC Depot';

        $rows[] = [
            'crop_id'       => $matched['id'],
            'crop_name'     => $matched['name'],
            'depot_name'    => $depot,
            'buying_price'  => $buying,
            'selling_price' => $selling,
            'unit'          => 'kg',
            'price_date'    => $today,
            'source_url'    => $usedUrl,
        ];
    }

    return [
        'data'       => $rows,
        'source_url' => $usedUrl,
        'error'      => empty($rows) ? 'Page fetched but no price table found on ADMARC site.' : null,
    ];
}

// Close database connection
if (isset($mysqli)) {
    $mysqli->close();
}
?>