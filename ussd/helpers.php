<?php
// === Helper Functions ===
// Reusable functions for database queries and error handling

function get_fews_ussd_prices($mysqli, $language) {
    $cacheFile = dirname(__DIR__) . '/config/fews_prices_cache.json';
    $ttl = 6 * 3600;
    $cached = null;

    if (file_exists($cacheFile)) {
        $cached = json_decode(file_get_contents($cacheFile), true);
    }

    if (!$cached || !isset($cached['fews']) || (time() - (int)($cached['fetched_at'] ?? 0)) >= $ttl) {
        $host = $_SERVER['HTTP_HOST'] ?? '';
        $json = null;
        if ($host) {
            $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
            $url = $scheme . '://' . $host . dirname($_SERVER['SCRIPT_NAME']) . '/../api.php?action=dual_crop_prices';
            $ctx = stream_context_create(['http' => ['timeout' => 15, 'user_agent' => 'AgroBusiness-Malawi-USSD/1.0']]);
            $raw = @file_get_contents($url, false, $ctx);
            $json = $raw ? json_decode($raw, true) : null;
        }
        if (is_array($json) && (!empty($json['fews']) || !empty($json['community']))) {
            $cached = ['fews' => $json['fews'] ?? [], 'community' => $json['community'] ?? [], 'fetched_at' => time()];
            @file_put_contents($cacheFile, json_encode($cached), LOCK_EX);
        }
    }

    $fewsRows = is_array($cached) ? ($cached['fews'] ?? $cached['data'] ?? []) : [];
    $communityRows = is_array($cached) ? ($cached['community'] ?? []) : [];
    if (!$fewsRows && !$communityRows) return '';

    $cropMap = [];
    $r = $mysqli->query("SELECT id, name FROM crops");
    while ($row = $r->fetch_assoc()) {
        $cropMap[] = ['name' => $row['name'], 'match' => strtolower($row['name'])];
    }

    $aliases = [
        'maize' => ['maize', 'maize grain'],
        'rice' => ['rice', 'rice milled'],
        'beans' => ['beans', 'bean', 'cowpeas', 'cowpea'],
        'groundnuts' => ['groundnut', 'groundnuts', 'peanut'],
        'soybeans' => ['soybean', 'soybeans', 'soya'],
    ];

    $fewsLines = [];
    $seen = [];
    foreach ($fewsRows as $row) {
        $product = strtolower($row['product'] ?? $row['crop_name'] ?? '');
        $matched = null;
        foreach ($cropMap as $crop) {
            foreach ($aliases[$crop['match']] ?? [$crop['match']] as $term) {
                if (strpos($product, $term) !== false) {
                    $matched = $crop['name'];
                    break 2;
                }
            }
        }
        if (!$matched || isset($seen[$matched])) continue;
        $seen[$matched] = true;

        $price = $row['value'] ?? $row['price'] ?? null;
        if ($price === null) continue;
        $market = $row['market'] ?? $row['market_name'] ?? '';
        $unit = $row['unit'] ?? 'kg';
        $fewsLines[] = $matched . ': MWK' . round((float)$price) . '/' . $unit . ($market ? ' - ' . $market : '');
        if (count($fewsLines) >= 5) break;
    }

    $communityLines = [];
    foreach ($communityRows as $row) {
        $crop = $row['crop_name'] ?? '';
        $avg = $row['avg_price'] ?? null;
        if (!$crop || $avg === null) continue;
        $market = $row['market_name'] ?? $row['district_name'] ?? '';
        $unit = $row['unit'] ?? 'kg';
        $reports = (int)($row['report_count'] ?? 0);
        $communityLines[] = $crop . ': Avg MWK' . round((float)$avg) . '/' . $unit . ($market ? ' - ' . $market : '') . ($reports ? ' (' . $reports . ' reports)' : '');
        if (count($communityLines) >= 5) break;
    }

    $sections = [];
    if ($fewsLines) $sections[] = "FEWS NET reference prices:\n" . implode("\n", $fewsLines);
    if ($communityLines) $sections[] = "Community prices from farmers/traders:\n" . implode("\n", $communityLines);

    return $sections ? implode("\n\n", $sections) : '';
}

function execute_query($mysqli, $query, $params = [], $types = '', $format_callback) {
    if (empty($params)) {
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

function get_error($menu_texts, $type, $language) {
    return $menu_texts['errors'][$type][$language];
}
?>