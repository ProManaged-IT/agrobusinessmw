<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/webapp_errors.log');

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$envFile = dirname(__DIR__) . '/.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (empty($line) || $line[0] === '#' || strpos($line, '=') === false) continue;
        [$k, $v] = explode('=', $line, 2);
        $_ENV[trim($k)] = trim($v);
    }
}

$host = $_ENV['DB_HOST'] ?? '';
$mysqli = @new mysqli($host, $_ENV['DB_USER'] ?? '', $_ENV['DB_PASS'] ?? '', $_ENV['DB_NAME'] ?? '', (int)($_ENV['DB_PORT'] ?? 3306));

if ($mysqli->connect_error) {
    echo json_encode([
        'success' => false,
        'error'   => 'DB connection failed',
        'timestamp' => date('c'),
    ]);
    exit;
}

$mysqli->set_charset('utf8mb4');
$result = $mysqli->query("SELECT COUNT(*) as count FROM districts");
$count  = $result ? $result->fetch_assoc()['count'] : 0;

echo json_encode([
    'success'          => true,
    'message'          => 'DB connected',
    'districts_count'  => (int)$count,
    'timestamp'        => date('c'),
]);
