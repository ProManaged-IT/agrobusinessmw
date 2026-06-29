<?php
// === USSD Menu Logic ===
// Processes Africa's Talking USSD requests with paginated districts and enhanced back navigation

function process_ussd($mysqli, $menu_texts, $valid_options, $practice_types) {
    // === Setup ===
    $sessionId = $_POST['sessionId'] ?? '';
    $text = trim($_POST['text'] ?? '');
    $session_dir = __DIR__ . '/sessions';
    $session_file = "$session_dir/$sessionId.json";

    // Ensure sessions directory exists
    if (!is_dir($session_dir)) {
        mkdir($session_dir, 0755, true);
    }

    // Log input
    file_put_contents(__DIR__ . '/ussd_sessions.log', date('c') . ' - INPUT: ' . $text . ', SessionID: ' . $sessionId . PHP_EOL, FILE_APPEND);

    // Load or initialize session
    $session = file_exists($session_file) ? json_decode(file_get_contents($session_file), true) : [
        'inputs' => [],
        'language' => 'en',
        'district_page' => 1,
        'weather_page' => 1
    ];
    
    // Clean session inputs
    $session['inputs'] = array_filter($session['inputs'], function($input) {
        return $input !== '0';
    });

    // Parse user input
    $inputs = $text === '' ? $session['inputs'] : explode('*', $text);
    $inputs = array_values(array_filter(array_map('trim', $inputs), function($input) {
        return $input !== '';
    }));

    // Update valid_options for districts (6 pages: 5 districts each for 1–25, 4 districts for 26–29)
    $valid_options['districts'] = [
        1 => ['1', '2', '3', '4', '5'], // Lilongwe, Blantyre, Mzuzu, Mchinji, Ntchisi
        2 => ['6', '7', '8', '9', '10'], // Dedza, Kasungu, Nkhata Bay, Rumphi, Karonga
        3 => ['11', '12', '13', '14', '15'], // Thyolo, Chitipa, Mangochi, Chikwawa, Zomba
        4 => ['16', '17', '18', '19', '20'], // Nkhotakota, Ntcheu, Balaka, Mulanje, Machinga
        5 => ['21', '22', '23', '24', '25'], // Phalombe, Dowa, Likoma, Salima, Chiradzulu
        6 => ['26', '27', '28', '29'] // Mwanza, Mzimba, Neno, Nsanje
    ];
    $valid_options['weather_districts'] = $valid_options['districts']; // Weather for all districts

    // Process navigation with enhanced back button logic
    $new_inputs = [];
    $language = $session['language'];
    $district_page = $session['district_page'] ?? 1;
    $weather_page = $session['weather_page'] ?? 1;
    
    if ($inputs) {
        $langCode = $inputs[0];
        $language = in_array($langCode, $valid_options['language']) ? ($langCode === '2' ? 'ci' : 'en') : $session['language'];
        $new_inputs = [$langCode];

        // Enhanced back button handling
        $last_back_index = -1;
        for ($i = count($inputs) - 1; $i >= 0; $i--) {
            if ($inputs[$i] === '0') {
                $last_back_index = $i;
                break;
            }
        }

        if ($last_back_index >= 0) {
            // Handle back action
            $forward_inputs = array_filter(array_slice($inputs, $last_back_index + 1), function($input) {
                return $input !== '0';
            });
            $new_inputs = array_merge([$langCode], $forward_inputs);
            
            // Reset pagination when going back
            $district_page = 1;
            $weather_page = 1;
            
            file_put_contents(__DIR__ . '/ussd_sessions.log', date('c') . ' - BACK DETECTED: Reset to main menu, Forward Inputs: ' . json_encode($forward_inputs) . PHP_EOL, FILE_APPEND);
        } else {
            $new_inputs = $inputs;
            
            // Handle pagination for district menus
            if (count($inputs) >= 2) {
                $main_option = $inputs[1];
                
                if (in_array($main_option, ['2', '5', '7', '8'])) { // District-based menus
                    if (count($inputs) == 3 && $inputs[2] == '9' && $district_page < 6) {
                        $district_page++;
                        $new_inputs = array_slice($inputs, 0, 2);
                    } elseif (count($inputs) == 3 && isset($inputs[2])) {
                        $district_page = 1;
                    }
                } elseif ($main_option == '9') { // Weather menu
                    if (count($inputs) == 3 && $inputs[2] == '9' && $weather_page < 6) {
                        $weather_page++;
                        $new_inputs = array_slice($inputs, 0, 2);
                    } elseif (count($inputs) == 3 && isset($inputs[2])) {
                        $weather_page = 1;
                    }
                }
            }
        }
    }
    
    $level = count($new_inputs);
    $last_input = $new_inputs ? end($new_inputs) : '';

    // Validate inputs
    if ($level >= 1 && !in_array($new_inputs[0], $valid_options['language'])) {
        $new_inputs = [];
        $level = 0;
        $last_input = '';
    } elseif ($level >= 2 && !in_array($new_inputs[1], $valid_options['main_menu'])) {
        $new_inputs = [$new_inputs[0]];
        $level = 1;
        $last_input = $new_inputs[0];
    } elseif ($level >= 3) {
        $main_option = $new_inputs[1];
        
        // Get valid options based on current page
        $current_page_options = [];
        if (in_array($main_option, ['2', '5', '7', '8'])) {
            $current_page_options = $valid_options['districts'][$district_page] ?? [];
        } elseif ($main_option == '9') {
            $current_page_options = $valid_options['weather_districts'][$weather_page] ?? [];
        }
        
        if (!in_array($main_option, ['2', '3', '4', '5', '7', '8', '9']) && 
            !in_array($new_inputs[2], array_merge($current_page_options, $valid_options['crops']))) {
            $new_inputs = array_slice($new_inputs, 0, 2);
            $level = 2;
            $last_input = $new_inputs[1];
        }
    } elseif ($level >= 4) {
        $main_option = $new_inputs[1];
        $current_page_options = $valid_options['districts'][1] ?? [];
        if (!in_array($main_option, ['2', '3', '4', '5', '7', '8', '9']) && 
            !in_array($new_inputs[2], $valid_options['crops']) && 
            !in_array($new_inputs[3], array_merge($current_page_options, $valid_options['practices']))) {
            $new_inputs = array_slice($new_inputs, 0, 3);
            $level = 3;
            $last_input = $new_inputs[2];
        }
    }

    // Cap level
    if ($level > 4) {
        $new_inputs = array_slice($new_inputs, 0, 4);
        $level = 4;
        $last_input = end($new_inputs);
        file_put_contents(__DIR__ . '/ussd_sessions.log', date('c') . ' - ERROR: Level capped at 4' . PHP_EOL, FILE_APPEND);
    }

    // Log navigation
    file_put_contents(__DIR__ . '/ussd_sessions.log', date('c') . ' - NAV: Inputs: ' . json_encode($new_inputs) . 
                      ', Level: ' . $level . ', Last: ' . $last_input . 
                      ', District Page: ' . $district_page . 
                      ', Weather Page: ' . $weather_page . PHP_EOL, FILE_APPEND);

    // === Menu Logic ===
    $response = '';
    if ($level === 0) {
        $response = "CON " . $menu_texts['language_selection'][$language];
    } elseif ($level === 1) {
        $response = "CON " . $menu_texts['main_menu'][$language];
    } elseif ($level === 2) {
        $main_option = $new_inputs[1];
        if (!in_array($main_option, $valid_options['main_menu'])) {
            $response = $menu_texts['errors']['invalid'][$language];
        } else {
            switch ($main_option) {
                case '1': // Crop Prices
                    $query = "SELECT c.name, cp.min_price, cp.market_price, cp.unit 
                              FROM crop_prices cp JOIN crops c ON cp.crop_id = c.id";
                    $result = execute_query($mysqli, $query, [], '', function($row) {
                        return "{$row['name']}: Min MWK {$row['min_price']}/{$row['unit']}, Market MWK {$row['market_price']}/{$row['unit']}\n";
                    });
                    $response = $result ? "CON $result" . $menu_texts['back_option'][$language] : $menu_texts['errors']['no_data'][$language];
                    break;
                    
                case '2': case '5': case '7': case '8': // District-based options
                    $district_page = 1;
                    $response = "CON " . $menu_texts['district_selection'][$language][$district_page];
                    break;
                    
                case '3': case '4': // Crop-based options
                    $response = "CON " . $menu_texts['crop_selection'][$language];
                    break;
                    
                case '6': // Basic Farming Info
                    $query = "SELECT topic, info_$language AS info FROM basic_farming_info WHERE info_$language IS NOT NULL";
                    $result = execute_query($mysqli, $query, [], '', function($row) {
                        return "{$row['topic']}: {$row['info']}\n";
                    });
                    $response = $result ? "CON $result" . $menu_texts['back_option'][$language] : $menu_texts['errors']['no_data'][$language];
                    break;
                    
                case '9': // Weather Forecast
                    $weather_page = 1;
                    $response = "CON " . $menu_texts['weather_forecast'][$language][$weather_page];
                    break;
                    
                case '10': // Exit
                    $response = $menu_texts['exit'][$language];
                    break;
            }
        }
    } elseif ($level === 3) {
        $main_option = $new_inputs[1];
        $sub_option = $new_inputs[2];
        
        // Get current page options
        $current_page = 1;
        $current_options = [];
        if (in_array($main_option, ['2', '5', '7', '8'])) {
            $current_page = $district_page;
            $current_options = $valid_options['districts'][$district_page] ?? [];
        } elseif ($main_option == '9') {
            $current_page = $weather_page;
            $current_options = $valid_options['weather_districts'][$weather_page] ?? [];
        }
        
        if (!in_array($main_option, $valid_options['main_menu']) || 
            (!in_array($sub_option, $current_options) && 
             !in_array($sub_option, $valid_options['crops']))) {
            $response = $menu_texts['errors']['invalid'][$language];
        } else {
            switch ($main_option) {
                case '9': // Weather Forecast
                    if ($sub_option == '9') {
                        $weather_page++;
                        $response = "CON " . $menu_texts['weather_forecast'][$language][$weather_page];
                    } elseif (in_array($sub_option, $current_options)) {
                        require_once __DIR__ . '/weather.php';
                        $forecast = get_weather_forecast($sub_option, $language);
                        $response = $forecast ? "CON " . $forecast . $menu_texts['back_option'][$language] 
                                  : $menu_texts['errors']['no_data'][$language];
                    }
                    break;
                    
                case '2': case '5': case '7': case '8': // District-based options
                    if ($sub_option == '9') {
                        $district_page++;
                        $response = "CON " . $menu_texts['district_selection'][$language][$district_page];
                    } elseif (in_array($sub_option, $current_options)) {
                        switch ($main_option) {
                            case '2': // Market Insights
                                $query = "SELECT insight_$language AS insight FROM market_insights 
                                          WHERE district_id = ? AND insight_$language IS NOT NULL";
                                $result = execute_query($mysqli, $query, [(int)$sub_option], 'i', function($row) {
                                    return $row['insight'] . "\n";
                                });
                                $response = $result ? "CON $result" . $menu_texts['back_option'][$language] : $menu_texts['errors']['no_data'][$language];
                                break;
                                
                            case '5': // Community Q&A
                                $query = "SELECT question_$language AS question, answer_$language AS answer 
                                          FROM community_qa WHERE district_id = ? AND answer_$language IS NOT NULL";
                                $result = execute_query($mysqli, $query, [(int)$sub_option], 'i', function($row) {
                                    return "Q: {$row['question']}\nA: {$row['answer']}\n";
                                });
                                $response = $result ? "CON $result" . $menu_texts['back_option'][$language] : $menu_texts['errors']['no_data'][$language];
                                break;
                                
                            case '7': // Find Sellers
                                $query = "SELECT s.name, scd.phone_number, scd.email, scd.address, AVG(r.rating_value) AS average_rating 
                                          FROM sellers s JOIN seller_contact_details scd ON s.contact_id = scd.id 
                                          LEFT JOIN ratings r ON s.id = r.seller_id WHERE s.district_id = ? 
                                          GROUP BY s.id, s.name, scd.phone_number, scd.email, scd.address";
                                $result = execute_query($mysqli, $query, [(int)$sub_option], 'i', function($row) {
                                    $email = $row['email'] ?: 'N/A';
                                    $address = $row['address'] ?: 'N/A';
                                    $rating = $row['average_rating'] ? number_format($row['average_rating'], 1) . ' stars' : 'No ratings';
                                    return "{$row['name']}: {$row['phone_number']}, $email, $address ($rating)\n";
                                });
                                $response = $result ? "CON $result" . $menu_texts['back_option'][$language] : $menu_texts['errors']['no_data'][$language];
                                break;
                                
                            case '8': // Find Buyers
                                $query = "SELECT b.name, bcd.phone_number, bcd.email, bcd.address 
                                          FROM buyers b JOIN buyer_contact_details bcd ON b.contact_id = bcd.id 
                                          WHERE b.district_id = ?";
                                $result = execute_query($mysqli, $query, [(int)$sub_option], 'i', function($row) {
                                    $email = $row['email'] ?: 'N/A';
                                    $address = $row['address'] ?: 'N/A';
                                    return "{$row['name']}: {$row['phone_number']}, $email, $address\n";
                                });
                                $response = $result ? "CON $result" . $menu_texts['back_option'][$language] : $menu_texts['errors']['no_data'][$language];
                                break;
                        }
                    }
                    break;
                    
                case '3': // Pest Control Tips
                    if (in_array($sub_option, $valid_options['crops'])) {
                        $response = "CON " . $menu_texts['district_selection'][$language][1];
                    }
                    break;
                    
                case '4': // Farming Best Practices
                    if (in_array($sub_option, $valid_options['crops'])) {
                        $response = "CON " . $menu_texts['practice_selection'][$language];
                    }
                    break;
            }
        }
    } elseif ($level === 4) {
        $main_option = $new_inputs[1];
        $crop = $new_inputs[2];
        $sub_option = $new_inputs[3];
        
        if (!in_array($main_option, $valid_options['main_menu']) || 
            !in_array($crop, $valid_options['crops']) || 
            (!in_array($sub_option, $valid_options['districts'][1]) && !in_array($sub_option, $valid_options['practices']))) {
            $response = $menu_texts['errors']['invalid'][$language];
        } else {
            if ($main_option === '3' && in_array($sub_option, $valid_options['districts'][1])) {
                $query = "SELECT tip_$language AS tip FROM pest_control_tips 
                          WHERE crop_id = ? AND district_id = ? AND tip_$language IS NOT NULL";
                $result = execute_query($mysqli, $query, [(int)$crop, (int)$sub_option], 'ii', function($row) {
                    return $row['tip'] . "\n";
                });
                $response = $result ? "CON $result" . $menu_texts['back_option'][$language] : $menu_texts['errors']['no_data'][$language];
            } elseif ($main_option === '4' && in_array($sub_option, $valid_options['practices'])) {
                $query = "SELECT practice_$language AS practice FROM farming_best_practices 
                          WHERE crop_id = ? AND practice_type = ? AND practice_$language IS NOT NULL";
                $result = execute_query($mysqli, $query, [(int)$crop, $practice_types[$sub_option] ?? ''], 'is', function($row) {
                    return $row['practice'] . "\n";
                });
                $response = $result ? "CON $result" . $menu_texts['back_option'][$language] : $menu_texts['errors']['no_data'][$language];
            }
        }
    }

    // Fallback for empty response
    if (empty($response)) {
        $response = $level <= 1 ? "CON " . $menu_texts['language_selection'][$language] 
            : "CON " . $menu_texts['main_menu'][$language];
        file_put_contents(__DIR__ . '/ussd_sessions.log', date('c') . ' - ERROR: Empty response, used fallback' . PHP_EOL, FILE_APPEND);
    }

    // Update session
    $session = [
        'inputs' => $new_inputs,
        'language' => $language,
        'district_page' => $district_page,
        'weather_page' => $weather_page
    ];
    
    if (strpos($response, 'END') === 0) {
        if (file_exists($session_file)) {
            unlink($session_file);
        }
        file_put_contents(__DIR__ . '/ussd_sessions.log', date('c') . ' - SESSION CLEARED' . PHP_EOL, FILE_APPEND);
    } else {
        file_put_contents($session_file, json_encode($session));
        file_put_contents(__DIR__ . '/ussd_sessions.log', date('c') . ' - SESSION: ' . json_encode($session) . PHP_EOL, FILE_APPEND);
    }

    // Log response
    file_put_contents(__DIR__ . '/ussd_sessions.log', date('c') . ' - RESPONSE: ' . $response . PHP_EOL, FILE_APPEND);

    return $response;
}
?>