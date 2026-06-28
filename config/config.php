<?php
// === Web App Configuration with Console Debug Logs ===

// Disable PHP error display
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Log errors to file
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/webapp_errors.log');

// Load credentials from .env
$envFile = dirname(__DIR__) . '/.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if ($line[0] === '#' || strpos($line, '=') === false) continue;
        [$k, $v] = explode('=', $line, 2);
        $_ENV[trim($k)] = trim($v);
    }
}

$host    = $_ENV['DB_HOST'] ?? 'promanaged-it.com';
$user    = $_ENV['DB_USER'] ?? '';
$pass    = $_ENV['DB_PASS'] ?? '';
$db      = $_ENV['DB_NAME'] ?? '';
$charset = 'utf8mb4';

// Send HTML+JSON headers so console.log works before JSON
header('Content-Type: text/html; charset=utf-8');

// Attempt DB connection
$mysqli = @new mysqli($host, $user, $pass, $db);

if ($mysqli && !$mysqli->connect_error) {
    $mysqli->set_charset($charset);
    // Log success in browser console
    echo '<script>console.log("✅ DB connected successfully");</script>';
} else {
    $err = $mysqli->connect_error ?? 'Unknown';
    echo '<script>console.error("❌ DB connect failed: '. addslashes($err) .'");</script>';
    // Output JSON error and exit
    echo json_encode([
        'success' => false,
        'error'   => 'DB connection failed',
        'message' => $err
    ]);
    exit;
}

// Fetch a sample of districts to confirm data
$result = $mysqli->query("SELECT id, name FROM districts LIMIT 5");
$sample = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $sample[] = $row;
    }
}
// Log sample data in console
echo '<script>console.log("📋 Sample districts:", '. json_encode($sample) .');</script>';

// Now send JSON header and proceed as API
header('Content-Type: application/json; charset=utf-8');

// Example JSON response
echo json_encode([
    'success' => true,
    'sample_districts' => $sample,
    'timestamp' => date('c')
]);
exit;
?>
