<?php
// === USSD Menu Logic ===

// Maps menu page + button position → actual district DB ID.
// Page 1 = buttons 1-8, Page 2 = buttons 1-8, Page 3 = buttons 1-8.
// Must stay in sync with district_selection / weather_forecast menus in menus.php.
$district_map = [
    1 => [1=>1,  2=>2,  3=>3,  4=>4,  5=>5,  6=>6,  7=>7,  8=>8],   // Lilongwe..Nkhata Bay
    2 => [1=>9,  2=>10, 3=>11, 4=>12, 5=>13, 6=>14, 7=>15, 8=>16],  // Rumphi..Nkhotakota
    3 => [1=>17, 2=>18, 3=>19, 4=>20, 5=>21, 6=>22, 7=>23, 8=>24],  // Ntcheu..Salima
];

/**
 * Parse Africa's Talking accumulated text into a clean navigation stack.
 *
 * AT sends the FULL history of inputs on every request, separated by '*'.
 * We replay the history:
 *   '0'  → back  (pop last selection, reset page counter for that branch)
 *   '9'  → next page (increment the relevant page counter, do NOT push)
 *   else → push onto stack
 *
 * Returns: [stack, pages_array, is_exit]
 *   is_exit = user pressed '0' from the main menu (stack drained to empty)
 */
function parse_navigation(string $text, array $district_map): array {
    if ($text === '') {
        return [[], ['district' => 1, 'weather' => 1], false];
    }

    $raw              = array_values(array_filter(array_map('trim', explode('*', $text)), 'strlen'));
    $stack            = [];
    $pages            = ['district' => 1, 'weather' => 1];
    $going_to_language = false; // '0' from main menu → language selection, not exit

    foreach ($raw as $input) {
        $level = count($stack);
        $main  = $stack[1] ?? '';
        $going_to_language = false; // reset each step — only last '0' from main matters

        if ($input === '0') {
            if (!empty($stack)) {
                // If on a paginated menu with page > 1, '0' goes to previous page.
                $prev_page = false;
                if ($level === 2) {
                    if (in_array($main, ['2', '5', '7', '8']) && $pages['district'] > 1) {
                        $pages['district']--; $prev_page = true;
                    } elseif ($main === '9' && $pages['weather'] > 1) {
                        $pages['weather']--; $prev_page = true;
                    }
                } elseif ($level === 3 && $main === '3' && $pages['district'] > 1) {
                    $pages['district']--; $prev_page = true;
                } elseif ($level === 3 && $main === '1' && ($stack[2] ?? '') === '1' && $pages['district'] > 1) {
                    $pages['district']--; $prev_page = true;
                } elseif ($level === 4 && $main === '1' && ($stack[2] ?? '') === '2' && $pages['district'] > 1) {
                    $pages['district']--; $prev_page = true;
                }

                if (!$prev_page) {
                    // Normal back — pop the stack and reset page counters
                    if ($level === 2) {
                        if (in_array($main, ['2', '3', '5', '7', '8'])) $pages['district'] = 1;
                        elseif ($main === '9')                            $pages['weather']  = 1;
                    }
                    if ($level === 3 && $main === '3') $pages['district'] = 1;
                    // Crop Prices path A: backing from district list → crop_prices sub-menu
                    if ($level === 3 && $main === '1' && ($stack[2] ?? '') === '1') $pages['district'] = 1;
                    // Crop Prices path B: backing from district list → crop selection
                    if ($level === 4 && $main === '1' && ($stack[2] ?? '') === '2') $pages['district'] = 1;

                    if (count($stack) === 1) {
                        // At main menu (stack=[lang]): '0' → language selection, not session exit
                        $going_to_language = true;
                    }
                    array_pop($stack);
                }
            }
            // If stack was already empty (user pressed '0' at language selection) → true exit
        } elseif ($input === '9') {
            // At level 1 (main menu) '9' is Weather. Deeper levels use '9' for
            // Next Page while pages remain, then Main Menu from page 3/results.
            if ($level === 2) {
                if (in_array($main, ['2', '5', '7', '8'])) {
                    if ($pages['district'] < 3) $pages['district']++;
                    else $stack = array_slice($stack, 0, 1);
                } elseif ($main === '9') {
                    if ($pages['weather'] < 3) $pages['weather']++;
                    else $stack = array_slice($stack, 0, 1);
                } else {
                    $stack = array_slice($stack, 0, 1);
                }
            } elseif ($level === 3 && $main === '3') {
                if ($pages['district'] < 3) $pages['district']++;
                else $stack = array_slice($stack, 0, 1);
            } elseif ($level === 3 && $main === '1' && ($stack[2] ?? '') === '1') {
                // Crop Prices path A: page through districts
                if ($pages['district'] < 3) $pages['district']++;
                else $stack = array_slice($stack, 0, 1);
            } elseif ($level === 4 && $main === '1' && ($stack[2] ?? '') === '2') {
                // Crop Prices path B: page through districts
                if ($pages['district'] < 3) $pages['district']++;
                else $stack = array_slice($stack, 0, 1);
            } elseif ($level >= 3) {
                $stack = array_slice($stack, 0, 1);
            } else {
                $stack[] = $input;
            }
        } else {
            $stack[] = $input;
        }
    }

    // Stack empty + no keys entered = fresh session (not exit).
    // Stack empty + keys entered + NOT backing to language = true exit.
    $is_exit = !empty($raw) && empty($stack) && !$going_to_language;
    return [$stack, $pages, $is_exit];
}

function process_ussd(mysqli $mysqli, array $menu_texts, array $valid_options, array $practice_types): string {
    global $district_map;

    $sessionId = $_POST['sessionId'] ?? '';
    $text      = trim($_POST['text'] ?? '');

    $session_dir  = __DIR__ . '/sessions';
    $session_file = "$session_dir/$sessionId.json";
    if (!is_dir($session_dir)) mkdir($session_dir, 0755, true);

    [$stack, $pages, $is_exit] = parse_navigation($text, $district_map);

    $level    = count($stack);
    $language = ($stack[0] ?? '1') === '2' ? 'ci' : 'en';

    $response = '';

    // ── EXIT ────────────────────────────────────────────────────────────────
    if ($is_exit) {
        $response = $menu_texts['exit'][$language];

    // ── LEVEL 0: Language selection ──────────────────────────────────────────
    } elseif ($level === 0) {
        $response = "CON " . $menu_texts['language_selection'][$language];

    // ── LEVEL 1: Main menu ───────────────────────────────────────────────────
    } elseif ($level === 1) {
        if (!in_array($stack[0], ['1', '2'])) {
            $response = "CON " . $menu_texts['language_selection'][$language];
        } else {
            $response = "CON " . $menu_texts['main_menu'][$language];
        }

    // ── LEVEL 2: First sub-menu or direct content ────────────────────────────
    } elseif ($level === 2) {
        $main = $stack[1];
        switch ($main) {
            case '1': // Crop Prices — show sub-menu
                $response = "CON " . $menu_texts['crop_prices_menu'][$language];
                break;

            case '2': case '5': case '7': case '8': // District-based menus
                $response = "CON " . $menu_texts['district_selection'][$language][$pages['district']];
                break;

            case '3': case '4': // Crop-based menus
                $response = "CON " . $menu_texts['crop_selection'][$language];
                break;

            case '6': // Basic Farming Info
                $col    = "info_$language";
                $result = execute_query(
                    $mysqli,
                    "SELECT topic, $col AS info FROM basic_farming_info WHERE $col IS NOT NULL",
                    [], '',
                    fn($row) => "{$row['topic']}: {$row['info']}\n"
                );
                $response = $result
                    ? "CON " . $result . $menu_texts['back_option'][$language]
                    : $menu_texts['errors']['no_data'][$language];
                break;

            case '9': // Weather forecast — show district page
                $response = "CON " . $menu_texts['weather_forecast'][$language][$pages['weather']];
                break;

            default:
                $response = "CON " . $menu_texts['main_menu'][$language];
        }

    // ── LEVEL 3: District / crop / weather selection ─────────────────────────
    } elseif ($level === 3) {
        $main = $stack[1];
        $sub  = $stack[2];

        switch ($main) {
            case '1': // Crop Prices sub-path
                if ($sub === '1') {
                    // Path A: by district — show district pages
                    $response = "CON " . $menu_texts['district_selection'][$language][$pages['district']];
                } elseif ($sub === '2') {
                    // Path B: by crop — show full crop list
                    $response = "CON " . $menu_texts['crop_prices_crop'][$language];
                } else {
                    $response = "CON " . $menu_texts['crop_prices_menu'][$language];
                }
                break;

            case '9': // Weather — district selected
                $district_id = $district_map[$pages['weather']][(int)$sub] ?? null;
                if (!$district_id) {
                    $response = "CON " . $menu_texts['weather_forecast'][$language][$pages['weather']];
                } else {
                    $forecast = get_weather_forecast((string)$district_id, $language);
                    $response = $forecast
                        ? "CON " . $forecast . $menu_texts['back_option'][$language]
                        : $menu_texts['errors']['no_data'][$language];
                }
                break;

            case '2': case '5': case '7': case '8': // District-based results
                $district_id = $district_map[$pages['district']][(int)$sub] ?? null;
                if (!$district_id) {
                    // Invalid position — re-show the current district page
                    $response = "CON " . $menu_texts['district_selection'][$language][$pages['district']];
                    break;
                }
                switch ($main) {
                    case '2': // Market Insights
                        $col    = "insight_$language";
                        $result = execute_query($mysqli,
                            "SELECT $col AS insight FROM market_insights WHERE district_id=? AND $col IS NOT NULL",
                            [$district_id], 'i', fn($row) => $row['insight'] . "\n");
                        $response = $result
                            ? "CON " . $result . $menu_texts['back_option'][$language]
                            : $menu_texts['errors']['no_data'][$language];
                        break;

                    case '5': // Community Q&A
                        $qcol = "question_$language"; $acol = "answer_$language";
                        $result = execute_query($mysqli,
                            "SELECT $qcol AS question, $acol AS answer FROM community_qa WHERE district_id=? AND $acol IS NOT NULL",
                            [$district_id], 'i', fn($row) => "Q: {$row['question']}\nA: {$row['answer']}\n");
                        $response = $result
                            ? "CON " . $result . $menu_texts['back_option'][$language]
                            : $menu_texts['errors']['no_data'][$language];
                        break;

                    case '7': // Find Sellers
                        $result = execute_query($mysqli,
                            "SELECT s.name, scd.phone_number, AVG(r.rating_value) AS avg_rating
                             FROM sellers s
                             JOIN seller_contact_details scd ON s.contact_id = scd.id
                             LEFT JOIN ratings r ON s.id = r.seller_id
                             WHERE s.district_id = ?
                             GROUP BY s.id, s.name, scd.phone_number",
                            [$district_id], 'i', function($row) {
                                $rating = $row['avg_rating'] ? number_format($row['avg_rating'], 1) . '*' : 'NR';
                                return "{$row['name']}: {$row['phone_number']} ($rating)\n";
                            });
                        $response = $result
                            ? "CON " . $result . $menu_texts['back_option'][$language]
                            : $menu_texts['errors']['no_data'][$language];
                        break;

                    case '8': // Find Buyers
                        $result = execute_query($mysqli,
                            "SELECT b.name, bcd.phone_number
                             FROM buyers b
                             JOIN buyer_contact_details bcd ON b.contact_id = bcd.id
                             WHERE b.district_id = ?",
                            [$district_id], 'i',
                            fn($row) => "{$row['name']}: {$row['phone_number']}\n");
                        $response = $result
                            ? "CON " . $result . $menu_texts['back_option'][$language]
                            : $menu_texts['errors']['no_data'][$language];
                        break;
                }
                break;

            case '3': // Pest Control — crop chosen, now show district selection
                if (in_array($sub, ['1', '2', '3'])) {
                    $response = "CON " . $menu_texts['district_selection'][$language][$pages['district']];
                } else {
                    $response = "CON " . $menu_texts['crop_selection'][$language];
                }
                break;

            case '4': // Farming Practices — crop chosen, now show practice types
                if (in_array($sub, ['1', '2', '3'])) {
                    $response = "CON " . $menu_texts['practice_selection'][$language];
                } else {
                    $response = "CON " . $menu_texts['crop_selection'][$language];
                }
                break;

            default:
                $response = "CON " . $menu_texts['main_menu'][$language];
        }

    // ── LEVEL 4: Final data retrieval ────────────────────────────────────────
    } elseif ($level === 4) {
        $main     = $stack[1];
        $crop_pos = $stack[2];
        $sub      = $stack[3];

        switch ($main) {
            case '1': // Crop Prices
                $path = $crop_pos; // stack[2]: '1'=by-district, '2'=by-crop
                if ($path === '1') {
                    // Path A: district selected → show all prices in that district
                    $district_id = $district_map[$pages['district']][(int)$sub] ?? null;
                    if (!$district_id) {
                        $response = "CON " . $menu_texts['district_selection'][$language][$pages['district']];
                    } else {
                        $result = get_prices_by_district($mysqli, $district_id, $language);
                        $response = $result
                            ? "CON " . $result . $menu_texts['back_option'][$language]
                            : $menu_texts['errors']['no_data'][$language];
                    }
                } elseif ($path === '2') {
                    // Path B: crop selected → show district selection
                    if (in_array($sub, ['1','2','3','4','5','6','7','8','9'])) {
                        $response = "CON " . $menu_texts['district_selection'][$language][$pages['district']];
                    } else {
                        $response = "CON " . $menu_texts['crop_prices_crop'][$language];
                    }
                } else {
                    $response = "CON " . $menu_texts['main_menu'][$language];
                }
                break;

            case '3': // Pest Control Tips — district chosen
                $district_id = $district_map[$pages['district']][(int)$sub] ?? null;
                if (!$district_id || !in_array($crop_pos, ['1', '2', '3'])) {
                    $response = "CON " . $menu_texts['district_selection'][$language][$pages['district']];
                } else {
                    $col    = "tip_$language";
                    $result = execute_query($mysqli,
                        "SELECT $col AS tip FROM pest_control_tips WHERE crop_id=? AND district_id=? AND $col IS NOT NULL",
                        [(int)$crop_pos, $district_id], 'ii',
                        fn($row) => $row['tip'] . "\n");
                    $response = $result
                        ? "CON " . $result . $menu_texts['back_option'][$language]
                        : $menu_texts['errors']['no_data'][$language];
                }
                break;

            case '4': // Farming Best Practices — practice type chosen
                $practice = $practice_types[$sub] ?? null;
                if (!$practice || !in_array($crop_pos, ['1', '2', '3'])) {
                    $response = "CON " . $menu_texts['practice_selection'][$language];
                } else {
                    $col    = "practice_$language";
                    $result = execute_query($mysqli,
                        "SELECT $col AS practice FROM farming_best_practices WHERE crop_id=? AND practice_type=? AND $col IS NOT NULL",
                        [(int)$crop_pos, $practice], 'is',
                        fn($row) => $row['practice'] . "\n");
                    $response = $result
                        ? "CON " . $result . $menu_texts['back_option'][$language]
                        : $menu_texts['errors']['no_data'][$language];
                }
                break;

            default:
                $response = "CON " . $menu_texts['main_menu'][$language];
        }

    // ── LEVEL 5: Crop Prices path B — crop + district → show price ──────────
    } elseif ($level === 5) {
        $main     = $stack[1]; // '1' = crop prices
        $path     = $stack[2]; // '2' = by-crop path
        $crop_pos = $stack[3]; // menu pos 1-9 = crop_id 1-9
        $dist_pos = $stack[4]; // district page button

        if ($main === '1' && $path === '2') {
            $crop_id     = (int)$crop_pos;
            $district_id = $district_map[$pages['district']][(int)$dist_pos] ?? null;
            if (!$district_id || !in_array($crop_pos, ['1','2','3','4','5','6','7','8','9'])) {
                $response = "CON " . $menu_texts['district_selection'][$language][$pages['district']];
            } else {
                $result = get_prices_by_crop_district($mysqli, $crop_id, $district_id, $language);
                $response = $result
                    ? "CON " . $result . $menu_texts['back_option'][$language]
                    : $menu_texts['errors']['no_data'][$language];
            }
        } else {
            $response = "CON " . $menu_texts['main_menu'][$language];
        }
    }

    // ── Fallback (should never be empty) ────────────────────────────────────
    if (empty($response)) {
        error_log("USSD fallback triggered at level $level stack=" . json_encode($stack));
        $response = $level <= 1
            ? "CON " . $menu_texts['language_selection'][$language]
            : "CON " . $menu_texts['main_menu'][$language];
    }

    // ── Session housekeeping ─────────────────────────────────────────────────
    if (strpos($response, 'END') === 0) {
        if (file_exists($session_file)) unlink($session_file);
    } else {
        file_put_contents($session_file, json_encode([
            'stack'          => $stack,
            'language'       => $language,
            'district_page'  => $pages['district'],
            'weather_page'   => $pages['weather'],
        ]));
    }

    return $response;
}
?>
