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

    $raw   = array_values(array_filter(array_map('trim', explode('*', $text))));
    $stack = [];
    $pages = ['district' => 1, 'weather' => 1];

    foreach ($raw as $input) {
        $level = count($stack);
        $main  = $stack[1] ?? '';

        if ($input === '0') {
            if (!empty($stack)) {
                // Reset the page counter for the menu we are leaving
                if ($level >= 2) {
                    if (in_array($main, ['2', '5', '7', '8'])) $pages['district'] = 1;
                    elseif ($main === '9')                       $pages['weather']  = 1;
                }
                // Pest control district sub-menu (level 3 branch)
                if ($level >= 3 && $main === '3') $pages['district'] = 1;
                array_pop($stack);
            }
        } elseif ($input === '9') {
            // Next-page control: advance the right counter, never push to stack
            if ($level === 2) {
                if (in_array($main, ['2', '5', '7', '8']))  $pages['district'] = min($pages['district'] + 1, 3);
                elseif ($main === '9')                        $pages['weather']  = min($pages['weather']  + 1, 3);
            } elseif ($level === 3 && $main === '3') {
                // Pest control: district selection is at level 3
                $pages['district'] = min($pages['district'] + 1, 3);
            }
        } else {
            $stack[] = $input;
        }
    }

    // If the user pressed keys but the stack is now empty they backed out of everything → exit
    $is_exit = !empty($raw) && empty($stack);
    return [$stack, $pages, $is_exit];
}

function process_ussd(mysqli $mysqli, array $menu_texts, array $valid_options, array $practice_types): string {
    global $district_map;

    $sessionId = $_POST['sessionId'] ?? '';
    $text      = trim($_POST['text'] ?? '');

    $session_dir  = __DIR__ . '/sessions';
    $session_file = "$session_dir/$sessionId.json";
    if (!is_dir($session_dir)) mkdir($session_dir, 0755, true);

    file_put_contents(__DIR__ . '/ussd_sessions.log',
        date('c') . " - INPUT: $text  SessionID: $sessionId\n", FILE_APPEND);

    [$stack, $pages, $is_exit] = parse_navigation($text, $district_map);

    $level    = count($stack);
    $language = ($stack[0] ?? '1') === '2' ? 'ci' : 'en';

    file_put_contents(__DIR__ . '/ussd_sessions.log',
        date('c') . ' - NAV: stack=' . json_encode($stack) .
        " level=$level lang=$language district_page={$pages['district']} weather_page={$pages['weather']}\n", FILE_APPEND);

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
            case '1': // Crop Prices — direct result, no further selection needed
                $result = execute_query(
                    $mysqli,
                    "SELECT c.name, cp.min_price, cp.market_price, cp.unit
                     FROM crop_prices cp JOIN crops c ON cp.crop_id = c.id",
                    [], '',
                    fn($row) => "{$row['name']}: Min MWK{$row['min_price']}/{$row['unit']}, Mkt MWK{$row['market_price']}/{$row['unit']}\n"
                );
                $response = $result
                    ? "CON " . $result . $menu_texts['back_option'][$language]
                    : $menu_texts['errors']['no_data'][$language];
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
    }

    // ── Fallback (should never be empty) ────────────────────────────────────
    if (empty($response)) {
        $response = $level <= 1
            ? "CON " . $menu_texts['language_selection'][$language]
            : "CON " . $menu_texts['main_menu'][$language];
        file_put_contents(__DIR__ . '/ussd_sessions.log',
            date('c') . " - FALLBACK used at level $level\n", FILE_APPEND);
    }

    // ── Session housekeeping ─────────────────────────────────────────────────
    if (strpos($response, 'END') === 0) {
        if (file_exists($session_file)) unlink($session_file);
        file_put_contents(__DIR__ . '/ussd_sessions.log', date('c') . " - SESSION CLEARED\n", FILE_APPEND);
    } else {
        file_put_contents($session_file, json_encode([
            'stack'          => $stack,
            'language'       => $language,
            'district_page'  => $pages['district'],
            'weather_page'   => $pages['weather'],
        ]));
    }

    file_put_contents(__DIR__ . '/ussd_sessions.log',
        date('c') . " - RESPONSE: $response\n", FILE_APPEND);

    return $response;
}
?>
