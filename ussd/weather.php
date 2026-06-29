<?php
// === Weather Forecast Functionality ===

function get_weather_forecast($district_id, $language) {
    global $district_coords;

    if (!isset($district_coords[$district_id])) {
        return false;
    }

    $lat           = $district_coords[$district_id]['lat'];
    $lon           = $district_coords[$district_id]['lon'];
    $district_name = $district_coords[$district_id]['name'] ?? $district_id;

    $url = "https://api.open-meteo.com/v1/forecast?" . http_build_query([
        'latitude'     => $lat,
        'longitude'    => $lon,
        'daily'        => 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum',
        'hourly'       => 'precipitation,precipitation_probability',
        'timezone'     => 'Africa/Blantyre',
        'forecast_days'=> 3,
    ]);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    if (PHP_OS_FAMILY === 'Windows') {
        // Windows dev: system CA bundle often missing for outbound PHP curl
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    }
    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response, true);

    if (!$data || !isset($data['daily']) || !isset($data['hourly'])) {
        error_log("USSD weather: invalid API data for district $district_id");
        return false;
    }

    $icons = [
        'clear'        => '☀️',
        'partly_cloudy'=> '⛅',
        'cloudy'       => '☁️',
        'rain'         => '🌧️',
        'thunder'      => '⛈️',
    ];

    $texts = [
        'en' => [
            'title'         => "🌤️ Today's Weather 🌤️\n",
            'day'           => "%s: %s\n  High: %d°C\n  Low: %d°C",
            'rain'          => "\n  %s expected: %s",
            'no_rain'       => "\n  No rain expected",
            'disaster_alert'=> "\n  ⚠️ Alert: Possible %s risk!",
            'separator'     => "\n---",
        ],
        'ci' => [
            'title'         => "🌤️ Nyengo Ya Lero 🌤️\n",
            'day'           => "%s: %s\n  Wapamwamba: %d°C\n  Wotsika: %d°C",
            'rain'          => "\n  %s yoyembekezeka: %s",
            'no_rain'       => "\n  Palibe mvula yoyembekezeka",
            'disaster_alert'=> "\n  ⚠️ Chenjezo: Mvula kapena mphepo yamkuntho ingachitike!",
            'separator'     => "\n---",
        ],
    ];

    $forecast = $texts[$language]['title'];

    for ($day = 0; $day < 3; $day++) {
        $date         = date('D, M j', strtotime("+$day days"));
        $temp_high    = round($data['daily']['temperature_2m_max'][$day]);
        $temp_low     = round($data['daily']['temperature_2m_min'][$day]);
        $weather_code = $data['daily']['weathercode'][$day];
        $precip_sum   = $data['daily']['precipitation_sum'][$day];

        $icon = $icons['clear'];
        if ($weather_code >= 80)     $icon = $icons['thunder'];
        elseif ($weather_code >= 51) $icon = $icons['rain'];
        elseif ($weather_code >= 3)  $icon = $icons['cloudy'];
        elseif ($weather_code >= 1)  $icon = $icons['partly_cloudy'];

        $forecast .= sprintf($texts[$language]['day'], $date, $icon, $temp_high, $temp_low);

        // Determine rain hours
        $rain_hours = [];
        $rain_types = [];
        $max_precip = 0;
        $day_start  = $day * 24;
        for ($hour = 0; $hour < 24; $hour++) {
            $precip      = $data['hourly']['precipitation'][$day_start + $hour] ?? 0;
            $precip_prob = $data['hourly']['precipitation_probability'][$day_start + $hour] ?? 0;
            if ($precip > 0.1 || $precip_prob >= 20) {
                $hour_12      = $hour % 12 === 0 ? 12 : $hour % 12;
                $ampm         = $hour < 12 ? 'AM' : 'PM';
                $rain_hours[] = sprintf("%d:00%s", $hour_12, $ampm);
                $rain_type    = 'Light rain';
                if ($weather_code >= 95) $rain_type = 'Thunderstorm';
                elseif ($precip > 7.6)  $rain_type = 'Heavy rain';
                elseif ($precip > 2.5)  $rain_type = 'Moderate rain';
                $rain_types[] = $rain_type;
                $max_precip   = max($max_precip, $precip);
            }
        }

        if (!empty($rain_hours)) {
            $groups  = [];
            $current = [$rain_hours[0]];
            for ($i = 1; $i < count($rain_hours); $i++) {
                $cur_h  = intval(explode(':', $current[0])[0]);
                $nxt_h  = intval(explode(':', $rain_hours[$i])[0]);
                $cur_ap = substr($current[0], -2);
                $nxt_ap = substr($rain_hours[$i], -2);
                if ($nxt_h === ($cur_h % 12) + 1 && $cur_ap === $nxt_ap) {
                    $current[] = $rain_hours[$i];
                } else {
                    $groups[] = count($current) > 1 ? $current[0] . '-' . end($current) : $current[0];
                    $current  = [$rain_hours[$i]];
                }
            }
            $groups[]  = count($current) > 1 ? $current[0] . '-' . end($current) : $current[0];
            $rain_text = implode(', ', $groups);
            if ($precip_sum > 0) $rain_text .= sprintf(" (%.1fmm)", $precip_sum);

            $rain_type = 'Light rain';
            if (in_array('Thunderstorm', $rain_types))    $rain_type = 'Thunderstorm';
            elseif (in_array('Heavy rain', $rain_types))  $rain_type = 'Heavy rain';
            elseif (in_array('Moderate rain', $rain_types)) $rain_type = 'Moderate rain';

            $rain_type_text = $language === 'en' ? $rain_type : (
                $rain_type === 'Thunderstorm'   ? 'Mvula yamkuntho' :
                ($rain_type === 'Heavy rain'    ? 'Mvula yambiri'   :
                ($rain_type === 'Moderate rain' ? 'Mvula yapakati'  : 'Mvula yochepa'))
            );
            $forecast .= sprintf($texts[$language]['rain'], $rain_type_text, $rain_text);
        } else {
            $forecast .= $texts[$language]['no_rain'];
        }

        $disaster_alert = '';
        if ($precip_sum > 50 || $max_precip > 7.6) {
            $disaster_alert = $language === 'en' ? 'flood' : 'kusefukira kwa madzi';
        } elseif ($weather_code >= 95) {
            $disaster_alert = $language === 'en' ? 'severe storm' : 'mphepo yamkuntho';
        }
        if ($disaster_alert) {
            $forecast .= sprintf($texts[$language]['disaster_alert'], $disaster_alert);
        }

        if ($day < 2) $forecast .= $texts[$language]['separator'];
    }

    return $forecast;
}

// Cache weather data (1 hour TTL) to avoid repeated API calls per session
function get_cached_weather($district_id, $language, $session_dir) {
    $cache_file     = "$session_dir/weather_{$district_id}_{$language}.json";
    $cache_duration = 3600;

    if (file_exists($cache_file) && (time() - filemtime($cache_file)) < $cache_duration) {
        return json_decode(file_get_contents($cache_file), true);
    }

    $forecast = get_weather_forecast($district_id, $language);
    if ($forecast !== false) {
        file_put_contents($cache_file, json_encode($forecast));
    }
    return $forecast;
}
