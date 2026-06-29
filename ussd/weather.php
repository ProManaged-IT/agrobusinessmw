<?php
// === Weather Forecast Functionality ===
// Enhanced 3-day forecast with "Today's Weather" title, AM/PM rain times, rain type, and disaster alerts

function get_weather_forecast($district_id, $language) {
    global $district_coords, $menu_texts, $pagination;
    
    if (!isset($district_coords[$district_id])) {
        return false;
    }

    $lat = $district_coords[$district_id]['lat'];
    $lon = $district_coords[$district_id]['lon'];
    $district_name = $district_coords[$district_id]['name'] ?? $district_id;

    // Get weather data
    $url = "https://api.open-meteo.com/v1/forecast?" . http_build_query([
        'latitude' => $lat,
        'longitude' => $lon,
        'daily' => 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum',
        'hourly' => 'precipitation,precipitation_probability',
        'timezone' => 'Africa/Blantyre',
        'forecast_days' => 3
    ]);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response, true);
    
    if (!$data || !isset($data['daily']) || !isset($data['hourly'])) {
        file_put_contents(__DIR__ . '/weather_debug.log', date('c') . ' - ERROR: Invalid API data for district ' . $district_id . PHP_EOL, FILE_APPEND);
        return false;
    }

    // Debug: Log hourly precipitation data
    file_put_contents(__DIR__ . '/weather_debug.log', date('c') . ' - Hourly Precip for ' . $district_name . ': ' . json_encode($data['hourly']['precipitation']) . PHP_EOL, FILE_APPEND);
    file_put_contents(__DIR__ . '/weather_debug.log', date('c') . ' - Hourly Prob for ' . $district_name . ': ' . json_encode($data['hourly']['precipitation_probability']) . PHP_EOL, FILE_APPEND);

    // Weather icons based on WMO weather codes
    $icons = [
        'clear' => "☀️",          // 0
        'partly_cloudy' => "⛅",   // 1-2
        'cloudy' => "☁️",         // 3
        'rain' => "🌧️",           // 51-67
        'thunder' => "⛈️"         // 80-99
    ];

    // Text templates with "Today's Weather" title, rain type, and disaster alerts
    $texts = [
        'en' => [
            'title' => "🌤️ Today's Weather 🌤️\n",
            'day' => "%s: %s\n  High: %d°C\n  Low: %d°C",
            'rain' => "\n  %s expected: %s",
            'no_rain' => "\n  No rain expected",
            'disaster_alert' => "\n  ⚠️ Alert: Possible %s risk!",
            'separator' => "\n---"
        ],
        'ci' => [
            'title' => "🌤️ Nyengo Ya Lero 🌤️\n",
            'day' => "%s: %s\n  Wapamwamba: %d°C\n  Wotsika: %d°C",
            'rain' => "\n  %s yoyembekezeka: %s",
            'no_rain' => "\n  Palibe mvula yoyembekezeka",
            'disaster_alert' => "\n  ⚠️ Chenjezo: Mvula kapena mphepo yamkuntho ingachitike!",
            'separator' => "\n---"
        ]
    ];

    $forecast = $texts[$language]['title'];

    for ($day = 0; $day < 3; $day++) {
        // Get date (e.g., "Sat, Apr 26")
        $date = date('D, M j', strtotime("+$day days"));
        $temp_high = round($data['daily']['temperature_2m_max'][$day]);
        $temp_low = round($data['daily']['temperature_2m_min'][$day]);
        $weather_code = $data['daily']['weathercode'][$day];
        $precip_sum = $data['daily']['precipitation_sum'][$day];

        // Determine weather icon
        $icon = $icons['clear'];
        if ($weather_code >= 80) {
            $icon = $icons['thunder'];
        } elseif ($weather_code >= 51) {
            $icon = $icons['rain'];
        } elseif ($weather_code >= 3) {
            $icon = $icons['cloudy'];
        } elseif ($weather_code >= 1) {
            $icon = $icons['partly_cloudy'];
        }

        // Add day forecast
        $forecast .= sprintf(
            $texts[$language]['day'],
            $date,
            $icon,
            $temp_high,
            $temp_low
        );

        // Calculate rain hours and type
        $rain_hours = [];
        $rain_types = [];
        $max_precip = 0;
        $day_start = $day * 24;
        for ($hour = 0; $hour < 24; $hour++) {
            $precip = $data['hourly']['precipitation'][$day_start + $hour] ?? 0;
            $precip_prob = $data['hourly']['precipitation_probability'][$day_start + $hour] ?? 0;
            if ($precip > 0.1 || $precip_prob >= 20) {
                $hour_12 = $hour % 12 === 0 ? 12 : $hour % 12;
                $ampm = $hour < 12 ? 'AM' : 'PM';
                $rain_hours[] = sprintf("%d:00%s", $hour_12, $ampm);
                // Determine rain type
                $rain_type = 'Light rain';
                if ($weather_code >= 95) {
                    $rain_type = 'Thunderstorm';
                } elseif ($precip > 7.6) {
                    $rain_type = 'Heavy rain';
                } elseif ($precip > 2.5) {
                    $rain_type = 'Moderate rain';
                }
                $rain_types[] = $rain_type;
                $max_precip = max($max_precip, $precip);
            }
        }

        // Debug: Log rain hours and types
        file_put_contents(__DIR__ . '/weather_debug.log', date('c') . ' - Rain Hours for ' . $date . ': ' . json_encode($rain_hours) . PHP_EOL, FILE_APPEND);
        file_put_contents(__DIR__ . '/weather_debug.log', date('c') . ' - Rain Types for ' . $date . ': ' . json_encode($rain_types) . PHP_EOL, FILE_APPEND);

        // Format rain information
        if (!empty($rain_hours)) {
            $groups = [];
            $current = [$rain_hours[0]];
            for ($i = 1; $i < count($rain_hours); $i++) {
                $current_hour = intval(explode(':', $current[0])[0]);
                $next_hour = intval(explode(':', $rain_hours[$i])[0]);
                $current_ampm = substr($current[0], -2);
                $next_ampm = substr($rain_hours[$i], -2);
                if ($next_hour === ($current_hour % 12) + 1 && $current_ampm === $next_ampm) {
                    $current[] = $rain_hours[$i];
                } else {
                    $groups[] = count($current) > 1 ? 
                        $current[0].'-'.end($current) : $current[0];
                    $current = [$rain_hours[$i]];
                }
            }
            $groups[] = count($current) > 1 ? $current[0].'-'.end($current) : $current[0];
            $rain_text = implode(', ', $groups);
            if ($precip_sum > 0) {
                $rain_text .= sprintf(" (%.1fmm)", $precip_sum);
            }
            // Select most severe rain type
            $rain_type = 'Light rain';
            if (in_array('Thunderstorm', $rain_types)) {
                $rain_type = 'Thunderstorm';
            } elseif (in_array('Heavy rain', $rain_types)) {
                $rain_type = 'Heavy rain';
            } elseif (in_array('Moderate rain', $rain_types)) {
                $rain_type = 'Moderate rain';
            }
            $rain_type_text = $language === 'en' ? $rain_type : ($rain_type === 'Thunderstorm' ? 'Mvula yamkuntho' : 
                ($rain_type === 'Heavy rain' ? 'Mvula yambiri' : 
                ($rain_type === 'Moderate rain' ? 'Mvula yapakati' : 'Mvula yochepa')));
            $forecast .= sprintf($texts[$language]['rain'], $rain_type_text, $rain_text);
        } else {
            $forecast .= $texts[$language]['no_rain'];
        }

        // Check for natural disaster risks
        $disaster_alert = '';
        if ($precip_sum > 50 || $max_precip > 7.6) {
            $disaster_alert = $language === 'en' ? 'flood' : 'kusefukira kwa madzi';
        } elseif ($weather_code >= 95) {
            $disaster_alert = $language === 'en' ? 'severe storm' : 'mphepo yamkuntho';
        }
        if ($disaster_alert) {
            $forecast .= sprintf($texts[$language]['disaster_alert'], $disaster_alert);
        }

        // Add separator (except for last day)
        if ($day < 2) {
            $forecast .= $texts[$language]['separator'];
        }
    }

    return "CON " . $forecast;
}

// Cache weather data to avoid repeated API calls
function get_cached_weather($district_id, $language, $session_dir) {
    $cache_file = "$session_dir/weather_{$district_id}_{language}.json";
    $cache_duration = 3600; // 1 hour

    if (file_exists($cache_file) && (time() - filemtime($cache_file)) < $cache_duration) {
        return json_decode(file_get_contents($cache_file), true);
    }

    $forecast = get_weather_forecast($district_id, $language);
    if ($forecast !== false) {
        file_put_contents($cache_file, json_encode($forecast));
    }
    return $forecast;
}
?>