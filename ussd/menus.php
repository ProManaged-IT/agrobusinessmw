<?php
// === Menu Definitions and Validation ===
// Centralized menu texts and valid options for USSD app with paginated districts

$menu_texts = [
    // Language selection
    'language_selection' => [
        'en' => "🌱[AGRO-BIZ]🌱\nWelcome to AgroBusiness\n\n1. English\n2. Chichewa",
        'ci' => "🌱[AGRO-BIZ]🌱\nTakulandilani ku AgroBusiness\n\n1. English\n2. Chichewa"
    ],
    
    // Main menu
    'main_menu' => [
        'en' => "🌾[AGRO MENU]🌾\nSelect option:\n1. Crop Prices 💰\n2. Market Insights 📊\n3. Pest Control Tips 🐛\n4. Farming Practices 🌾\n5. Community Q&A ❓\n6. Farming Info 📚\n7. Find Sellers 🛒\n8. Find Buyers 🤝\n9. Weather 🌤️\n0. Back 🔙",
        'ci' => "🌾[MENU YA AGRO]🌾\nSankhani:\n1. Mitengo ya Mbeu 💰\n2. Zidziwitso za Msika 📊\n3. Malangizo a Tizirombo 🐛\n4. Njira Zolima 🌾\n5. Mafunso ndi Mayankho ❓\n6. Zofunika Zokulima 📚\n7. Pezani Ogulitsa 🛒\n8. Pezani Ogula 🤝\n9. Mvula ya Sabata 🌤️\n0. Kubwerera 🔙"
    ],

    // Weather forecast - paginated districts
    'weather_forecast' => [
        'en' => [
            1 => "🌤️[WEATHER PAGE 1/3]🌤️\nSelect district:\n1. Lilongwe 🏙️\n2. Blantyre 🏢\n3. Mzuzu 🌄\n4. Mchinji 🌍\n5. Ntchisi 🗺️\n6. Dedza ⛰️\n7. Kasungu 🌳\n8. Nkhata-Bay 🌊\n0. Back 🔙\n9. Next Page ▶️",
           2 => "🌤️[WEATHER PAGE 2/3]🌤️\nSelect district:\n1. Rumphi 🏞️\n2. Karonga 🐟\n3. Thyolo 🍵\n4. Chitipa 🛤️\n5. Mangochi 🏝️\n6. Chikwawa 🌅\n7. Zomba 🏫\n8. Nkhotakota ⛵\n0. Back 🔙\n9. Next Page ▶️",
           3 => "🌤️[WEATHER PAGE 3/3]🌤️\nSelect district:\n1. Ntcheu 🌄\n2. Balaka 🛣️\n3. Mulanje ⛰️\n4. Machinga 🌄\n5. Phalombe 🌿\n6. Dowa 🌱\n7. Likoma 🏝️\n8. Salima ⛵\n0. Back 🔙\n9. Main Menu"
        ],
        'ci' => [
            1 => "🌤️[MVULA PEJI 1/3]🌤️\nSankhani chigawo:\n1. Lilongwe 🏙️\n2. Blantyre 🏢\n3. Mzuzu 🌄\n4. Mchinji 🌍\n5. Ntchisi 🗺️\n6. Dedza ⛰️\n7. Kasungu 🌳\n8. Nkhata-Bay 🌊\n0. Kubwerera 🔙\n9. Peji Yotsatira ▶️",
           2 => "🌤️[MVULA PEJI 2/3]🌤️\nSankhani chigawo:\n1. Rumphi 🏞️\n2. Karonga 🐟\n3. Thyolo 🍵\n4. Chitipa 🛤️\n5. Mangochi 🏝️\n6. Chikwawa 🌅\n7. Zomba 🏫\n8. Nkhotakota ⛵\n0. Kubwerera 🔙\n9. Peji Yotsatira ▶️",
           3 => "🌤️[MVULA PEJI 3/3]🌤️\nSankhani chigawo:\n1. Ntcheu 🌄\n2. Balaka 🛣️\n3. Mulanje ⛰️\n4. Machinga 🌄\n5. Phalombe 🌿\n6. Dowa 🌱\n7. Likoma 🏝️\n8. Salima ⛵\n0. Kubwerera 🔙\n9. Menu Yaikulu"
        ]
    ],

    // District selection - paginated
    'district_selection' => [
        'en' => [
            1 => "📍[DISTRICTS PAGE 1/3]📍\nSelect district:\n1. Lilongwe 🏙️\n2. Blantyre 🏢\n3. Mzuzu 🌄\n4. Mchinji 🌍\n5. Ntchisi 🗺️\n6. Dedza ⛰️\n7. Kasungu 🌳\n8. Nkhata-Bay 🌊\n0. Back 🔙\n9. Next Page ▶️",
            2 => "📍[DISTRICTS PAGE 2/3]📍\nSelect district:\n1. Rumphi 🏞️\n2. Karonga 🐟\n3. Thyolo 🍵\n4. Chitipa 🛤️\n5. Mangochi 🏝️\n6. Chikwawa 🌅\n7. Zomba 🏫\n8. Nkhotakota ⛵\n0. Back 🔙\n9. Next Page ▶️",
           3 => "📍[DISTRICTS PAGE 3/3]📍\nSelect district:\n1. Ntcheu 🌄\n2. Balaka 🛣️\n3. Mulanje ⛰️\n4. Machinga 🌄\n5. Phalombe 🌿\n6. Dowa 🌱\n7. Likoma 🏝️\n8. Salima ⛵\n0. Back 🔙\n9. Main Menu"
        ],
        'ci' => [
            1 => "📍[MAGAWO PEJI 1/3]📍\nSankhani chigawo:\n1. Lilongwe 🏙️\n2. Blantyre 🏢\n3. Mzuzu 🌄\n4. Mchinji 🌍\n5. Ntchisi 🗺️\n6. Dedza ⛰️\n7. Kasungu 🌳\n8. Nkhata-Bay 🌊\n0. Kubwerera 🔙\n9. Peji Yotsatira ▶️",
            2 => "📍[MAGAWO PEJI 2/3]📍\nSankhani chigawo:\n1. Rumphi 🏞️\n2. Karonga 🐟\n3. Thyolo 🍵\n4. Chitipa 🛤️\n5. Mangochi 🏝️\n6. Chikwawa 🌅\n7. Zomba 🏫\n8. Nkhotakota ⛵\n0. Kubwerera 🔙\n9. Peji Yotsatira ▶️",
           3 => "📍[MAGAWO PEJI 3/3]📍\nSankhani chigawo:\n1. Ntcheu 🌄\n2. Balaka 🛣️\n3. Mulanje ⛰️\n4. Machinga 🌄\n5. Phalombe 🌿\n6. Dowa 🌱\n7. Likoma 🏝️\n8. Salima ⛵\n0. Kubwerera 🔙\n9. Menu Yaikulu"
        ]
    ],

    // Crop Prices sub-menu
    'crop_prices_menu' => [
        'en' => "💰[CROP PRICES]💰\nSelect:\n1. By District (all crops)\n2. By Crop\n0. Back 🔙",
        'ci' => "💰[MITENGO YA MBEU]💰\nSankhani:\n1. Pa Chigawo (mbeu zonse)\n2. Pa Mbeu\n0. Kubwerera 🔙"
    ],

    // Expanded crop selection for prices (all 9 crops, pos = crop_id)
    'crop_prices_crop' => [
        'en' => "🌽[SELECT CROP]🌽\n1. Maize\n2. Tobacco\n3. Groundnuts\n4. Soybeans\n5. Rice\n6. Cotton\n7. Tea\n8. Coffee\n9. Beans\n0. Back 🔙",
        'ci' => "🌽[SANKHANI MBEU]🌽\n1. Chimanga\n2. Fodya\n3. Nthola\n4. Soya\n5. Mpunga\n6. Thonje\n7. Tii\n8. Khofi\n9. Nyemba\n0. Kubwerera 🔙"
    ],

    // Crop selection (used by pest control & farming practices — 3 crops only)
    'crop_selection' => [
        'en' => "🌽[CROPS]🌽\nSelect crop:\n1. Maize 🌽\n2. Tobacco 🍂\n3. Groundnuts 🥜\n0. Back 🔙",
        'ci' => "🌽[MBEU]🌽\nSankhani mbeu:\n1. Chimanga 🌽\n2. Fodya 🍂\n3. Nthola 🥜\n0. Kubwerera 🔙"
    ],

    // Practice selection
    'practice_selection' => [
        'en' => "🚜[PRACTICES]🚜\nSelect practice:\n1. Planting 🌱\n2. Harvesting 🌿\n3. Growing 🌞\n0. Back 🔙",
        'ci' => "🚜[NJIRA]🚜\nSankhani njira:\n1. Kubzala 🌱\n2. Kukolola 🌿\n3. Kulima 🌞\n0. Kubwerera 🔙"
    ],

    // Back option
    'back_option' => [
        'en' => "\n0. Back 🔙\n9. Main Menu",
        'ci' => "\n0. Kubwerera 🔙\n9. Menu Yaikulu"
    ],

    // Error messages
    'errors' => [
        'invalid' => [
            'en' => "END ❌[ERROR]❌\nInvalid option. Try again.",
            'ci' => "END ❌[ZOLAKWIKA]❌\nSankho losavomerezeka. Yesaninso."
        ],
        'no_data' => [
            'en' => "END ⚠️[NOTICE]⚠️\nNo info available.",
            'ci' => "END ⚠️[CHENJEZO]⚠️\nPalibe zambiri."
        ]
    ],

    // Exit message
    'exit' => [
        'en' => "END 🌱[THANKS!]🌱\nThank you! 👋",
        'ci' => "END 🌱[ZIKOMO!]🌱\nZikomo! 👋"
    ]
];

// Validation rules
$valid_options = [
    'language' => ['1', '2'],
    'main_menu' => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    'weather_districts' => [
        1 => ['1', '2', '3', '4', '5', '6', '7', '8', '0', '9'], // Page 1 — 0=Back
        2 => ['1', '2', '3', '4', '5', '6', '7', '8', '0', '9'], // Page 2 — 0=Back
        3 => ['1', '2', '3', '4', '5', '6', '7', '8', '0', '9'] // Page 3 — 0=Back, 9=Main Menu
    ],
    'districts' => [
        1 => ['1', '2', '3', '4', '5', '6', '7', '8', '0', '9'], // Page 1 — 0=Back
        2 => ['1', '2', '3', '4', '5', '6', '7', '8', '0', '9'], // Page 2 — 0=Back
        3 => ['1', '2', '3', '4', '5', '6', '7', '8', '0', '9'] // Page 3 — 0=Back, 9=Main Menu
    ],
    'crop_prices' => ['1', '2', '0'],
    'price_crops' => ['1','2','3','4','5','6','7','8','9','0'],
    'crops' => ['1', '2', '3', '0'],
    'practices' => ['1', '2', '3', '0'],
    'results' => ['0']
];

// Practice types mapping
$practice_types = [
    '1' => 'Planting',
    '2' => 'Harvesting',
    '3' => 'Growing'
];

// NOTE: District weather coordinates live in config.php ($district_coords),
// keyed by real DB district IDs. A duplicate table used to live here but had
// IDs 17-24 shifted by one (17=Balaka instead of Ntcheu, etc.), and because
// menus.php loads after config.php it silently overrode the correct table —
// making page-3 weather return the wrong location. Do not redefine it here.
?>