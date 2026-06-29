<?php
// === Main USSD Callback ===
// Entry point for Africa's Talking USSD requests

// Start output buffering
ob_start();
header('Content-Type: text/plain');

// Include configuration, menus, helpers, and logic
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/menus.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/weather.php';  // Add this line
require_once __DIR__ . '/logic.php';

// Process USSD request and get response
$response = process_ussd($mysqli, $menu_texts, $valid_options, $practice_types);

// Output response to Africa's Talking
echo $response;

// Close database connection
$mysqli->close();

// Flush output buffer
ob_end_flush();
?>