<?php
// === Helper Functions ===
// Reusable functions for database queries and error handling

// Execute a prepared or non-prepared query and format results
// Parameters:
// - $mysqli: Database connection
// - $query: SQL query string
// - $params: Array of parameters for prepared statements
// - $types: String of parameter types (e.g., 'ii' for two integers)
// - $format_callback: Callback to format each row into a string
// Returns: Formatted string or false if no data
function execute_query($mysqli, $query, $params = [], $types = '', $format_callback) {
    if (empty($params)) {
        // Non-prepared query
        $result = $mysqli->query($query);
        if ($result && $result->num_rows > 0) {
            $output = '';
            while ($row = $result->fetch_assoc()) {
                $output .= $format_callback($row);
            }
            $result->free();
            return rtrim($output);
        }
        return false;
    }

    // Prepared query
    $stmt = $mysqli->prepare($query);
    if (!$stmt) {
        error_log('Prepare failed: ' . $mysqli->error);
        return false;
    }
    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $output = '';
        while ($row = $result->fetch_assoc()) {
            $output .= $format_callback($row);
        }
        $stmt->close();
        return rtrim($output);
    }
    $stmt->close();
    return false;
}

// Get error response based on type and language
// Parameters:
// - $menu_texts: Menu definitions
// - $type: Error type (e.g., 'invalid', 'no_data')
// - $language: Language code ('en' or 'ci')
// Returns: Error message string
function get_error($menu_texts, $type, $language) {
    return $menu_texts['errors'][$type][$language];
}
?>