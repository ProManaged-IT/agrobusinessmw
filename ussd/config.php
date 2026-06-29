<?php
// === Configuration ===
// Database connection and global settings

// Configure PHP error handling
ini_set('display_errors', 0);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/ussd_errors.log');

// Log incoming request for debugging
error_log('POST Data: ' . json_encode($_POST));

// Function to establish database connection with retry
function get_db_connection($max_retries = 2, $retry_delay = 1) {
    $host = 'localhost';
    $user = 'p601229';
    $pass = '2:p2WpmX[0YTs7';
    $db = 'p601229_AgroBusiness_MW';
    
    for ($attempt = 1; $attempt <= $max_retries; $attempt++) {
        $mysqli = new mysqli($host, $user, $pass, $db);
        if (!$mysqli->connect_error) {
            // Set UTF-8 encoding for Chichewa support
            $mysqli->set_charset('utf8mb4');
            error_log("Database connection successful on attempt $attempt");
            return $mysqli;
        }
        error_log("Database connection failed on attempt $attempt: " . $mysqli->connect_error);
        if ($attempt < $max_retries) {
            sleep($retry_delay);
        }
    }
    
    error_log("All database connection attempts failed");
    echo "END System error. Please try again later.";
    ob_end_flush();
    exit;
}

// Initialize database connection
$mysqli = get_db_connection();
?>