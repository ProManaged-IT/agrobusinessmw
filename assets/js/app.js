// AgroBusiness Malawi - Revolutionary Final Version (COMPLETE)
class AgroBusinessRevolution {
    constructor() {
        this.apiBase = 'api.php';
        this.currentLang = 'en';


        // Enhanced translation dictionary
        this.texts = {
            en: {
                welcome: 'Welcome to AgroBusiness',
                subtitle: 'Your complete agricultural platform',
                crop_prices: 'Crop Prices',
                crop_prices_desc: 'Live market prices for all crops',
                weather: 'Weather Forecast',
                weather_desc: '7-day weather predictions',
                market_insights: 'Market Insights',
                market_insights_desc: 'District market intelligence',
                find_sellers: 'Find Sellers',
                find_sellers_desc: 'Connect with suppliers',
                find_buyers: 'Find Buyers',
                find_buyers_desc: 'Find markets for your produce',
                pest_control: 'Pest Control',
                pest_control_desc: 'Combat pests effectively',
                farming_tips: 'Farming Tips',
                farming_tips_desc: 'Expert farming practices',
                farming_guide: 'Farming Guide',
                farming_guide_desc: 'Step-by-step planting and care',
                basic_info: 'Basic Information',
                basic_info_desc: 'Essential farming knowledge',
                select_district: 'Select Your District',
                select_crop: 'Select Your Crop',
                loading: 'Loading...',
                no_data: 'No data available',
                error: 'An error occurred',
                search_districts: 'Search districts...',
                search_crops: 'Search crops...',
                district_picker_intro: 'Choose where you want to trade. Search by district or region, then tap one result.',
                search_sellers: 'Search sellers, crops, phone...',
                search_buyers: 'Search buyers, crops, phone...',
                prevention_label: 'Prevention',
                essential_label: 'Essential',
                also_view: 'Also view:',
                crop_actions_heading: 'What would you like to know about',
                current_prices: 'Current Prices',
                market_prices_for: 'Market prices for',
                best_practices_for: 'Best practices for',
                protect_crops: 'Protect your',
                cereal: 'Cereal',
                cash: 'Cash Crop',
                legume: 'Legume',
                vegetable: 'Vegetable',
                root: 'Root Crop',
                specialty: 'Specialty'
            },
            ci: {
                welcome: 'Takulandirani ku AgroBusiness',
                subtitle: 'Chidziwitso chonse cha ulimi',
                crop_prices: 'Mitengo ya Mbeu',
                crop_prices_desc: 'Mitengo ya msika ya mbeu zonse',
                weather: 'Zanyengo',
                weather_desc: 'Zonyengo za masiku 7',
                market_insights: 'Zidziwitso za Msika',
                market_insights_desc: 'Zidziwitso za zigawo za msika',
                find_sellers: 'Pezani Ogulitsa',
                find_sellers_desc: 'Lumikizanani ndi ogulitsa',
                find_buyers: 'Pezani Ogula',
                find_buyers_desc: 'Pezani msika wa zokolola',
                pest_control: 'Kuteteza Tizirombo',
                pest_control_desc: 'Menyana ndi tizirombo bwino',
                farming_tips: 'Malangizo Alimi',
                farming_tips_desc: 'Njira zabwino za ulimi',
                farming_guide: 'Malangizo Ulimi',
                farming_guide_desc: 'Zosintha sitepe ndi sitepe za kulima',
                basic_info: 'Zidziwitso Zoyambira',
                basic_info_desc: 'Zidziwitso zofunikira za ulimi',
                select_district: 'Sankhani Chigawo Chanu',
                select_crop: 'Sankhani Mbeu Yanu',
                loading: 'Kuyembekezera...',
                no_data: 'Palibe zidziwitso',
                error: 'Pali vuto',
                search_districts: 'Fufuzani maboma...',
                search_crops: 'Fufuzani mbeu...',
                district_picker_intro: 'Sankhani kumene mukufuna kugula kapena kugulitsa. Fufuzani chigawo kapena dera, ndiye dinani chisankho chimodzi.',
                search_sellers: 'Sakani ogulitsa, mbewu, nambala...',
                search_buyers: 'Sakani ogula, mbewu, nambala...',
                prevention_label: 'Chitetezo',
                essential_label: 'Zofunikira',
                also_view: 'Onanso:',
                crop_actions_heading: 'Mukufuna kudziwa chiyani pa',
                current_prices: 'Mitengo Yapano',
                market_prices_for: 'Mitengo ya msika ya',
                best_practices_for: 'Njira zabwino za',
                protect_crops: 'Tetezani mbeu ya',
                cereal: 'Chinangwa',
                cash: 'Mbeu ya Ndalama',
                legume: 'Nyemba',
                vegetable: 'Ndiwo',
                root: 'Mbeu ya Mizizi',
                specialty: 'Mbeu Inanena'
            }
        };

        // Enhanced district coordinates with regions
        this.districtCoords = {
            1: { lat: -13.9833, lon: 33.7833, name: 'Lilongwe', region: 'Central' },
            2: { lat: -15.7861, lon: 35.0058, name: 'Blantyre', region: 'Southern' },
            3: { lat: -11.4581, lon: 34.0156, name: 'Mzuzu', region: 'Northern' },
            4: { lat: -13.7986, lon: 33.6856, name: 'Mchinji', region: 'Central' },
            5: { lat: -13.3744, lon: 34.0033, name: 'Ntchisi', region: 'Central' },
            6: { lat: -14.3833, lon: 34.3333, name: 'Dedza', region: 'Central' },
            7: { lat: -13.0333, lon: 33.4833, name: 'Kasungu', region: 'Central' },
            8: { lat: -11.6, lon: 34.3, name: 'Nkhata Bay', region: 'Northern' },
            9: { lat: -15.3833, lon: 35.3167, name: 'Zomba', region: 'Southern' },
            10: { lat: -14.9667, lon: 35.5167, name: 'Machinga', region: 'Southern' },
            11: { lat: -14.4784, lon: 35.2647, name: 'Mangochi', region: 'Southern' },
            12: { lat: -9.9333, lon: 33.9333, name: 'Karonga', region: 'Northern' },
            13: { lat: -12.1667, lon: 33.9333, name: 'Rumphi', region: 'Northern' },
            14: { lat: -11.8500, lon: 34.2833, name: 'Likoma', region: 'Northern' },
            15: { lat: -14.3167, lon: 34.8333, name: 'Salima', region: 'Central' },
            16: { lat: -15.2667, lon: 35.2833, name: 'Balaka', region: 'Southern' },
            17: { lat: -16.8833, lon: 35.1500, name: 'Nsanje', region: 'Southern' },
            18: { lat: -16.0000, lon: 35.3000, name: 'Chiradzulu', region: 'Southern' },
            19: { lat: -15.9500, lon: 34.6833, name: 'Thyolo', region: 'Southern' },
            20: { lat: -16.2333, lon: 34.8667, name: 'Mwanza', region: 'Southern' },
            21: { lat: -16.8667, lon: 34.4333, name: 'Chikwawa', region: 'Southern' },
            22: { lat: -15.4667, lon: 34.9833, name: 'Ntcheu', region: 'Southern' },
            23: { lat: -13.2543, lon: 34.4587, name: 'Nkhotakota', region: 'Central' },
            24: { lat: -12.5167, lon: 34.0333, name: 'Likoma Island', region: 'Northern' },
            25: { lat: -14.7000, lon: 34.4500, name: 'Dowa', region: 'Central' },
            26: { lat: -13.9667, lon: 33.4667, name: 'Kasungu Rural', region: 'Central' },
            27: { lat: -14.1792, lon: 33.7734, name: 'Mchinji Rural', region: 'Central' },
            28: { lat: -14.0006, lon: 35.2656, name: 'Lilongwe Rural', region: 'Central' }
        };

        // Crop categories for better organization
        this.cropCategories = {
            'cereal': ['Maize', 'Rice', 'Sorghum', 'Millet'],
            'cash': ['Tobacco', 'Tea', 'Coffee', 'Cotton', 'Sugarcane'],
            'legume': ['Groundnuts', 'Soybeans', 'Beans', 'Pigeon Peas'],
            'vegetable': ['Tomatoes', 'Onions', 'Cabbage', 'Irish Potato'],
            'root': ['Cassava', 'Sweet Potato', 'Irish Potato']
        };

        // Chichewa translations for DB practice_type values (farming tips badges)
        this.practiceTypeMap = {
            'Planting': 'Kulima',
            'Irrigation': 'Madzi',
            'Pest Control': 'Kuteteza Tizirombo',
            'Harvesting': 'Kukolola',
            'Fertilizer': 'Feteleza',
            'Storage': 'Kusungirira',
            'Soil Preparation': 'Kukonza Nthaka',
            'Weeding': 'Chotsa Udzu'
        };

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }

    async initializeApp() {

        // Initialize loading animation with real data
        await this.initializeLoadingScreen();

        // Bind all events
        this.bindAllEvents();

        // Hide loading screen now that data is ready — give the progress animation
        // a brief moment to finish rendering before fading out (200ms is enough).
        setTimeout(() => this.hideLoadingScreen(), 200);

        // Test database connection
        this.testConnection();

    }

    async initializeLoadingScreen() {
        try {
            // Load real data during loading screen
            const [districts, crops] = await Promise.all([
                this.loadDistricts().catch(() => []),
                this.loadCrops().catch(() => [])
            ]);

            // Animate numbers in loading screen
            this.animateLoadingNumbers('loading-districts', districts.length || 28);
            this.animateLoadingNumbers('loading-crops', crops.length || 12);

            // Update progress text
            this.updateProgressText();

        } catch (error) {
            this.animateLoadingNumbers('loading-districts', 28);
            this.animateLoadingNumbers('loading-crops', 12);
        }
    }

    animateLoadingNumbers(elementId, target) {
        const element = document.getElementById(elementId);
        if (!element) return;

        let current = 0;
        const increment = target / 50;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(interval);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 40);
    }

    updateProgressText() {
        const progressText = document.querySelector('.progress-text');
        if (!progressText) return;

        const messages = [
            'Initializing...',
            'Loading districts...',
            'Fetching crop data...',
            'Connecting to weather API...',
            'Preparing interface...',
            'Almost ready!'
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (progressText) {
                progressText.textContent = messages[index];
                index = (index + 1) % messages.length;
            }
            if (index === 0) clearInterval(interval);
        }, 500);
    }

    bindAllEvents() {
        // Revolutionary language selection
        this.bindLanguageSelection();

        // Service cards with enhanced interactions
        this.bindServiceCards();

        // Smart language switching
        this.bindLanguageSwitching();

        // Modal interactions
        this.bindModalEvents();

        // Search functionality
        this.bindSearchEvents();

        // Navigation
        this.bindNavigation();

        // Quick access FAB
        this.bindQuickAccess();

        // Statistics cards
        this.bindStatisticsCards();

        // Hero interactions
        this.bindHeroInteractions();

        // Add new event bindings
        this.bindKeyboardEvents();
        this.bindFocusManagement();
    }

    // Add new method for screen reader announcements
    announceToScreenReader(message) {
        // Create aria-live region for screen readers
        let liveRegion = document.getElementById('a11y-announcements');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'a11y-announcements';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
            document.body.appendChild(liveRegion);
        }

        liveRegion.textContent = message;
    }

    // Add keyboard navigation support
    bindKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            // Escape key to close modals
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    this.closeModal(activeModal);
                }
            }

            // Tab key trapping in modals
            if (e.key === 'Tab') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    // Ensure focus stays within the modal
                    this.trapFocus(activeModal, e);
                }
            }
        });
    }

    trapFocus(modal, event) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }

    // Add new method for focus management
    bindFocusManagement() {
        // Store last focused element when opening modals
        document.addEventListener('focusin', (e) => {
            if (e.target.closest('.modal.active')) {
                return;
            }

            const previousFocus = document.activeElement;
            if (previousFocus && previousFocus !== document.body) {
                previousFocus.setAttribute('data-last-focused', 'true');
            }
        });
    }
    bindLanguageSelection() {
        document.querySelectorAll('.lang-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const lang = card.dataset.lang;
                if (lang) {
                    this.selectLanguageWithAnimation(card, lang);
                }
            });
        });
    }

    // Update selectLanguageWithAnimation method
    selectLanguageWithAnimation(card, lang) {
        // Persist choice
        localStorage.setItem('hasSelectedLanguage', 'true');
        localStorage.setItem('preferredLanguage', lang);
        this.currentLang = lang;
        this.updateLanguageFlags();
        this.updateTexts();

        // Enhanced selection animation
        card.style.transform = 'scale(0.95)';
        card.style.background = 'rgba(255, 255, 255, 0.3)';

        setTimeout(() => {
            // Hide language screen with enhanced animation
            const langScreen = document.getElementById('language-selection');
            if (langScreen) {
                langScreen.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                langScreen.style.opacity = '0';
                langScreen.style.transform = 'translateY(-100px) scale(0.9)';
                langScreen.style.filter = 'blur(10px)';

                setTimeout(() => {
                    langScreen.style.display = 'none';
                    this.showScreen('dashboard');
                    this.initializeDashboard();

                    // Set focus for accessibility
                    const mainContent = document.getElementById('main-content');
                    if (mainContent) {
                        mainContent.focus();
                    }
                }, 500);
            }
        }, 200);
    }

    hideLanguageScreen(lang) {
        const langScreen = document.getElementById('language-selection');

        // Set language first
        this.currentLang = lang;
        this.isLanguageSelected = true;
        this.updateLanguageFlags();
        this.updateTexts();

        // Animate out
        if (langScreen) {
            langScreen.style.transform = 'translateY(-100%)';
            langScreen.style.opacity = '0';
            langScreen.style.filter = 'blur(10px)';

            setTimeout(() => {
                this.showScreen('dashboard');
                this.initializeDashboard();
            }, 800);
        }
    }

    async initializeDashboard() {

        // Load and display real statistics
        await this.updateDashboardStats();

        // Show language switcher in header now that language is selected
        const langSwitcher = document.querySelector('.lang-switcher-smart');
        if (langSwitcher) {
            langSwitcher.style.opacity = '1';
            langSwitcher.style.transform = 'translateY(0)';
        }
    }

    async updateDashboardStats() {
        try {
            const [districts, crops] = await Promise.all([
                this.loadDistricts(),
                this.loadCrops()
            ]);

            // Update hero stats
            this.animateNumber(document.getElementById('districts-count-hero'), districts.length);
            this.animateNumber(document.getElementById('crops-count-hero'), crops.length);

        } catch (error) {
            console.error('❌ Error updating dashboard stats:', error);
        }
    }

    animateNumber(element, target) {
        if (!element) return;

        let current = 0;
        const increment = target / 40;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(interval);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 50);
    }

    // Update bindServiceCards method
    bindServiceCards() {
        document.querySelectorAll('.service-card').forEach(card => {
            // Click event
            card.addEventListener('click', (e) => {
                const service = card.dataset.service;
                if (service) {
                    this.activateServiceCard(card, service);
                }
            });

            // Keyboard event
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const service = card.dataset.service;
                    if (service) {
                        this.activateServiceCard(card, service);
                    }
                }
            });

            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                this.enhanceCardHover(card);
            });

            card.addEventListener('mouseleave', () => {
                this.resetCardHover(card);
            });

            // Focus management
            card.addEventListener('focus', () => {
                card.style.outline = '2px solid var(--primary)';
                card.style.outlineOffset = '2px';
            });

            card.addEventListener('blur', () => {
                card.style.outline = '';
            });
        });
    }

    // Update activateServiceCard method
    activateServiceCard(card, service) {
        // Visual feedback
        card.style.transform = 'scale(0.96)';
        card.style.filter = 'brightness(1.1)';

        // Announce to screen readers
        const serviceName = card.querySelector('h3')?.textContent || service;
        this.announceToScreenReader(`Opening ${serviceName}`);

        setTimeout(() => {
            card.style.transform = '';
            card.style.filter = '';
            this.openService(service);
        }, 200);
    }

    enhanceCardHover(card) {
        const glow = card.querySelector('.card-glow-revolution');
        if (glow) {
            glow.style.opacity = '1';
        }
    }

    resetCardHover(card) {
        const glow = card.querySelector('.card-glow-revolution');
        if (glow) {
            glow.style.opacity = '0';
        }
    }

    // Update bindLanguageSwitching method
    bindLanguageSwitching() {
        const langCurrent = document.getElementById('current-lang-btn');
        const langDropdown = document.getElementById('lang-dropdown');

        if (langCurrent) {
            // Click event
            langCurrent.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLanguageDropdown();
            });

            // Keyboard event
            langCurrent.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.toggleLanguageDropdown();
                    if (langDropdown) {
                        const firstOption = langDropdown.querySelector('.lang-option-smart');
                        if (firstOption) firstOption.focus();
                    }
                }
            });
        }

        // Language options with keyboard support
        document.querySelectorAll('.lang-option-smart').forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = option.dataset.lang;
                this.changeLanguage(lang);
            });

            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const lang = option.dataset.lang;
                    this.changeLanguage(lang);
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = option.nextElementSibling;
                    if (next) next.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = option.previousElementSibling;
                    if (prev) prev.focus();
                    else if (langCurrent) langCurrent.focus();
                } else if (e.key === 'Escape') {
                    this.closeLanguageDropdown();
                    if (langCurrent) langCurrent.focus();
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.lang-switcher-smart')) {
                this.closeLanguageDropdown();
            }
        });
    }

    // Update toggleLanguageDropdown method
    toggleLanguageDropdown() {
        const langCurrent = document.getElementById('current-lang-btn');
        const langDropdown = document.getElementById('lang-dropdown');

        if (langCurrent && langDropdown) {
            const isActive = langCurrent.classList.contains('active');

            if (isActive) {
                this.closeLanguageDropdown();
            } else {
                langCurrent.classList.add('active');
                langDropdown.classList.add('active');
                langCurrent.setAttribute('aria-expanded', 'true');

                // Announce to screen readers
                this.announceToScreenReader('Language selector opened');
            }
        }
    }

    closeLanguageDropdown() {
        const langCurrent = document.getElementById('current-lang-btn');
        const langDropdown = document.getElementById('lang-dropdown');

        if (langCurrent && langDropdown) {
            langCurrent.classList.remove('active');
            langDropdown.classList.remove('active');
            langCurrent.setAttribute('aria-expanded', 'false');
        }
    }

    // Update changeLanguage method
    changeLanguage(lang) {
        if (lang === this.currentLang) {
            this.closeLanguageDropdown();
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        this.updateTexts();
        this.updateLanguageFlags();
        this.closeLanguageDropdown();

        // Visual feedback
        document.body.style.filter = 'brightness(1.1)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 200);

        // Announce to screen readers
        this.announceToScreenReader(`Language changed to ${lang === 'en' ? 'English' : 'Chichewa'}`);
    }
    updateLanguageFlags() {
        const flags = { en: '🇬🇧', ci: '🇲🇼' };
        const codes = { en: 'EN', ci: 'CI' };

        document.querySelectorAll('#current-flag').forEach(flag => {
            if (flag) flag.textContent = flags[this.currentLang];
        });

        document.querySelectorAll('.lang-code').forEach(code => {
            if (code) code.textContent = codes[this.currentLang];
        });
    }

    // Update updateTexts method
    updateTexts() {
        document.querySelectorAll('[data-text]').forEach(el => {
            const key = el.dataset.text;
            const text = this.texts[this.currentLang][key];
            if (text) {
                // Smooth text transition
                el.style.opacity = '0.5';
                setTimeout(() => {
                    el.textContent = text;
                    el.style.opacity = '1';
                }, 100);
            }
        });

        // Update search placeholders
        const districtSearch = document.getElementById('district-search');
        const cropSearch = document.getElementById('crop-search');

        if (districtSearch) {
            districtSearch.placeholder = this.texts[this.currentLang].search_districts || 'Search districts...';
        }
        if (cropSearch) {
            cropSearch.placeholder = this.texts[this.currentLang].search_crops || 'Search crops...';
        }

        // Re-render the farming guide in-place when language switches while on that view
        const contentArea = document.getElementById('content-area');
        if (contentArea && contentArea.dataset.view === 'farming_guide') {
            // Suppress pushNavState so switching language doesn't add a history entry
            this._historyReplaying = true;
            this.loadFarmingGuide();
            this._historyReplaying = false;
        }
    }

    bindModalEvents() {
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) this.closeModal(modal);
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                    this.closeModal(modal);
                }
            });
        });
    }

    bindSearchEvents() {
        const cropSearch = document.getElementById('crop-search');

        if (cropSearch) {
            cropSearch.addEventListener('input', (e) => {
                this.filterCrops(e.target.value);
            });
        }
    }

    filterDistricts(searchTerm) {
        const cards = document.querySelectorAll('.district-card');
        const term = searchTerm.toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(card => {
            const haystack = `${card.dataset.name || ''} ${card.dataset.region || ''}`.toLowerCase();
            const matches = haystack.includes(term);
            card.hidden = !matches;
            if (matches) visibleCount++;
        });

        const searchStats = document.getElementById('search-stats');
        if (searchStats) {
            searchStats.textContent = term ? `${visibleCount} district${visibleCount !== 1 ? 's' : ''} found` : `${cards.length} districts available`;
        }
    }

    filterCrops(searchTerm) {
        const items = document.querySelectorAll('.crop-item');
        const term = searchTerm.toLowerCase().trim();
        let visibleCount = 0;

        items.forEach(item => {
            const haystack = `${item.dataset.name || ''} ${item.dataset.category || ''}`.toLowerCase();
            const matches = haystack.includes(term);
            item.hidden = !matches;
            if (matches) visibleCount++;
        });

        const cropSearchStats = document.getElementById('crop-search-stats');
        if (cropSearchStats) {
            cropSearchStats.textContent = term ? `${visibleCount} crops found` : `${items.length} crops available`;
        }
    }

    bindNavigation() {
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.navigateBack());
        }

        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareContent());
        }

        // Replay the correct view when the browser back/forward button is used.
        window.addEventListener('popstate', (e) => {
            if (!e.state || e.state.screen === 'dashboard') {
                this.showScreen('dashboard');
            } else if (e.state.view) {
                this._replayState(e.state);
            }
        });

        if (!history.state) {
            history.replaceState({ screen: 'dashboard' }, '', location.pathname);
        }
    }

    navigateBack() {
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.style.transform = 'scale(0.9)';
            setTimeout(() => { backBtn.style.transform = ''; }, 150);
        }
        // Always use browser history — each view has its own state entry now.
        if (history.length > 1) {
            history.back();
        } else {
            this.showScreen('dashboard');
        }
    }

    // Record the current view in browser history so back/forward works between pages.
    pushNavState(view, params = {}) {
        if (this._historyReplaying) return; // skip while replaying to avoid double-push
        history.pushState({ view, ...params, screen: 'content' }, '', location.pathname);
    }

    // Replay a history state — called by the popstate listener.
    _replayState(state) {
        this._historyReplaying = true;
        this.showScreen('content');
        switch (state.view) {
            case 'crop_prices': this.loadCropPrices(state.specificCrop || null); break;
            case 'weather': this.loadWeather(state.districtId); break;
            case 'market_insights': this.loadMarketInsights(state.districtId); break;
            case 'sellers': this.loadSellers(state.districtId, state.specificCrop || null); break;
            case 'buyers': this.loadBuyers(state.districtId); break;
            case 'pest_control':
                { const _t = document.getElementById('content-title'); if (_t) _t.textContent = this.texts[this.currentLang].pest_control; }
                this.showLoading(); this.loadPestControl(state.cropId, state.districtId); break;
            case 'farming_tips':
                { const _t = document.getElementById('content-title'); if (_t) _t.textContent = this.texts[this.currentLang].farming_tips; }
                this.showLoading(); this.loadFarmingTips(state.cropId); break;
            case 'basic_info':
                { const _t = document.getElementById('content-title'); if (_t) _t.textContent = this.texts[this.currentLang].basic_info; }
                this.showLoading(); this.loadBasicInfo(); break;
            case 'farming_guide':
                { const _t = document.getElementById('content-title'); if (_t) _t.textContent = this.texts[this.currentLang].farming_guide; }
                this.showLoading(); this.loadFarmingGuide(); break;
            case 'district_actions': this.showDistrictActions(state.districtId); break;
            case 'crop_actions': this.showCropActions(state.cropId); break;
            default: this.showScreen('dashboard'); break;
        }
        this._historyReplaying = false;
    }

    async shareContent() {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'AgroBusiness Malawi',
                    text: 'Check out this amazing agricultural platform!',
                    url: window.location.href
                });
            } catch (error) {
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href)
                .then(() => this.showNotification('Link copied to clipboard!'))
                .catch(() => this.showNotification('Could not copy link. Please copy the URL manually.', 'error'));
        }
    }

    bindQuickAccess() {
        const quickAccessBtn = document.getElementById('quick-access-btn');
        const fabMenu = document.getElementById('fab-menu');
        const quickAccessFab = document.querySelector('.quick-access-fab');

        if (quickAccessBtn) {
            quickAccessBtn.addEventListener('click', () => {
                quickAccessFab.classList.toggle('active');
            });
        }

        // Quick access items
        document.querySelectorAll('.fab-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const quickAction = item.dataset.quick;
                this.executeQuickAction(quickAction);
                quickAccessFab.classList.remove('active');
            });
        });
    }

    executeQuickAction(action) {
        switch (action) {
            case 'weather':
                this.quickWeatherAccess();
                break;
            case 'prices':
                this.openService('crop-prices');
                break;
            case 'districts':
                this.showDistrictsOverview();
                break;
        }
    }

    quickWeatherAccess() {
        // Show weather for Lilongwe (capital) by default
        this.selectedDistrict = 1;
        this.openService('weather');
    }

    bindStatisticsCards() {
        document.querySelectorAll('.stat-card-modern').forEach(card => {
            card.addEventListener('click', (e) => {
                const action = card.dataset.action;
                if (action) {
                    this.executeStatAction(card, action);
                }
            });
        });
    }

    executeStatAction(card, action) {
        // Visual feedback
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Execute action
        switch (action) {
            case 'view-districts':
                this.showDistrictsOverview();
                break;
            case 'view-crops':
                this.showCropsOverview();
                break;
            case 'weather-overview':
                this.quickWeatherAccess();
                break;
            case 'market-overview':
                this.openService('crop-prices');
                break;
        }
    }

    bindHeroInteractions() {
        const exploreBtn = document.getElementById('explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                this.scrollToServices();
            });
        }
    }

    scrollToServices() {
        const servicesSection = document.querySelector('.services-revolution');
        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    hideLoadingScreen() {
        const loading = document.getElementById('loading-screen');
        if (loading) {
            loading.style.opacity = '0';
            loading.style.transform = 'scale(1.1)';
            loading.style.filter = 'blur(10px)';
            setTimeout(() => loading.style.display = 'none', 800);
        }
    }

    showScreen(screenId) {
        // Reset history to dashboard when going home; each content view pushes its own state via pushNavState().
        if (screenId === 'dashboard') {
            history.replaceState({ screen: 'dashboard' }, '', location.pathname);
        }

        // Cancel any pending transition so a quick second call never wins over the latest one
        if (this._screenTimer) {
            clearTimeout(this._screenTimer);
            this._screenTimer = null;
            // Reset any partially-animated screens
            document.querySelectorAll('.screen').forEach(s => {
                s.style.transition = '';
                s.style.transform = '';
                s.style.opacity = '';
                s.style.filter = '';
            });
        }

        const currentActive = document.querySelector('.screen.active');
        const targetScreen = document.getElementById(screenId);
        if (!targetScreen) return;

        if (currentActive && currentActive !== targetScreen) {
            currentActive.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            currentActive.style.transform = 'translateX(-60px)';
            currentActive.style.opacity = '0';

            this._screenTimer = setTimeout(() => {
                this._screenTimer = null;
                document.querySelectorAll('.screen').forEach(s => {
                    s.classList.remove('active');
                    s.style.transition = '';
                    s.style.transform = '';
                    s.style.opacity = '';
                    s.style.filter = '';
                });
                targetScreen.classList.add('active');
                targetScreen.style.opacity = '0';
                targetScreen.style.transform = 'translateX(30px)';
                requestAnimationFrame(() => {
                    targetScreen.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    targetScreen.style.transform = '';
                    targetScreen.style.opacity = '';
                });
                this.currentScreen = screenId;
            }, 300);
        } else {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }
    }

    openService(service) {
        // Register never leaves the dashboard — just open the modal
        if (service === 'register') {
            this.openRegistrationModal();
            return;
        }

        this.showScreen('content');

        const title = document.getElementById('content-title');
        if (title) {
            title.textContent = this.texts[this.currentLang][service.replace('-', '_')] || service;
        }

        this.showLoading();

        switch (service) {
            case 'crop-prices':
                this.loadCropPrices();
                break;
            case 'weather':
                if (this.selectedDistrict) {
                    this.loadWeather(this.selectedDistrict);
                } else {
                    this.showDistrictSelection(() => this.loadWeather(this.selectedDistrict));
                }
                break;
            case 'market-insights':
                this.showDistrictSelection(() => this.loadMarketInsights(this.selectedDistrict));
                break;
            case 'sellers':
                this.showDistrictSelection(() => this.loadSellers(this.selectedDistrict));
                break;
            case 'buyers':
                this.showDistrictSelection(() => this.loadBuyers(this.selectedDistrict));
                break;
            case 'pest-control':
                this.showCropSelection(() => {
                    this.showDistrictSelection(() => {
                        this.loadPestControl(this.selectedCrop, this.selectedDistrict);
                    });
                });
                break;
            case 'farming-tips':
                this.showCropSelection(() => this.loadFarmingTips(this.selectedCrop));
                break;
            case 'farming-guide':
                this.loadFarmingGuide();
                break;
            case 'basic-info':
                this.loadBasicInfo();
                break;
            default:
                this.showError('Service not available');
        }
    }

    showLoading() {
        const area = document.getElementById('content-area');
        if (area) {
            area.innerHTML = `
                <div class="loading" style="text-align: center; padding: 4rem 2rem;">
                    <div class="logo-revolution" style="margin-bottom: 2rem;">
                        <div class="logo-icon" style="font-size: 3rem;">🌾</div>
                        <div class="logo-glow"></div>
                    </div>
                    <p style="font-size: 1.2rem; color: var(--text-secondary);">${this.texts[this.currentLang].loading}</p>
                </div>
            `;
        }
    }

    showError(message) {
        const area = document.getElementById('content-area');
        if (area) {
            area.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 4rem 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
                    <p style="font-size: 1.3rem; margin-bottom: 2rem; color: var(--text-secondary);">${message || this.texts[this.currentLang].error}</p>
                    <button class="btn-primary" onclick="app.showScreen('dashboard')" style="margin: 0 auto;">
                        <span class="cta-text">Back to Home</span>
                        <span class="cta-icon">🏠</span>
                    </button>
                </div>
            `;
        }
    }

    loadFarmingGuide() {
        this.pushNavState('farming_guide');
        const area = document.getElementById('content-area');
        if (!area) return;

        const isCi = this.currentLang === 'ci';
        const guide = this._farmingGuideData(isCi);
        const ic = this._guideIcons();

        area.dataset.view = 'farming_guide';
        area.innerHTML = `
            <section class="guide-hero">
                <div>
                    <p class="eyebrow">${guide.label}</p>
                    <h2>${this.texts[this.currentLang].farming_guide}</h2>
                    <p class="guide-intro-text">${guide.intro}</p>
                    <p class="guide-subtitle">${guide.story}</p>
                    <p class="guide-source-pill">${guide.sourcePill}</p>
                </div>
                <div class="guide-hero-illustration" aria-hidden="true">
                    <svg width="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0" y="84" width="360" height="136" fill="#f5f2eb"/>
                        <path d="M0 140h360" stroke="#8B7355" stroke-width="4"/>
                        <path d="M20 140c0-10 6-18 14-18s14 8 14 18M52 140c0-14 8-24 18-24s18 10 18 24" stroke="#6f9d54" stroke-width="3" fill="none"/>
                        <path d="M48 140c16-22 42-26 72-24 28 2 46 14 68 24 18 8 40 10 58 2 14-6 28-18 42-20 16-2 34 6 50 16" stroke="#C8A45A" stroke-width="5" fill="none"/>
                        <path d="M180 64c-14 0-26 8-32 18-4 8-4 18 2 24 6 8 18 10 30 8 10-2 18-8 22-16 4-8 4-18-2-24-6-8-16-10-20-10Z" fill="#3e3930" opacity=".15"/>
                        <circle cx="40" cy="40" r="20" fill="#C8A45A" opacity=".35"/>
                        <circle cx="320" cy="30" r="16" fill="#8B7355" opacity=".4"/>
                    </svg>
                </div>
            </section>

            <section class="guide-block">
                <h3 class="guide-section-title">${ic.calendar}${guide.calendarTitle}</h3>
                <p class="guide-section-sub">${guide.calendarSub}</p>
                <div class="guide-calendar">
                    ${guide.calendar.map(c => `
                        <div class="guide-cal-item">
                            <span class="guide-cal-months">${c.months}</span>
                            <span class="guide-cal-phase">${c.phase}</span>
                            <span class="guide-cal-detail">${c.detail}</span>
                        </div>
                    `).join('<div class="guide-cal-arrow" aria-hidden="true">→</div>')}
                </div>
            </section>

            <section class="guide-block">
                <h3 class="guide-section-title">${ic.steps}${guide.stepsTitle}</h3>
                <p class="guide-section-sub">${guide.stepsSub}</p>
                <div class="guide-steps">
                    ${guide.steps.map((step, index) => `
                        <article class="guide-step-card">
                            <div class="guide-step-icon" aria-hidden="true">${ic[step.icon] || ''}</div>
                            <div>
                                <h3>${index + 1}. ${step.title}</h3>
                                <p>${step.text}</p>
                                <div class="guide-step-note"><span class="guide-note-tag">${guide.bestPracticeLabel}</span> ${step.note}</div>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </section>

            <section class="guide-block">
                <h3 class="guide-section-title">${ic.crop}${guide.cropsTitle}</h3>
                <p class="guide-section-sub">${guide.cropsSub}</p>
                <div class="guide-crop-grid">
                    ${guide.crops.map(c => `
                        <article class="guide-crop-card">
                            <div class="guide-crop-head"><span class="guide-crop-emoji" aria-hidden="true">${c.emoji}</span><h4>${c.name}</h4></div>
                            <dl>
                                <div><dt>${guide.rowSpacing}</dt><dd>${c.spacing}</dd></div>
                                <div><dt>${guide.rowFertilizer}</dt><dd>${c.fertilizer}</dd></div>
                                <div><dt>${guide.rowTip}</dt><dd>${c.tip}</dd></div>
                            </dl>
                        </article>
                    `).join('')}
                </div>
            </section>

            <section class="guide-block">
                <h3 class="guide-section-title">${ic.science}${guide.scienceTitle}</h3>
                <p class="guide-section-sub">${guide.scienceSub}</p>
                <div class="guide-science-grid">
                    ${guide.science.map(s => `
                        <article class="guide-science-card">
                            <h4>${s.title}</h4>
                            <p>${s.text}</p>
                        </article>
                    `).join('')}
                </div>
            </section>

            <p class="guide-sources">${guide.sources}</p>
        `;
    }

    // Reusable inline SVG icons for the farming guide (stroke = currentColor).
    _guideIcons() {
        return {
            calendar: '<svg class="gs-ic" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
            steps: '<svg class="gs-ic" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20h4v-4H4v4ZM10 20h4V10h-4v10ZM16 20h4V4h-4v16Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
            crop: '<svg class="gs-ic" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21V9M12 9c0-3 2-5 5-5 0 3-2 5-5 5Zm0 3c0-3-2-5-5-5 0 3 2 5 5 5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            science: '<svg class="gs-ic" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            seed: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 34c-8 0-14-6-14-14 8 0 14 6 14 14Z" fill="currentColor" opacity=".2"/><path d="M24 34c-8 0-14-6-14-14 8 0 14 6 14 14Zm0 0c0-8 6-14 14-14 0 8-6 14-14 14Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M24 40v-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
            soil: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 32h32M8 32l6-8h6l4-6h4l6 14" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M8 32v6h32v-6Z" fill="currentColor" opacity=".18"/><path d="M14 38v2M22 38v2M30 38v2M38 38v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
            plant: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 36h20" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M24 36V22" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M24 24c-5 0-9-4-9-9 5 0 9 4 9 9Zm0-2c0-5 4-9 9-9 0 5-4 9-9 9Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M18 36l-4 4M30 36l4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".5"/></svg>',
            fertilizer: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="14" width="16" height="24" rx="3" fill="currentColor" opacity=".15"/><rect x="16" y="14" width="16" height="24" rx="3" stroke="currentColor" stroke-width="2.4"/><path d="M20 20h8M20 26h8M20 32h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M24 14v-4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
            water: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 12c-5 6-8 9-8 13a8 8 0 0 0 16 0c0-4-3-7-8-13Z" fill="currentColor" opacity=".2"/><path d="M24 12c-5 6-8 9-8 13a8 8 0 0 0 16 0c0-4-3-7-8-13Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/></svg>',
            pest: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="26" rx="8" ry="10" fill="currentColor" opacity=".15"/><ellipse cx="24" cy="26" rx="8" ry="10" stroke="currentColor" stroke-width="2.4"/><path d="M24 16v-4M16 22l-5-3M32 22l5-3M16 30l-5 3M32 30l5 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
            store: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 20l10-6 10 6v16H14V20Z" fill="currentColor" opacity=".15"/><path d="M12 20l12-7 12 7M14 20v16h20V20" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M20 36V26h8v10" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>'
        };
    }

    // Malawi-specific, research-based farming guide content (bilingual).
    // Sources: Malawi Ministry of Agriculture Guide to Agricultural Production (GAP);
    // CIMMYT & DARS Chitedze conservation-agriculture trials; Africa RISING doubled-up
    // legumes; ICRISAT groundnut/aflatoxin guidance.
    _farmingGuideData(isCi) {
        if (isCi) {
            return {
                label: 'Malangizo a Ulimi',
                intro: 'Njira ya ulimi yotsatira sitepe ndi sitepe, yozikidwa pa kafukufuku wabwino wa ku Malawi — kuchokera ku Unduna wa Zaulimi (GAP), CIMMYT/DARS Chitedze, ndi Africa RISING.',
                story: 'Kuyambira kusankha mbeu mpaka kukolola ndi kusunga — ndi manambala enieni a mtunda, feteleza ndi nthawi yoyenera m\'dziko la Malawi.',
                sourcePill: 'Zozikidwa pa kafukufuku · Yopangira Malawi',
                bestPracticeLabel: 'Njira Yabwino',
                calendarTitle: 'Nyengo ya Ulimi ku Malawi',
                calendarSub: 'Malawi ili ndi mvula imodzi pa chaka (Novembala–Epulo). Konzekerani molingana ndi kalendala iyi.',
                calendar: [
                    { months: 'Sep–Okt', phase: 'Konzani Munda', detail: 'Pangani mizere (ridges) ndi kuthira manyowa nyengo yowuma' },
                    { months: 'Nov–Dis', phase: 'Bzalani', detail: 'Bzalani ndi mvula yoyamba yabwino (25mm+); thirani basal feteleza' },
                    { months: 'Dis–Jan', phase: 'Palani & Urea', detail: 'Palani pa masabata 2–3; thirani Urea pa masabata 4–5' },
                    { months: 'Jan–Feb', phase: 'Onani Tizirombo', detail: 'Yang\'anani fall armyworm sabata iliyonse; palaninso' },
                    { months: 'Mar–Epu', phase: 'Kukhwima', detail: 'Onani chilala kapena kusefukira; tetezani mbewu' },
                    { months: 'Epu–Jun', phase: 'Kolola & Sunga', detail: 'Kolola pakukhwima, anitsani, sungani mu matumba a PICS' }
                ],
                stepsTitle: 'Sitepe ndi Sitepe',
                stepsSub: 'Njira zisanu ndi ziwiri zofunika, ndi malangizo enieni a ku Malawi pa iliyonse.',
                steps: [
                    { icon: 'seed', title: 'Sankhani Mbeu Yabwino', text: 'Sankhani mbeu yovomerezeka yoyenera dera lanu — mwachitsanzo chimanga hybrid (SC403, MH-40), nthola CG7/Chalimbana, soya Tikolore, kapena nyemba zovomerezeka.', note: 'Gulani mbeu yovomerezeka (certified) pa maseasoni 2–3 aliwonse kuti mbeu ikhale yamphamvu ndi yobala bwino.' },
                    { icon: 'soil', title: 'Konzani Munda Msanga & Tetezani Nthaka', text: 'Nyengo yowuma, konzani mizere pa mtunda wa 75–90cm. Zabwino: gwiritsani ntchito Conservation Agriculture — lima pang\'ono, siyani zotsalira za mbewu ngati mulch, ndi kusinthanitsa chimanga ndi nyemba.', note: 'Kusiya zotsalira za mbewu (mulch) ndi kusinthanitsa mbewu kumasunga madzi m\'nthaka ndi kuchulukitsa zokolola, malinga ndi mayeso a CIMMYT/DARS.' },
                    { icon: 'plant', title: 'Bzalani pa Nthawi & Mtunda Woyenera', text: 'Bzalani ndi mvula yoyamba yabwino. Chimanga: mizere 75cm, malo obzalira 25cm, mbeu IMODZI pa malo (Sasakawa) ≈ mbewu 53,000 pa hekitala.', note: 'Nthola: 10cm mumzere. Soya: 5cm mu mizere 45–75cm. Kubzala molunjika kumathandiza kupala, kuthira madzi ndi kukolola.' },
                    { icon: 'fertilizer', title: 'Dyetsani Mbewu Molondola', text: 'Chimanga: thirani basal NPK 23:21:0+4S pobzala, ndi Urea pa masabata 3–4 mbewu itamera (pafupifupi matumba 2 a iliyonse pa eka).', note: 'Nyemba (soya, nthola) zimapanga naitrogeni zokha — ikani inoculant ya rhizobium pa soya; musawononge feteleza wa naitrogeni pa iwo.' },
                    { icon: 'water', title: 'Thanani Udzu & Madzi', text: 'Palani mkati mwa masabata 2–3 ndiponso mbewu isanaphuke maluwa. Udzu umawononga chimanga kwambiri m\'masabata 6 oyamba.', note: 'Pangani mizere yotchinga (tied/box ridges) kuti musunge mvula ndi kupulumuka nthawi ya chilala — malangizo a DARS.' },
                    { icon: 'pest', title: 'Tetezani ku Tizirombo (IPM)', text: 'Yang\'anani munda sabata iliyonse. Pa fall armyworm: chotsani mazira ndi manja, thirani phulusa kapena dothi mu funnel, ndi push-pull (Desmodium + Brachiaria).', note: 'Gwiritsani mankhwala ovomerezeka pokhapokha tizirombo tikafika pa mlingo woopsa — mumasunga ndalama ndi chilengedwe.' },
                    { icon: 'store', title: 'Kolola & Sungani Bwino', text: 'Kolola pakukhwima, anitsani mbewu kufika 12.5% madzi, opoolani moyera, ndi kusunga mu matumba a PICS/hermetic kuti muletse kafadala ndi aflatoxin.', note: 'Kulamulira aflatoxin ndikofunika kwambiri pa nthola — kumateteza thanzi ndi mtengo wogulitsa.' }
                ],
                cropsTitle: 'Malangizo a Mbewu Zikuluzikulu',
                cropsSub: 'Mtunda, feteleza ndi malangizo ofunika pa mbewu iliyonse.',
                rowSpacing: 'Mtunda',
                rowFertilizer: 'Feteleza',
                rowTip: 'Malangizo',
                crops: [
                    { emoji: '🌽', name: 'Chimanga', spacing: 'Mizere 75cm × malo 25cm, mbeu 1', fertilizer: 'NPK 23:21:0+4S basal + Urea top-dress', tip: 'Bzalani ndi mvula yoyamba yabwino; palani msanga.' },
                    { emoji: '🥜', name: 'Nthola (Groundnuts)', spacing: 'Mizere 75–90cm × 10cm', fertilizer: 'Palibe naitrogeni; onjezani gypsum/SSP', tip: 'Sinthanitsani ndi chimanga; anitsani bwino kuti mupewe aflatoxin.' },
                    { emoji: '🫘', name: 'Soya', spacing: 'Mizere 45–75cm × 5cm', fertilizer: 'Rhizobium inoculant; naitrogeni pang\'ono', tip: 'Inoculant imachulukitsa zokolola mosachepera.' },
                    { emoji: '🌱', name: 'Nyemba (Beans)', spacing: 'Mizere 75cm × 10cm', fertilizer: 'NPK pang\'ono pobzala', tip: 'Sankhani mbewu zosaphwa msanga; kolola zitawuma.' },
                    { emoji: '🍂', name: 'Fodya (Tobacco)', spacing: 'Mizere 90–120cm × 60cm', fertilizer: 'Feteleza wa fodya malinga ndi malangizo', tip: 'Konzani nazale bwino; sinthani munda chaka ndi chaka.' }
                ],
                scienceTitle: 'Njira Zozikidwa pa Sayansi',
                scienceSub: 'Njira zoyesedwa ku Malawi zomwe zimachulukitsa zokolola ndi kuteteza nthaka.',
                science: [
                    { title: 'Conservation Agriculture', text: 'Kulima pang\'ono, kusunga zotsalira za mbewu ngati mulch, ndi kusinthanitsa mbewu — mayeso a CIMMYT/Total LandCare akuonetsa kusunga madzi ndi zokolola zambiri.' },
                    { title: 'Doubled-up Legumes', text: 'Bzalani nthola ndi nandolo (pigeonpea) limodzi — mumakolola kawiri ndi kuonjezera naitrogeni m\'nthaka (Africa RISING).' },
                    { title: 'Tied Ridges', text: 'Mizere yotchinga imasunga mvula m\'munda ndi kupulumutsa mbewu nthawi ya chilala chachifupi (DARS Chitedze).' },
                    { title: 'Kusamalira pambuyo pokolola', text: 'Anitsani kufika 12.5% madzi ndi kusunga mu matumba a PICS kuti muletse kafadala ndi aflatoxin popanda mankhwala.' }
                ],
                sources: 'Zochokera: Unduna wa Zaulimi wa ku Malawi — Guide to Agricultural Production (GAP); CIMMYT & DARS Chitedze; Africa RISING; ICRISAT.'
            };
        }
        return {
            label: 'Farming Guide',
            intro: 'A step-by-step field journey grounded in the best Malawi research — from the Ministry of Agriculture Guide to Agricultural Production (GAP), CIMMYT & DARS Chitedze trials, and Africa RISING.',
            story: 'From choosing seed to harvest and safe storage — with the real spacing, fertilizer and timing figures used in Malawi.',
            sourcePill: 'Research-based · Built for Malawi',
            bestPracticeLabel: 'Best practice',
            calendarTitle: 'Malawi Growing Calendar',
            calendarSub: 'Malawi has one rainy season a year (November–April). Plan your work around this calendar.',
            calendar: [
                { months: 'Sep–Oct', phase: 'Prepare land', detail: 'Make ridges and spread manure during the dry season' },
                { months: 'Nov–Dec', phase: 'Plant', detail: 'Plant with the first effective rains (25mm+); apply basal fertilizer' },
                { months: 'Dec–Jan', phase: 'Weed & Urea', detail: 'Weed at 2–3 weeks; top-dress Urea at 4–5 weeks' },
                { months: 'Jan–Feb', phase: 'Scout pests', detail: 'Check for fall armyworm weekly; weed again' },
                { months: 'Mar–Apr', phase: 'Grain fill', detail: 'Watch for dry spells or floods; protect the crop' },
                { months: 'Apr–Jun', phase: 'Harvest & store', detail: 'Harvest at maturity, dry, and store in PICS bags' }
            ],
            stepsTitle: 'Step-by-Step Walkthrough',
            stepsSub: 'Seven key stages, each with the specific Malawi recommendation.',
            steps: [
                { icon: 'seed', title: 'Choose Adapted, Certified Seed', text: 'Pick a released variety suited to your zone — e.g. maize hybrids (SC403, MH-40), groundnut CG7/Chalimbana, soya Tikolore, or a recommended bean variety.', note: 'Buy certified seed every 2–3 seasons so plants stay vigorous and high-yielding — recycled grain loses yield fast.' },
                { icon: 'soil', title: 'Prepare Land Early & Conserve Soil', text: 'In the dry season, clear and make ridges 75–90 cm apart. Better still, practise Conservation Agriculture — minimum tillage, keep crop residues as mulch, and rotate cereals with legumes.', note: 'CIMMYT/DARS trials in Malawi show mulch cover and rotation hold soil moisture and lift yields, especially in dry years.' },
                { icon: 'plant', title: 'Plant on Time at the Right Spacing', text: 'Plant with the first effective rains. Maize: ridges 75 cm apart, stations 25 cm, ONE seed per station (Sasakawa) ≈ 53,000 plants/ha.', note: 'Groundnuts: 10 cm within the row. Soya: 5 cm in 45–75 cm rows. Straight rows make weeding, watering and harvest easier.' },
                { icon: 'fertilizer', title: 'Feed the Crop Correctly', text: 'Maize: apply basal NPK 23:21:0+4S at planting and top-dress Urea 3–4 weeks after emergence (about 2 bags of each per acre).', note: 'Legumes (soya, groundnut) fix their own nitrogen — inoculate soya with rhizobium and don\'t waste nitrogen fertilizer on them.' },
                { icon: 'water', title: 'Manage Weeds & Water', text: 'Weed within 2–3 weeks and again before flowering. Weeds cut maize yield most in the first 6 weeks.', note: 'Make tied (box) ridges to trap rainfall and survive short dry spells — a DARS-recommended water-harvesting practice.' },
                { icon: 'pest', title: 'Protect with Integrated Pest Management', text: 'Scout the field weekly. For fall armyworm: handpick egg masses, put ash or soil in the funnels, and use push-pull (Desmodium + Brachiaria).', note: 'Spray only approved pesticides once pest thresholds are reached — this saves money and protects the environment.' },
                { icon: 'store', title: 'Harvest & Store to Protect Quality', text: 'Harvest at maturity, dry grain to 12.5% moisture, shell it clean, and store in PICS/hermetic bags to stop weevils and aflatoxin.', note: 'Aflatoxin control is vital for groundnuts — it protects both family health and market value.' }
            ],
            cropsTitle: 'Key Crop Snapshots',
            cropsSub: 'Spacing, fertilizer and the one tip that matters most for each crop.',
            rowSpacing: 'Spacing',
            rowFertilizer: 'Fertilizer',
            rowTip: 'Key tip',
            crops: [
                { emoji: '🌽', name: 'Maize', spacing: '75 cm rows × 25 cm stations, 1 seed', fertilizer: 'NPK 23:21:0+4S basal + Urea top-dress', tip: 'Plant with the first good rains; weed early.' },
                { emoji: '🥜', name: 'Groundnuts', spacing: '75–90 cm rows × 10 cm', fertilizer: 'No nitrogen; add gypsum/SSP', tip: 'Rotate with maize; dry well to avoid aflatoxin.' },
                { emoji: '🫘', name: 'Soybeans', spacing: '45–75 cm rows × 5 cm', fertilizer: 'Rhizobium inoculant; little/no N', tip: 'Inoculant reliably raises yield at low cost.' },
                { emoji: '🌱', name: 'Beans', spacing: '75 cm rows × 10 cm', fertilizer: 'A little NPK at planting', tip: 'Pick early-maturing types; harvest when dry.' },
                { emoji: '🍂', name: 'Tobacco', spacing: '90–120 cm rows × 60 cm', fertilizer: 'Tobacco-specific fertilizer per guidance', tip: 'Raise strong seedlings; rotate fields yearly.' }
            ],
            scienceTitle: 'Science-Backed Practices',
            scienceSub: 'Approaches tested in Malawi that raise yields and protect the soil.',
            science: [
                { title: 'Conservation Agriculture', text: 'Minimum tillage, crop residues left as mulch, and rotation. CIMMYT/Total LandCare trials in Malawi show better moisture retention and higher yields.' },
                { title: 'Doubled-up Legumes', text: 'Intercrop groundnut with pigeonpea in the same season — two harvests plus added soil nitrogen (Africa RISING).' },
                { title: 'Tied Ridges', text: 'Box ridges hold rainwater in the field and carry the crop through short dry spells (DARS Chitedze).' },
                { title: 'Post-Harvest & Aflatoxin', text: 'Dry to 12.5% moisture and store in PICS bags to stop weevils and aflatoxin without chemicals.' }
            ],
            sources: 'Sources: Malawi Ministry of Agriculture — Guide to Agricultural Production (GAP); CIMMYT & DARS Chitedze; Africa RISING; ICRISAT.'
        };
    }

    showNoData() {
        const area = document.getElementById('content-area');
        if (area) {
            area.innerHTML = `
                <div class="no-data" style="text-align: center; padding: 4rem 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📭</div>
                    <p style="font-size: 1.3rem; margin-bottom: 2rem; color: var(--text-secondary);">${this.texts[this.currentLang].no_data}</p>
                    <button class="btn-primary" onclick="app.showScreen('dashboard')" style="margin: 0 auto;">
                        <span class="cta-text">Back to Home</span>
                        <span class="cta-icon">🏠</span>
                    </button>
                </div>
            `;
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--white);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            border: 1px solid var(--gray-200);
            z-index: 9999;
            transform: translateX(100%);
            transition: var(--transition-normal);
            max-width: 300px;
            font-weight: 500;
        `;

        // Set type-specific styles
        if (type === 'success') {
            notification.style.borderLeftColor = 'var(--success)';
            notification.style.borderLeftWidth = '4px';
        } else if (type === 'error') {
            notification.style.borderLeftColor = 'var(--error)';
            notification.style.borderLeftWidth = '4px';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto hide after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    showDistrictsOverview() {
        this.loadDistricts().then(districts => {
            const modal = document.getElementById('districts-overview-modal');
            const content = document.getElementById('districts-overview-content');

            if (!modal || !content) return;

            content.innerHTML = districts.map((district, index) => {
                const coords = this.districtCoords[district.id];
                return `
                    <div class="overview-item" style="animation-delay: ${index * 0.05}s" onclick="app.selectDistrictFromOverview(${district.id})">
                        <span class="overview-icon">📍</span>
                        <h3 class="overview-title">${district.name}</h3>
                        <p class="overview-desc">${coords ? coords.region + ' Region' : 'Malawi'}</p>
                    </div>
                `;
            }).join('');

            this.openModal(modal);
        });
    }

    showCropsOverview() {
        this.loadCrops().then(crops => {
            const modal = document.getElementById('crops-overview-modal');
            const content = document.getElementById('crops-overview-content');

            if (!modal || !content) return;

            content.innerHTML = crops.map((crop, index) => {
                const category = this.getCropCategory(crop.name);
                return `
                    <div class="overview-item" style="animation-delay: ${index * 0.05}s" onclick="app.selectCropFromOverview(${crop.id})">
                        <span class="overview-icon">${this.getCropIcon(crop.name)}</span>
                        <h3 class="overview-title">${crop.name}</h3>
                        <p class="overview-desc">${category} crop</p>
                    </div>
                `;
            }).join('');

            this.openModal(modal);
        });
    }

    selectDistrictFromOverview(districtId) {
        this.selectedDistrict = districtId;
        const modal = document.getElementById('districts-overview-modal');
        this.closeModal(modal);

        // Show options for what to do with selected district
        this.showDistrictActions(districtId);
    }

    selectCropFromOverview(cropId) {
        this.selectedCrop = cropId;
        const modal = document.getElementById('crops-overview-modal');
        this.closeModal(modal);

        // Show options for what to do with selected crop
        this.showCropActions(cropId);
    }

    showDistrictActions(districtId) {
        const district = this.districtCoords[districtId];
        if (!district) return;

        this.pushNavState('district_actions', { districtId });
        this.showScreen('content');
        const title = document.getElementById('content-title');
        if (title) title.textContent = `${district.name} Services`;

        const area = document.getElementById('content-area');
        if (area) {
            area.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h2 style="margin-bottom: 2rem; color: var(--primary);">📍 ${district.name}</h2>
                    <p style="margin-bottom: 3rem; color: var(--text-secondary);">What would you like to know about ${district.name}?</p>

                    <div class="services-grid" style="max-width: 800px; margin: 0 auto;">
                        <div class="service-card" onclick="app.showLoading();app.loadWeather(${districtId})" style="cursor: pointer;">
                            <div class="service-icon-3d">🌤️</div>
                            <div class="service-content-modern">
                                <h3>Weather Forecast</h3>
                                <p>7-day weather predictions for ${district.name}</p>
                            </div>
                        </div>

                        <div class="service-card" onclick="app.showLoading();app.loadMarketInsights(${districtId})" style="cursor: pointer;">
                            <div class="service-icon-3d">📊</div>
                            <div class="service-content-modern">
                                <h3>Market Insights</h3>
                                <p>Local market information and trends</p>
                            </div>
                        </div>

                        <div class="service-card" onclick="app.showLoading();app.loadSellers(${districtId})" style="cursor: pointer;">
                            <div class="service-icon-3d">👨‍🌾</div>
                            <div class="service-content-modern">
                                <h3>Find Sellers</h3>
                                <p>Connect with suppliers in ${district.name}</p>
                            </div>
                        </div>

                        <div class="service-card" onclick="app.showLoading();app.loadBuyers(${districtId})" style="cursor: pointer;">
                            <div class="service-icon-3d">🏢</div>
                            <div class="service-content-modern">
                                <h3>Find Buyers</h3>
                                <p>Markets and buyers in ${district.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    showCropActions(cropId) {
        this.loadCrops().then(crops => {
            const crop = crops.find(c => c.id == cropId);
            if (!crop) return;

            this.pushNavState('crop_actions', { cropId });
            this.showScreen('content');
            const title = document.getElementById('content-title');
            if (title) title.textContent = crop.name;

            const t = this.texts[this.currentLang];
            const area = document.getElementById('content-area');
            if (area) {
                area.innerHTML = `
                    <div style="text-align: center; padding: 3rem;">
                        <h2 style="margin-bottom: 2rem; color: var(--primary);">${this.getCropIcon(crop.name)} ${crop.name}</h2>
                        <p style="margin-bottom: 3rem; color: var(--text-secondary);">${t.crop_actions_heading} ${crop.name}?</p>

                        <div class="services-grid" style="max-width: 800px; margin: 0 auto;">
                            <button class="service-card crop-action-btn" data-action="prices"
                                data-crop-id="${cropId}" data-crop-name="${crop.name.replace(/"/g, '&quot;')}" type="button">
                                <div class="service-icon-3d">💰</div>
                                <div class="service-content-modern">
                                    <h3>${t.current_prices}</h3>
                                    <p>${t.market_prices_for} ${crop.name}</p>
                                </div>
                            </button>

                            <button class="service-card crop-action-btn" data-action="tips"
                                data-crop-id="${cropId}" data-crop-name="${crop.name.replace(/"/g, '&quot;')}" type="button">
                                <div class="service-icon-3d">🌾</div>
                                <div class="service-content-modern">
                                    <h3>${t.farming_tips}</h3>
                                    <p>${t.best_practices_for} ${crop.name}</p>
                                </div>
                            </button>

                            <button class="service-card crop-action-btn" data-action="pest"
                                data-crop-id="${cropId}" data-crop-name="${crop.name.replace(/"/g, '&quot;')}" type="button">
                                <div class="service-icon-3d">🐛</div>
                                <div class="service-content-modern">
                                    <h3>${t.pest_control}</h3>
                                    <p>${t.protect_crops} ${crop.name}</p>
                                </div>
                            </button>
                        </div>
                    </div>
                `;

                // Delegated listeners — no interpolated crop data in onclick attributes
                area.querySelectorAll('.crop-action-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.dataset.cropId;
                        const name = btn.dataset.cropName;
                        switch (btn.dataset.action) {
                            case 'prices': this.showLoading(); this.showCropPrices(name); break;
                            case 'tips':   this.showLoading(); this.loadFarmingTips(id);  break;
                            case 'pest':   this.showLoading(); this.showCropPestControl(id); break;
                        }
                    });
                });
            }
        });
    }

    showCropPrices(cropName) {
        this.loadCropPrices(cropName);
    }

    showCropPestControl(cropId) {
        this.showDistrictSelection(() => this.loadPestControl(cropId, this.selectedDistrict));
    }

    showDistrictSelection(callback) {
        this.loadDistricts().then(districts => {

            if (districts.length === 0) {
                this.showError('No districts available');
                return;
            }

            const modal = document.getElementById('district-modal');
            const list = document.getElementById('district-list');
            const searchBox = document.getElementById('district-search');
            const searchStats = document.getElementById('search-stats');

            if (!modal || !list) {
                this.showError('District selection not available');
                return;
            }

            // Clear search
            if (searchBox) searchBox.value = '';

            // Group districts by region
            const regions = ['Northern', 'Central', 'Southern'];
            const districtsByRegion = {};
            regions.forEach(region => {
                districtsByRegion[region] = districts.filter(d => (this.districtCoords[d.id]?.region || 'Malawi') === region);
            });

            // Track whether user selected before closing
            let districtSelected = false;

            // On modal close without selection, return to dashboard
            const onDistrictModalClose = () => {
                modal.removeEventListener('modalclosed', onDistrictModalClose);
                if (!districtSelected && this.currentScreen === 'content') {
                    this.showScreen('dashboard');
                }
            };
            modal.addEventListener('modalclosed', onDistrictModalClose);

            // Render district picker with "All Districts" option in compact grid
            const renderPicker = () => {
                let html = `
                    <button type="button" class="district-all-card" data-id="all" aria-label="Select all districts">
                        All Districts
                    </button>
                `;

                regions.forEach(region => {
                    const regionDistricts = districtsByRegion[region];
                    if (regionDistricts.length > 0) {
                        html += `<div class="district-region-group">
                            <div class="district-region-header">${region} Region</div>
                            <div class="district-grid">
                                ${regionDistricts.map(district => `
                                    <button type="button" class="district-card" data-id="${district.id}" data-name="${district.name}" data-region="${region}" aria-label="Select ${district.name}">
                                        ${district.name}
                                    </button>
                                `).join('')}
                            </div>
                        </div>`;
                    }
                });

                list.innerHTML = html;
            };

            renderPicker();

            // Update search stats
            if (searchStats) searchStats.textContent = `${districts.length} districts available`;

            // Search/filter functionality with regional grouping preservation
            const updateSearch = () => {
                const term = searchBox.value.toLowerCase().trim();
                let visibleCount = 0;

                if (!term) {
                    renderPicker();
                    if (searchStats) searchStats.textContent = `${districts.length} districts available`;
                } else {
                    let html = '';
                    let hasResults = false;

                    regions.forEach(region => {
                        const filtered = districtsByRegion[region].filter(d =>
                            d.name.toLowerCase().includes(term) || region.toLowerCase().includes(term)
                        );
                        if (filtered.length > 0) {
                            hasResults = true;
                            html += `<div class="district-region-group">
                                <div class="district-region-header">${region} Region</div>
                                <div class="district-grid">
                                    ${filtered.map(district => `
                                        <button type="button" class="district-card" data-id="${district.id}" data-name="${district.name}" data-region="${region}" aria-label="Select ${district.name}">
                                            ${district.name}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>`;
                            visibleCount += filtered.length;
                        }
                    });

                    if (hasResults) {
                        list.innerHTML = html;
                        if (searchStats) searchStats.textContent = `${visibleCount} district${visibleCount !== 1 ? 's' : ''} found`;
                    } else {
                        list.innerHTML = `<div class="district-no-results"><p>No districts match "${term}"</p></div>`;
                        if (searchStats) searchStats.textContent = 'No results';
                    }
                }

                // Re-attach click handlers
                attachClickHandlers();
            };

            const selectDistrict = (districtId) => {
                if (districtId === 'all') {
                    this.selectedDistrict = null; // Clear to indicate all districts
                } else {
                    this.selectedDistrict = districtId;
                }
                districtSelected = true;
                this.closeModal(modal);
                if (callback) callback();
            };

            const attachClickHandlers = () => {
                list.querySelectorAll('.district-card, .district-all-card').forEach(card => {
                    card.addEventListener('click', () => {
                        const id = card.dataset.id;
                        selectDistrict(id);
                    });
                    card.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            const id = card.dataset.id;
                            selectDistrict(id);
                        }
                    });
                });
            };

            attachClickHandlers();

            // Search input listener
            if (searchBox) {
                searchBox.addEventListener('input', updateSearch);
            }

            this.openModal(modal);
        }).catch(error => {
            console.error('❌ District selection error:', error);
            this.showError('Failed to load districts');
        });
    }

    showCropSelection(callback) {
        this.loadCrops().then(crops => {

            if (crops.length === 0) {
                this.showError('No crops available');
                return;
            }

            const modal = document.getElementById('crop-modal');
            const list = document.getElementById('crop-list');
            const searchBox = document.getElementById('crop-search');
            const searchStats = document.getElementById('crop-search-stats');

            if (!modal || !list) {
                this.showError('Crop selection not available');
                return;
            }

            // Clear search
            if (searchBox) searchBox.value = '';
            if (searchStats) searchStats.textContent = `${crops.length} crops available`;

            // Create crop list
            list.innerHTML = crops.map((crop, index) => {
                const category = this.getCropCategory(crop.name);
                return `
                    <button class="crop-item" data-id="${crop.id}" data-name="${crop.name}" data-category="${category}" type="button">
                        ${this.getCropIcon(crop.name)} <strong>${crop.name}</strong> — ${this.texts[this.currentLang][category] ?? category}
                    </button>
                `;
            }).join('');

            // Track whether user selected before closing
            let cropSelected = false;

            // On modal close without selection, return to dashboard
            const onCropModalClose = () => {
                modal.removeEventListener('modalclosed', onCropModalClose);
                if (!cropSelected && this.currentScreen === 'content') {
                    this.showScreen('dashboard');
                }
            };
            modal.addEventListener('modalclosed', onCropModalClose);

            // Add click handlers
            list.querySelectorAll('.crop-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.selectedCrop = item.dataset.id;
                    cropSelected = true;

                    item.style.background = 'var(--accent)';
                    item.style.color = 'var(--surface)';

                    setTimeout(() => {
                        this.closeModal(modal);
                        if (callback) callback();
                    }, 300);
                });
            });

            this.openModal(modal);
        }).catch(error => {
            console.error('❌ Crop selection error:', error);
            this.showError('Failed to load crops');
        });
    }

    // Update openModal method
    openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.transform = 'translateY(40px)';
            content.style.opacity = '0';
            requestAnimationFrame(() => {
                content.style.transition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease';
                content.style.transform = 'translateY(0)';
                content.style.opacity = '1';
            });
        }

        // Focus the search input first, otherwise the first interactive element
        const searchInput = modal.querySelector('input[type="text"], input[type="search"]');
        const firstFocusable = searchInput || modal.querySelector('button:not(.modal-close), [href], select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) setTimeout(() => firstFocusable.focus(), 50);

        const modalTitle = modal.querySelector('h2')?.textContent || 'Modal';
        this.announceToScreenReader(`${modalTitle} opened`);
    }

    // Update closeModal method
    closeModal(modal) {
        if (!modal) return;
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.transition = 'transform 0.22s ease-in, opacity 0.18s ease';
            content.style.transform = 'translateY(30px)';
            content.style.opacity = '0';
        }

        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            if (content) {
                content.style.transform = '';
                content.style.opacity = '';
                content.style.transition = '';
            }
            modal.dispatchEvent(new Event('modalclosed'));

            const lastFocused = document.querySelector('[data-last-focused]');
            if (lastFocused) {
                lastFocused.focus();
                lastFocused.removeAttribute('data-last-focused');
            }
        }, 240);
    }

    async testConnection() {
        try {
            const response = await this.apiCall('api.php?action=test');
            if (response.success) {
                this.showNotification('Database connected', 'success');
            } else {
                this.showNotification('Database connection failed', 'error');
            }
        } catch (error) {
            console.error('Connection test error:', error);
        }
    }


    async apiCall(endpoint, options = {}) {
        try {
            let url;
            if (endpoint.startsWith('http')) {
                // External API (Open-Meteo, etc.)
                url = endpoint;
            } else {
                // Always relative — works on any domain
                url = new URL(endpoint, window.location.href).toString();
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API error:', endpoint, error.message);
            throw error;
        }
    }

    // Open-Meteo Weather API (FREE - Same as USSD)
    async getWeatherData(districtId) {
        try {
            const coords = this.districtCoords[districtId];
            if (!coords) {
                throw new Error('District coordinates not found');
            }

            // Open-Meteo API call (same as USSD)
            const apiUrl = 'https://api.open-meteo.com/v1/forecast?' + new URLSearchParams({
                latitude: coords.lat,
                longitude: coords.lon,
                daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max',
                hourly: 'precipitation,precipitation_probability,temperature_2m,relative_humidity_2m',
                timezone: 'Africa/Blantyre',
                forecast_days: 7
            });


            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Open-Meteo API error: ${response.status}`);
            }

            const data = await response.json();

            return this.processOpenMeteoData(data, coords.name);
        } catch (error) {
            console.error('❌ Open-Meteo API error:', error);
            return null;
        }
    }

    // Process Open-Meteo data (same format as USSD)
    processOpenMeteoData(data, districtName) {
        if (!data.daily || !data.daily.time) {
            return null;
        }

        const forecasts = [];
        const maxDays = Math.min(7, data.daily.time.length);
        const currentHour = new Date().getHours();

        for (let i = 0; i < maxDays; i++) {
            const date = new Date(data.daily.time[i]);
            const weatherCode = data.daily.weather_code[i];
            const precipitation = data.daily.precipitation_sum[i] || 0;
            const willRain = precipitation > 0.1;

            forecasts.push({
                day_name: i === 0 ? 'Today' : date.toLocaleDateString('en', { weekday: 'short' }),
                date: date.toLocaleDateString(),
                temp_max: Math.round(data.daily.temperature_2m_max[i]),
                temp_min: Math.round(data.daily.temperature_2m_min[i]),
                weather_icon: this.getOpenMeteoIcon(weatherCode, willRain),
                description: this.getOpenMeteoDescription(weatherCode),
                precipitation: Math.round(precipitation * 10) / 10,
                will_rain: willRain,
                weather_code: weatherCode,
                wind_speed: Math.round(data.daily.windspeed_10m_max[i]),
                humidity: data.hourly ? Math.round(data.hourly.relative_humidity_2m[i * 24] || 70) : 70
            });
        }

        return {
            district_name: districtName,
            current: {
                temp: Math.round(data.daily.temperature_2m_max[0]),
                description: this.getOpenMeteoDescription(data.daily.weather_code[0]),
                humidity: data.hourly ? Math.round(data.hourly.relative_humidity_2m[currentHour] || 70) : 70,
                wind_speed: Math.round(data.daily.windspeed_10m_max[0])
            },
            forecast: forecasts
        };
    }

    // Weather icons based on Open-Meteo codes (same as USSD)
    getOpenMeteoIcon(code, willRain) {
        if (willRain) {
            if (code >= 95) return '⛈️'; // Thunderstorm
            if (code >= 80) return '🌦️'; // Showers
            if (code >= 61) return '🌧️'; // Rain
            return '🌦️'; // Light rain/drizzle
        }

        if (code === 0) return '☀️'; // Clear
        if (code <= 2) return '⛅'; // Partly cloudy
        if (code === 3) return '☁️'; // Cloudy
        if (code >= 45) return '🌫️'; // Fog

        return '🌤️'; // Default
    }

    // Weather descriptions based on Open-Meteo codes (same as USSD)
    getOpenMeteoDescription(code) {
        const descriptions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            56: 'Light freezing drizzle',
            57: 'Dense freezing drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            66: 'Light freezing rain',
            67: 'Heavy freezing rain',
            71: 'Slight snow fall',
            73: 'Moderate snow fall',
            75: 'Heavy snow fall',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        };

        return descriptions[code] || 'Unknown conditions';
    }

    // Generate farming advisory based on weather conditions
    getWeatherAdvisory(forecast) {
        if (!forecast || forecast.length === 0) {
            return "Weather data unavailable. Please check local conditions before farming activities.";
        }

        const rainDays = forecast.filter(day => day.will_rain).length;
        const avgTemp = forecast.reduce((sum, day) => sum + day.temp_max, 0) / forecast.length;
        const totalRain = forecast.reduce((sum, day) => sum + day.precipitation, 0);
        const hasThunderstorm = forecast.some(day => day.weather_code >= 95);
        const hasHeavyRain = forecast.some(day => day.precipitation > 10);

        let advisory = "";

        // Temperature-based advice
        if (avgTemp > 32) {
            advisory += "🌡️ **Hot conditions** (avg " + Math.round(avgTemp) + "°C): ";
            advisory += "Plan farming activities for early morning or late evening. Ensure adequate irrigation. ";
            advisory += "Livestock need extra shade and water. Consider heat-resistant crop varieties. ";
        } else if (avgTemp < 18) {
            advisory += "🌡️ **Cool conditions** (avg " + Math.round(avgTemp) + "°C): ";
            advisory += "Good for cool-season crops. Protect sensitive plants from cold. ";
            advisory += "Reduced evaporation means less frequent watering needed. ";
        } else {
            advisory += "🌡️ **Ideal temperatures** (avg " + Math.round(avgTemp) + "°C): ";
            advisory += "Excellent conditions for most farming activities. ";
        }

        // Rainfall-based advice
        if (totalRain > 50) {
            advisory += "\n\n🌧️ **Heavy rainfall expected** (" + Math.round(totalRain) + "mm total): ";
            advisory += "Ensure proper drainage to prevent waterlogging. Delay planting in flood-prone areas. ";
            advisory += "Good for rain-fed crops but monitor for fungal diseases. ";
            if (hasHeavyRain) {
                advisory += "⚠️ Risk of soil erosion - consider cover crops or mulching. ";
            }
        } else if (totalRain > 10) {
            advisory += "\n\n🌦️ **Moderate rainfall** (" + Math.round(totalRain) + "mm total): ";
            advisory += "Favorable for crop germination and growth. Reduce irrigation accordingly. ";
            advisory += "Good time for transplanting seedlings. ";
        } else if (totalRain < 2) {
            advisory += "\n\n☀️ **Dry conditions** (only " + Math.round(totalRain) + "mm expected): ";
            advisory += "Increase irrigation frequency. Mulch around plants to retain moisture. ";
            advisory += "Monitor crops closely for water stress. Consider drought-resistant varieties. ";
        }

        // Storm warnings
        if (hasThunderstorm) {
            advisory += "\n\n⛈️ **Thunderstorm warning**: ";
            advisory += "Secure loose farm equipment. Avoid field work during storms. ";
            advisory += "Check for hail damage after storms pass. ";
        }

        // Specific crop advice
        advisory += "\n\n🌾 **Crop-specific recommendations**: ";
        if (rainDays >= 4) {
            advisory += "Good for rice and water-loving crops. ";
            advisory += "Watch maize and tobacco for fungal issues. ";
        } else if (rainDays <= 1) {
            advisory += "Prioritize irrigation for vegetables and young plants. ";
            advisory += "Mature grain crops may be ready for harvest. ";
        } else {
            advisory += "Balanced conditions suitable for most crop types. ";
        }

        // Disease prevention
        if (rainDays >= 3 && avgTemp > 25) {
            advisory += "\n\n🦠 **Disease prevention**: ";
            advisory += "High humidity + warm temperatures = increased disease risk. ";
            advisory += "Apply preventive fungicides. Ensure good air circulation around plants. ";
        }

        return advisory;
    }

    // Data loading methods
    async loadDistricts() {
        try {
            const response = await this.apiCall('api.php?action=districts');
            return response.success ? (response.data || []) : [];
        } catch (error) {
            console.error('❌ Error loading districts:', error);
            return [];
        }
    }

    async loadCrops() {
        try {
            const response = await this.apiCall('api.php?action=crops');
            return response.success ? (response.data || []) : [];
        } catch (error) {
            console.error('❌ Error loading crops:', error);
            return [];
        }
    }

    async loadCropPrices(specificCrop = null) {
        try {
            this.pushNavState('crop_prices', { specificCrop });
            const response = await this.apiCall('api.php?action=dual_crop_prices');

            if (!response.success) {
                this.showError(response.error || 'Failed to load crop prices');
                return;
            }

            let fews = response.fews || [];
            let community = response.community || [];

            if (specificCrop) {
                const lc = specificCrop.toLowerCase();
                fews = fews.filter(r => (r.crop_name || '').toLowerCase().includes(lc));
                community = community.filter(r => (r.crop_name || '').toLowerCase().includes(lc));
            }

            const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
            }[char]));
            const fmt = n => n ? 'MK ' + parseFloat(n).toLocaleString() : '—';
            const ago = dt => {
                if (!dt) return '—';
                const d = Math.floor((Date.now() - new Date(dt)) / 86400000);
                return d === 0 ? 'Today' : d === 1 ? 'Yesterday' : `${d}d ago`;
            };

            // Combine FEWS and community reports, dedupe by crop + district and keep the latest report only
            const combinedMap = Object.create(null);

            const normalizeKey = (cropName, districtName) => `${(cropName || '').toLowerCase()}::${(districtName || '').toLowerCase()}`;

            // Helper to add candidate record into map if it's newer
            const addCandidate = (rec) => {
                const key = normalizeKey(rec.crop_name, rec.district);
                const existing = combinedMap[key];
                const existingTs = existing && existing._ts ? existing._ts : 0;
                const candidateTs = rec._ts || 0;
                if (!existing || candidateTs >= existingTs) {
                    combinedMap[key] = rec;
                }
            };

            // FEWS entries
            fews.forEach(r => {
                const ts = r.price_date ? new Date(r.price_date).getTime() : 0;
                addCandidate({
                    _ts: ts,
                    source: 'fews',
                    sourceLabel: 'AgroBiz Rate',
                    crop_id: r.crop_id,
                    crop_name: r.crop_name,
                    district: r.district_name || r.region || '—',
                    market: r.market_name || r.market || '—',
                    fewsPrice: fmt(r.price ?? r.value),
                    fews_price_num: Number(r.price ?? r.value) || null,
                    communityPrice: '—',
                    reports: r.price_date ? new Date(r.price_date).toLocaleDateString() : '—',
                    unit: r.unit || 'kg',
                    type: r.price_type || 'Retail reference'
                });
            });

            // Community entries
            community.forEach(r => {
                const ts = r.last_reported ? new Date(r.last_reported).getTime() : 0;
                addCandidate({
                    _ts: ts,
                    source: 'community',
                    sourceLabel: 'Community',
                    crop_id: r.crop_id,
                    crop_name: r.crop_name,
                    district: r.district_name || '—',
                    market: r.market_name || '—',
                    fewsPrice: '—',
                    communityPrice: `${fmt(r.min_price)} / ${fmt(r.avg_price)} / ${fmt(r.max_price)}`,
                    community_min_num: Number(r.min_price) || null,
                    community_avg_num: Number(r.avg_price) || null,
                    community_max_num: Number(r.max_price) || null,
                    community_min_bag: Number(r.min_price_bag) || null,
                    community_avg_bag: Number(r.avg_price_bag) || null,
                    community_max_bag: Number(r.max_price_bag) || null,
                    community_confirmed: !!r.confirmed,
                    reports: `${r.report_count} report${Number(r.report_count) === 1 ? '' : 's'} · ${ago(r.last_reported)}`,
                    unit: r.unit || 'kg',
                    type: 'Farmer/trader report'
                });
            });

            const rows = Object.values(combinedMap).sort((a, b) => (a.crop_name || '').localeCompare(b.crop_name || '') || (b._ts || 0) - (a._ts || 0));

            const cropSeen = new Set();
            const allCrops = rows
                .map(r => ({ id: r.crop_id, name: r.crop_name }))
                .filter(c => c.id && c.name && !cropSeen.has(c.id) && cropSeen.add(c.id))
                .sort((a, b) => a.name.localeCompare(b.name));
            const cropOptions = allCrops.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('');
            const cropFilterOptions = allCrops.map(c => `<option value="${esc(c.name.toLowerCase())}">${esc(c.name)}</option>`).join('');

            const priceRows = rows.map((r, i) => {
                const searchText = [r.sourceLabel, r.crop_name, r.district, r.market, r.type, r.fewsPrice || '', r.communityPrice || '', r.reports, r.unit].join(' ').toLowerCase();

                const fewsNum = r.fews_price_num ?? null;
                const fewsPer50Display = fewsNum ? `Bag: MK ${Math.round(fewsNum * 50).toLocaleString()}` : '';
                const fewsDisplay = fewsNum ? fmt(fewsNum) : (r.fewsPrice || '—');

                const communityMin = r.community_min_num ?? null;
                const communityAvg = r.community_avg_num ?? null;
                const communityMax = r.community_max_num ?? null;
                const communityMinBag = r.community_min_bag ?? (communityMin ? Math.round(communityMin * 50) : null);
                const communityAvgBag = r.community_avg_bag ?? (communityAvg ? Math.round(communityAvg * 50) : null);
                const communityMaxBag = r.community_max_bag ?? (communityMax ? Math.round(communityMax * 50) : null);

                const communityDisplay = (communityMin || communityAvg || communityMax) ?
                    `${communityMin ? fmt(communityMin) : '—'} / ${communityAvg ? fmt(communityAvg) : '—'} / ${communityMax ? fmt(communityMax) : '—'}` : (r.communityPrice || '—');
                const communityBagDisplay = (communityMinBag || communityAvgBag || communityMaxBag) ?
                    `Bag: ${communityMinBag ? 'MK ' + communityMinBag.toLocaleString() : '—'} / ${communityAvgBag ? 'MK ' + communityAvgBag.toLocaleString() : '—'} / ${communityMaxBag ? 'MK ' + communityMaxBag.toLocaleString() : '—'}` : '';

                const hasCommunity = (communityMin || communityAvg || communityMax);
                const confirmedChip = hasCommunity
                    ? (r.community_confirmed
                        ? '<span class="price-confirm-chip confirmed" title="3+ approved reports">✓ Confirmed</span>'
                        : '<span class="price-confirm-chip early" title="1–2 approved reports">Early</span>')
                    : '';

                return `
                <tr class="price-data-row" data-source="${esc(r.source)}" data-crop="${esc((r.crop_name || '').toLowerCase())}" data-district="${esc((r.district || '').toLowerCase())}" data-search="${esc(searchText)}" style="animation:serviceReveal .3s ease ${i * .03}s both">
                    <td data-sort-value="${esc(r.crop_name || '')}"><span style="font-size:1.3rem">${this.getCropIcon(r.crop_name)}</span> <strong>${esc(r.crop_name || 'Unknown crop')}</strong><br><small style="color:var(--text-muted)">${esc(r.type)}</small></td>
                    <td data-sort-value="${esc(r.district || '')}">${esc(r.district)}<br><small style="color:var(--text-muted)">${esc(r.market)}</small></td>
                    <td data-sort-value="${fewsNum ?? ''}"><span class="price-badge ${r.source === 'fews' ? 'price-high' : ''}">${esc(fewsDisplay)}</span><div style="font-size:.78rem;color:var(--text-muted);margin-top:.25rem">${esc(fewsPer50Display)}</div></td>
                    <td data-sort-value="${communityAvg ?? communityMin ?? ''}"><span class="price-badge ${r.source === 'community' ? 'price-high' : ''}">${esc(communityDisplay)}</span>${confirmedChip}<div style="font-size:.78rem;color:var(--text-muted);margin-top:.25rem">${esc(communityBagDisplay)}</div></td>
                    <td>${esc(r.unit)}</td>
                    <td data-sort-value="${r._ts || 0}" style="color:var(--text-muted);font-size:.8rem">${esc(r.reports)}</td>
                    <td data-sort-value="${esc(r.sourceLabel || '')}"><span class="price-badge" style="background:${r.source === 'fews' ? 'rgba(22,163,74,.12)' : 'rgba(200,164,90,.12)'};color:${r.source === 'fews' ? 'var(--primary)' : 'var(--accent)'}">${esc(r.sourceLabel)}</span></td>
                </tr>`;
            }).join('');

            // Load districts for the table filter
            const districtsList = await this.loadDistricts();
            const districtOptions = ['<option value="all">All districts</option>'].concat(
                districtsList.map(d => `<option value="${esc((d.name || '').toLowerCase())}">${esc(d.name)}</option>`)
            ).join('');
            // District options for the price-report form (value = id, required select).
            const districtReportOptions = districtsList
                .map(d => `<option value="${esc(d.id)}">${esc(d.name)}</option>`).join('');

            const area = document.getElementById('content-area');
            area.innerHTML = `
                <h2 style="font-family:'DM Serif Display',serif;margin-bottom:1rem;color:var(--text-primary)">Crop Prices</h2>
                <p class="price-meta" style="margin-bottom:1.25rem">AgroBiz reference rates and community market reports are shown side by side in one searchable table.</p>

                <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:1.5rem;flex-wrap:wrap">
                    <button class="price-tab active" id="tab-prices" onclick="app._priceTab('prices')">All Prices <span style="background:var(--accent);color:#fff;border-radius:20px;padding:.1rem .5rem;font-size:.75rem;margin-left:.3rem">${rows.length}</span></button>
                    <button class="price-tab" id="tab-report" onclick="app._priceTab('report')" style="margin-left:auto;background:var(--primary);color:#fff;border-color:var(--primary)">+ Report a Price</button>
                </div>

                <div id="pane-prices" class="price-pane">
                    <div class="price-filters">
                        <input id="price-search" type="search" placeholder="Search crop, district, market, source, price..." style="padding:.75rem;border:1px solid var(--border);border-radius:8px">
                        <select id="price-source-filter" style="padding:.75rem;border:1px solid var(--border);border-radius:8px">
                            <option value="all">All sources</option>
                            <option value="fews">AgroBiz Rate only</option>
                            <option value="community">Community only</option>
                        </select>
                        <select id="price-crop-filter" style="padding:.75rem;border:1px solid var(--border);border-radius:8px">
                            <option value="all">All crops</option>
                            ${cropFilterOptions}
                        </select>
                        <select id="price-district-filter" style="padding:.75rem;border:1px solid var(--border);border-radius:8px">
                            ${districtOptions}
                        </select>
                    </div>
                    <p id="price-filter-stats" class="price-meta">Showing ${rows.length} price records: ${fews.length} AgroBiz Rate, ${community.length} community.</p>
                    <div class="table-wrap" style="overflow-x:auto">
                    <table class="data-table sortable" id="price-combined-table">
                        <thead><tr>
                            <th>Crop</th><th>Location</th><th>AgroBiz Rate</th><th>Community Range</th><th>Unit</th><th>Date</th><th>Source</th>
                        </tr></thead>
                        <tbody>
                            ${priceRows || `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem">No price data yet.</td></tr>`}
                            <tr id="price-no-results" style="display:none"><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem">No prices match your filters.</td></tr>
                        </tbody>
                    </table>
                    </div>
                    <p class="price-meta" style="margin-top:1rem">AgroBiz rates are standard reference prices set for each Malawi crop. Community prices are farmer/trader reports, shown only after review — the value is the median of approved reports, marked <strong>✓ Confirmed</strong> once 3+ reports agree.</p>
                </div>

                <div id="pane-report" class="price-pane" style="display:none">
                    <div class="pr-note">
                        <strong>How price reporting works</strong>
                        <p>Report a price you have seen at a market. Enter the phone number you registered with — prices from approved members that match recent prices are published straight away, while unusual ones are checked by our team first. All fields are required so the price is useful to other farmers.</p>
                    </div>
                    <form id="price-report-form" class="pr-form">
                        <div class="form-group">
                            <label>Crop *</label>
                            <select id="pr-crop" required>
                                <option value="">Select crop...</option>
                                ${cropOptions}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>District *</label>
                            <select id="pr-district" required>
                                <option value="">Select district...</option>
                                ${districtReportOptions}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Market / Location *</label>
                            <input type="text" id="pr-market" placeholder="e.g. Limbe Market" required>
                        </div>
                        <div class="form-group">
                            <label>Price per kg (MWK) *</label>
                            <input type="number" id="pr-price" min="1" max="99999" step="1" placeholder="e.g. 250" required>
                        </div>
                        <div class="form-group">
                            <label>Your Phone (registered) *</label>
                            <input type="tel" id="pr-phone" placeholder="e.g. 0999 123 456" required>
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" id="pr-email" placeholder="you@example.com" required>
                        </div>
                        <button type="submit" class="btn-primary">Submit Price Report</button>
                        <p id="pr-msg" style="display:none;padding:.75rem 1rem;border-radius:8px;font-weight:600"></p>
                    </form>
                </div>
            `;

            const applyPriceFilters = () => {
                const term = document.getElementById('price-search').value.trim().toLowerCase();
                const source = document.getElementById('price-source-filter').value;
                const crop = document.getElementById('price-crop-filter').value;
                const district = document.getElementById('price-district-filter').value;
                let visible = 0;
                area.querySelectorAll('.price-data-row').forEach(row => {
                    const matchesTerm = !term || row.dataset.search.includes(term);
                    const matchesSource = source === 'all' || row.dataset.source === source;
                    const matchesCrop = crop === 'all' || row.dataset.crop === crop;
                    const matchesDistrict = district === 'all' || (row.dataset.district && row.dataset.district.includes(district));
                    const show = matchesTerm && matchesSource && matchesCrop && matchesDistrict;
                    row.style.display = show ? '' : 'none';
                    if (show) visible++;
                });
                document.getElementById('price-no-results').style.display = visible ? 'none' : '';
                document.getElementById('price-filter-stats').textContent = `Showing ${visible} of ${rows.length} price records`;
            };
            ['price-search', 'price-source-filter', 'price-crop-filter', 'price-district-filter'].forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                el.addEventListener('input', applyPriceFilters);
                el.addEventListener('change', applyPriceFilters);
            });

            // Table column sorting
            const attachTableSorting = () => {
                const table = document.getElementById('price-combined-table');
                if (!table) return;
                const headers = table.querySelectorAll('thead th');
                headers.forEach((th, idx) => {
                    th.style.cursor = 'pointer';
                    th.setAttribute('role', 'button');
                    th.addEventListener('click', () => {
                        const current = th.dataset.sortOrder === 'asc' ? 'desc' : 'asc';
                        headers.forEach(h => delete h.dataset.sortOrder);
                        th.dataset.sortOrder = current;
                        const tbody = table.tBodies[0];
                        const rowsArr = Array.from(tbody.querySelectorAll('tr.price-data-row'));
                        rowsArr.sort((a, b) => {
                            const aText = (a.cells[idx] && a.cells[idx].innerText || '').trim();
                            const bText = (b.cells[idx] && b.cells[idx].innerText || '').trim();
                            const aNum = parseFloat(aText.replace(/[^0-9.-]+/g, ''));
                            const bNum = parseFloat(bText.replace(/[^0-9.-]+/g, ''));
                            if (!isNaN(aNum) && !isNaN(bNum)) {
                                return current === 'asc' ? aNum - bNum : bNum - aNum;
                            }
                            return current === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText);
                        });
                        rowsArr.forEach(r => tbody.appendChild(r));
                    });
                });
            };

            // Initialize sorting
            attachTableSorting();

            area.querySelector('#price-report-form').addEventListener('submit', async e => {
                e.preventDefault();
                const btn = e.target.querySelector('button[type=submit]');
                const msg = document.getElementById('pr-msg');
                const showErr = (text) => {
                    msg.style.display = 'block';
                    msg.style.background = 'rgba(185,64,64,.1)'; msg.style.color = '#b94040';
                    msg.textContent = text;
                };

                const cropId    = +document.getElementById('pr-crop').value;
                const districtId = +document.getElementById('pr-district').value;
                const market    = document.getElementById('pr-market').value.trim();
                const price     = +document.getElementById('pr-price').value;
                const phone     = document.getElementById('pr-phone').value.trim();
                const email     = document.getElementById('pr-email').value.trim();

                // All fields are required.
                if (!cropId) return showErr('Please select a crop.');
                if (!districtId) return showErr('Please select your district.');
                if (!market) return showErr('Please enter the market / location.');
                if (!price || price <= 0) return showErr('Please enter a valid price per kg.');
                if (!/^\+?[0-9\s\-]{8,20}$/.test(phone)) return showErr('Please enter a valid phone number.');
                if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showErr('Please enter a valid email address.');

                btn.disabled = true; btn.textContent = 'Submitting...';
                try {
                    const res = await this.apiCall('api.php?action=submit_price', {
                        method: 'POST',
                        body: JSON.stringify({
                            crop_id: cropId,
                            district_id: districtId,
                            price_per_kg: price,
                            market_name: market,
                            phone: phone,
                            email: email,
                            channel: 'web',
                        })
                    });
                    msg.style.display = 'block';
                    if (res.success) {
                        msg.style.background = 'rgba(74,124,89,.1)'; msg.style.color = '#4a7c59';
                        msg.textContent = res.message;
                        e.target.reset();
                        setTimeout(() => this.loadCropPrices(), 1500);
                    } else {
                        msg.style.background = 'rgba(185,64,64,.1)'; msg.style.color = '#b94040';
                        msg.textContent = res.error || 'Submission failed.';
                    }
                } catch (err) {
                    msg.style.display = 'block'; msg.style.color = '#b94040'; msg.textContent = 'Network error.';
                } finally { btn.disabled = false; btn.textContent = 'Submit Price Report'; }
            });

        } catch (error) {
            console.error('Error loading crop prices:', error);
            this.showError('Failed to load crop prices');
        }
    }

    _priceTab(tab) {
        ['prices', 'report'].forEach(t => {
            document.getElementById('pane-' + t).style.display = t === tab ? 'block' : 'none';
            document.getElementById('tab-' + t).classList.toggle('active', t === tab);
        });
    }

    showCropDetails(cropName) {
        const area = document.getElementById('content-area');
        if (area) {
            area.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h2 style="margin-bottom: 2rem; color: var(--primary);">${this.getCropIcon(cropName)} ${cropName} Details</h2>
                    <p style="margin-bottom: 3rem; color: var(--text-secondary);">Learn more about ${cropName}</p>

                    <div class="services-grid" style="max-width: 800px; margin: 0 auto;">
                        <div class="service-card" onclick="app.loadCropPrices('${cropName}')" style="cursor: pointer;">
                            <div class="service-icon-3d">💰</div>
                            <div class="service-content-modern">
                                <h3>Price History</h3>
                                <p>Historical pricing for ${cropName}</p>
                            </div>
                        </div>

                        <div class="service-card" onclick="app.getCropFarmingTips('${cropName}')" style="cursor: pointer;">
                            <div class="service-icon-3d">🌾</div>
                            <div class="service-content-modern">
                                <h3>Growing Guide</h3>
                                <p>Best practices for ${cropName}</p>
                            </div>
                        </div>

                        <div class="service-card" onclick="app.getCropMarkets('${cropName}')" style="cursor: pointer;">
                            <div class="service-icon-3d">🏪</div>
                            <div class="service-content-modern">
                                <h3>Find Markets</h3>
                                <p>Where to sell ${cropName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    getCropFarmingTips(cropName) {
        this.loadCrops().then(crops => {
            const crop = crops.find(c => c.name.toLowerCase() === cropName.toLowerCase());
            if (crop) {
                this.loadFarmingTips(crop.id);
            }
        });
    }

    getCropMarkets(cropName) {
        // Show districts where this crop is commonly sold
        this.showDistrictSelection(() => {
            this.loadSellers(this.selectedDistrict, cropName);
        });
    }

    async loadWeather(districtId) {
        try {
            this.pushNavState('weather', { districtId });
            const weatherData = await this.getWeatherData(districtId);

            if (weatherData) {
                const html = `
                    <div style="margin-bottom: 2rem;">
                        <h2 style="margin-bottom: 1rem; color: var(--primary);">🌤️ ${this.texts[this.currentLang].weather} - ${weatherData.district_name}</h2>
                        <p style="color: var(--text-secondary);">7-day weather forecast with farming insights</p>
                    </div>

                    <div class="current-weather" style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); color: white; border-radius: var(--radius-xl); padding: 2rem; margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                        <div class="current-temp">
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                                <span style="font-size: 4rem;">${weatherData.forecast[0].weather_icon}</span>
                                <div>
                                    <div style="font-size: 3rem; font-weight: 700; line-height: 1;">${weatherData.current.temp}°C</div>
                                    <div style="font-size: 1.2rem; opacity: 0.9; text-transform: capitalize;">${weatherData.current.description}</div>
                                </div>
                            </div>
                        </div>
                        <div class="current-details" style="display: flex; gap: 2rem; flex-wrap: wrap;">
                            <div class="detail-item" style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="font-size: 1.5rem;">💧</span>
                                <span>${weatherData.current.humidity}% Humidity</span>
                            </div>
                            <div class="detail-item" style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="font-size: 1.5rem;">💨</span>
                                <span>${weatherData.current.wind_speed} km/h Wind</span>
                            </div>
                        </div>
                    </div>

                    <h3 style="margin-bottom: 1.5rem; color: var(--text-primary);">📅 7-Day Forecast</h3>
                    <div class="weather-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 3rem;">
                        ${weatherData.forecast.map((day, index) => `
                            <div class="weather-day" style="background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: 1.5rem; text-align: center; transition: var(--transition-normal); cursor: pointer; animation: serviceReveal 0.4s ease ${index * 0.1}s both;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'; this.style.borderColor='var(--primary)'" onmouseout="this.style.transform=''; this.style.boxShadow=''; this.style.borderColor='var(--gray-200)'">
                                <div class="weather-icon" style="font-size: 3rem; margin-bottom: 1rem; animation: weatherFloat 3s ease-in-out infinite; animation-delay: ${index * 0.5}s;">${day.weather_icon}</div>
                                <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.75rem; color: var(--text-primary);">${day.day_name}</h4>
                                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">${day.date}</div>
                                <div class="weather-temp" style="font-size: 1.3rem; font-weight: 700; color: var(--primary); margin-bottom: 0.75rem;">${day.temp_max}°<span style="color: var(--text-muted);">/${day.temp_min}°</span></div>
                                <p class="weather-desc" style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem; text-transform: capitalize;">${day.description}</p>
                                ${day.will_rain ? `
                                    <div class="rain-indicator" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(59, 130, 246, 0.1); color: var(--accent); border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 500; margin-bottom: 0.75rem;">
                                        <span>💧</span>
                                        <span>${day.precipitation}mm</span>
                                    </div>
                                ` : ''}
                                <div class="weather-details" style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted);">
                                    <span>💨 ${day.wind_speed}km/h</span>
                                    <span>💧 ${day.humidity}%</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="weather-advisory" style="background: linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%); border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: 2rem; position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: var(--gradient-accent);"></div>
                        <h4 style="display: flex; align-items: center; gap: 0.75rem; font-size: 1.4rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1.5rem;">
                            <span style="font-size: 2rem;">🌾</span>
                            Detailed Farming Advisory
                        </h4>
                        <div style="background: var(--white); border-radius: var(--radius-lg); padding: 1.5rem; line-height: 1.8; white-space: pre-line;">
                            ${this.getWeatherAdvisory(weatherData.forecast)}
                        </div>
                        <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(34, 197, 94, 0.1); border-radius: var(--radius-lg); border-left: 4px solid var(--primary);">
                            <strong style="color: var(--primary);">💡 Pro Tip:</strong>
                            <span style="color: var(--text-secondary);">Use this weather information to plan your farming activities for optimal results. Monitor daily for updates.</span>
                        </div>
                    </div>
                `;

                document.getElementById('content-area').innerHTML = html;
            } else {
                await this.loadWeatherFallback(districtId);
            }

        } catch (error) {
            console.error('❌ Error loading weather:', error);
            await this.loadWeatherFallback(districtId);
        }
    }

    async loadWeatherFallback(districtId) {
        const districts = await this.loadDistricts();
        const district = districts.find(d => d.id == districtId);
        const districtName = district ? district.name : `District ${districtId}`;

        const html = `
            <h2 style="margin-bottom: 2rem; color: var(--primary);">🌤️ ${this.texts[this.currentLang].weather} - ${districtName}</h2>
            <div class="weather-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                ${['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'].map((day, index) => `
                    <div class="weather-day" style="background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: 1.5rem; text-align: center; animation: serviceReveal 0.4s ease ${index * 0.1}s both;">
                        <div class="weather-icon" style="font-size: 3rem; margin-bottom: 1rem;">${['🌤️', '☀️', '🌧️', '⛅', '🌦️', '☀️', '⛅'][index]}</div>
                        <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.75rem;">${day}</h4>
                        <div class="weather-temp" style="font-size: 1.3rem; font-weight: 700; color: var(--primary); margin-bottom: 0.75rem;">${28 - index}°/${18 + index}°</div>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">${index === 2 ? 'Light Rain' : 'Partly Cloudy'}</p>
                        ${index === 2 ? '<div class="rain-indicator" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem; background: rgba(59, 130, 246, 0.1); color: var(--accent); border-radius: var(--radius-md); font-size: 0.85rem;"><span>💧</span><span>5mm</span></div>' : ''}
                    </div>
                `).join('')}
            </div>
            <div class="weather-advisory" style="background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: 2rem;">
                <h4 style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; color: var(--primary);">
                    <span style="font-size: 1.5rem;">🌾</span>
                    General Farming Advisory
                </h4>
                <p style="color: var(--text-secondary); line-height: 1.7;">Current conditions are generally favorable for farming activities. Monitor local weather conditions and adjust farming practices accordingly. Ensure adequate water supply during dry periods and proper drainage during wet periods.</p>
            </div>
        `;

        document.getElementById('content-area').innerHTML = html;
    }

    async loadMarketInsights(districtId) {
        try {
            this.pushNavState('market_insights', { districtId });
            const response = await this.apiCall('api.php?action=market_insights&district_id=' + districtId);

            if (!response.success) {
                this.showError(response.error || 'Failed to load market insights');
                return;
            }

            const insights = response.data || [];

            if (insights.length === 0) {
                this.showNoData();
                return;
            }

            const html = `
                <h2 style="margin-bottom: 2rem; color: var(--primary);">📊 ${this.texts[this.currentLang].market_insights}</h2>
                <div class="insights-grid" style="display: grid; gap: 1.5rem;">
                    ${insights.map((insight, index) => `
                        <div class="insight-card" style="background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: 2rem; position: relative; overflow: hidden; animation: serviceReveal 0.4s ease ${index * 0.1}s both;">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: var(--gradient-primary);"></div>
                            <div class="card-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                                <h3 style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-primary);">
                                    <span style="font-size: 2rem;">📍</span>
                                    ${insight.district_name} Market Update
                                </h3>
                                <span class="update-badge" style="background: var(--primary-glow); color: var(--primary); padding: 0.25rem 0.75rem; border-radius: var(--radius-md); font-size: 0.75rem; font-weight: 600; text-transform: uppercase;">Latest</span>
                            </div>
                            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1rem;">${insight[`insight_${this.currentLang}`] || insight.insight_en}</p>
                        </div>
                    `).join('')}
                </div>
            `;

            document.getElementById('content-area').innerHTML = html;

        } catch (error) {
            console.error('❌ Error loading market insights:', error);
            this.showError('Failed to load market insights');
        }
    }

    renderStars(rating) {
        const r = parseFloat(rating) || 0;
        const full = Math.floor(r);
        const half = r - full >= 0.5 ? 1 : 0;
        const empty = 5 - full - half;
        const stars = '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
        return `<span class="trade-stars" title="${r}/5">${stars}</span><span class="trade-rating-num">${r}/5</span>`;
    }

    contactSearchHtml(type, count, districtName, crops = [], districtId = null) {
        const t = this.texts[this.currentLang];
        const isSeller = type === 'seller';
        const title = isSeller ? t.find_sellers : t.find_buyers;
        const ph = isSeller ? t.search_sellers : t.search_buyers;

        const toggle = districtId !== null ? `
            <div class="trade-type-toggle">
                <button class="trade-toggle-btn ${isSeller ? 'active' : ''}" onclick="app.loadSellers(${districtId})">${t.find_sellers}</button>
                <button class="trade-toggle-btn ${!isSeller ? 'active' : ''}" onclick="app.loadBuyers(${districtId})">${t.find_buyers}</button>
            </div>` : '';

        const chipHtml = crops.length ? `
            <div class="trade-chips" role="group" aria-label="Filter by crop">
                <button class="trade-chip active" data-crop-filter="">All</button>
                ${crops.map(c => `<button class="trade-chip" data-crop-filter="${c.toLowerCase()}">${c}</button>`).join('')}
            </div>` : '';

        return `
            <div class="trade-hero trade-hero-${type}">
                <div class="trade-hero-inner">
                    <span class="trade-kicker">${districtName}</span>
                    <h2>${title}</h2>
                    <p>${count} ${isSeller ? 'seller' : 'buyer'}${count === 1 ? '' : 's'} found — tap to call directly</p>
                </div>
                ${toggle}
            </div>
            <div class="trade-controls">
                <label class="trade-filter">
                    <span class="material-symbols-rounded">search</span>
                    <input type="search" data-contact-filter placeholder="${ph}" aria-label="${ph}">
                </label>
                ${chipHtml}
            </div>
            <p class="trade-filter-count" data-contact-count>${count} showing</p>`;
    }

    bindContactFilter() {
        const input = document.querySelector('[data-contact-filter]');
        const countEl = document.querySelector('[data-contact-count]');
        const cards = Array.from(document.querySelectorAll('[data-contact-card]'));
        const chips = document.querySelectorAll('[data-crop-filter]');
        if (!input || !countEl || !cards.length) return;

        let activeCrop = '';
        let searchTerm = '';

        const applyFilter = () => {
            searchTerm = input.value.toLowerCase().trim();
            let visible = 0;
            cards.forEach(card => {
                const show = (!searchTerm || card.dataset.search.includes(searchTerm))
                    && (!activeCrop || (card.dataset.crops || '').includes(activeCrop));
                card.hidden = !show;
                if (show) visible++;
            });
            countEl.textContent = (searchTerm || activeCrop)
                ? `${visible} match${visible === 1 ? '' : 'es'}`
                : `${cards.length} showing`;

            // Update chip visual states
            updateChipStates();
        };

        const updateChipStates = () => {
            chips.forEach(chip => {
                const cropFilter = chip.dataset.cropFilter || '';
                if (cropFilter === activeCrop) {
                    chip.classList.add('active');
                } else {
                    chip.classList.remove('active');
                }
            });
        };

        const clearAllFilters = () => {
            input.value = '';
            activeCrop = '';
            chips.forEach(c => c.classList.remove('active'));
            const allChip = document.querySelector('[data-crop-filter=""]');
            if (allChip) allChip.classList.add('active');
            applyFilter();
        };

        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeCrop = chip.dataset.cropFilter;
                applyFilter();
            });

            chip.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    chip.click();
                }
            });
        });

        input.addEventListener('input', applyFilter);

        // Enhance filter focus states
        input.addEventListener('focus', () => {
            const filterControl = input.closest('.trade-filter');
            if (filterControl) filterControl.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            const filterControl = input.closest('.trade-filter');
            if (filterControl) filterControl.classList.remove('focused');
        });
    }

    async loadSellers(districtId, specificCrop = null) {
        try {
            this.pushNavState('sellers', { districtId, specificCrop });
            let endpoint = `api.php?action=sellers&district_id=${districtId}`;
            if (specificCrop) endpoint += `&crop=${encodeURIComponent(specificCrop)}`;
            const response = await this.apiCall(endpoint);
            if (!response.success) { this.showError(response.error || 'Failed to load sellers'); return; }
            const sellers = response.data || [];
            if (!sellers.length) { this.showNoData(); return; }

            const districtName = sellers[0]?.district_name || 'Selected district';
            const cropSet = new Set();
            sellers.forEach(s => (s.crops_display || '').split(', ').forEach(c => c.trim() && cropSet.add(c.trim())));
            const crops = [...cropSet].sort();

            const html = `
                ${this.contactSearchHtml('seller', sellers.length, districtName, crops, districtId)}
                <div class="trade-list">
                    ${sellers.map(seller => {
                const cropStr = seller.crops_display || '';
                const cropTags = cropStr
                    ? cropStr.split(', ').map(c => `<span class="trade-crop-tag">${c.trim()}</span>`).join('')
                    : '<span class="trade-crop-tag muted">No crops listed</span>';
                const ratingNum = parseFloat(seller.rating);
                const ratingHtml = ratingNum ? this.renderStars(ratingNum) : '<span class="trade-new-badge">New</span>';
                const searchStr = `${seller.name} ${seller.district_name} ${seller.phone_number || ''} ${seller.email || ''} ${seller.address || ''} ${cropStr}`.toLowerCase();
                return `
                            <article class="trade-card seller-card" data-contact-card data-search="${searchStr}" data-crops="${cropStr.toLowerCase()}">
                                <div class="trade-card-accent"></div>
                                <div>
                                    <div class="trade-card-body">
                                        <div class="trade-card-header">
                                            <div>
                                                <h3 class="trade-card-name">${seller.name}</h3>
                                                <p class="trade-location">${seller.district_name}${seller.address ? ` · ${seller.address}` : ''}</p>
                                            </div>
                                            <div class="trade-rating">${ratingHtml}</div>
                                        </div>
                                        <div class="trade-crop-tags">${cropTags}</div>
                                    </div>
                                    <div class="trade-actions">
                                        <a href="tel:${seller.phone_number}" class="trade-call">
                                            <span class="material-symbols-rounded">call</span>${seller.phone_number}
                                        </a>
                                        ${seller.email ? `<a href="mailto:${seller.email}" class="trade-email"><span class="material-symbols-rounded">mail</span>Email</a>` : ''}
                                    </div>
                                </div>
                            </article>`;
            }).join('')}
                </div>`;
            document.getElementById('content-area').innerHTML = html;
            this.bindContactFilter();
        } catch (error) {
            console.error('Error loading sellers:', error);
            this.showError('Failed to load sellers');
        }
    }

    async loadBuyers(districtId) {
        try {
            this.pushNavState('buyers', { districtId });
            const response = await this.apiCall(`api.php?action=buyers&district_id=${districtId}`);
            if (!response.success) { this.showError(response.error || 'Failed to load buyers'); return; }
            const buyers = response.data || [];
            if (!buyers.length) { this.showNoData(); return; }

            const districtName = buyers[0]?.district_name || 'Selected district';
            const cropSet = new Set();
            buyers.forEach(b => (b.crops_display || '').split(', ').forEach(c => c.trim() && cropSet.add(c.trim())));
            const crops = [...cropSet].sort();

            const html = `
                ${this.contactSearchHtml('buyer', buyers.length, districtName, crops, districtId)}
                <div class="trade-list">
                    ${buyers.map(buyer => {
                const cropStr = buyer.crops_display || '';
                const cropTags = cropStr
                    ? cropStr.split(', ').map(c => `<span class="trade-crop-tag">${c.trim()}</span>`).join('')
                    : '<span class="trade-crop-tag muted">No crops listed</span>';
                const searchStr = `${buyer.name} ${buyer.district_name} ${buyer.phone_number || ''} ${buyer.email || ''} ${buyer.address || ''} ${cropStr}`.toLowerCase();
                return `
                            <article class="trade-card buyer-card" data-contact-card data-search="${searchStr}" data-crops="${cropStr.toLowerCase()}">
                                <div class="trade-card-accent"></div>
                                <div>
                                    <div class="trade-card-body">
                                        <div class="trade-card-header">
                                            <div>
                                                <h3 class="trade-card-name">${buyer.name}</h3>
                                                <p class="trade-location">${buyer.district_name}${buyer.address ? ` · ${buyer.address}` : ''}</p>
                                            </div>
                                            <div class="trade-rating"><span class="trade-new-badge">Buying</span></div>
                                        </div>
                                        <div class="trade-crop-tags">${cropTags}</div>
                                    </div>
                                    <div class="trade-actions">
                                        <a href="tel:${buyer.phone_number}" class="trade-call">
                                            <span class="material-symbols-rounded">call</span>${buyer.phone_number}
                                        </a>
                                        ${buyer.email ? `<a href="mailto:${buyer.email}" class="trade-email"><span class="material-symbols-rounded">mail</span>Email</a>` : ''}
                                    </div>
                                </div>
                            </article>`;
            }).join('')}
                </div>`;
            document.getElementById('content-area').innerHTML = html;
            this.bindContactFilter();
        } catch (error) {
            console.error('Error loading buyers:', error);
            this.showError('Failed to load buyers');
        }
    }

    async loadPestControl(cropId, districtId) {
        try {
            this.pushNavState('pest_control', { cropId, districtId });
            const response = await this.apiCall(`api.php?action=pest_control&crop_id=${cropId}&district_id=${districtId}`);

            if (!response.success) {
                this.showError(response.error || 'Failed to load pest control tips');
                return;
            }

            const tips = response.data || [];

            if (tips.length === 0) {
                this.showNoData();
                return;
            }

            const t = this.texts[this.currentLang];
            const html = `
                <h2 style="margin-bottom: 2rem; color: var(--primary);">🐛 ${this.texts[this.currentLang].pest_control}</h2>
                <div class="tips-grid">
                    ${tips.map((tip, index) => `
                        <div class="tip-card" style="animation: serviceReveal 0.4s ease ${index * 0.1}s both;">
                            <div class="card-accent-bar" style="background: var(--gradient-warm);"></div>
                            <div class="card-header">
                                <h3 style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-primary);">
                                    <span style="font-size: 2rem;">🐛</span>
                                    ${tip.crop_name} - ${tip.district_name}
                                </h3>
                                <span class="tip-badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706;">${t.prevention_label}</span>
                            </div>
                            <p class="card-text">${tip[`tip_${this.currentLang}`] || tip.tip_en}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="also-view">
                    <span class="also-view-label">${t.also_view}</span>
                    <button class="also-view-btn" onclick="app.showLoading();app.loadFarmingTips(${cropId})">🌾 ${t.farming_tips}</button>
                    <button class="also-view-btn" onclick="app.openService('basic-info')">📚 ${t.basic_info}</button>
                </div>
            `;

            document.getElementById('content-area').innerHTML = html;

        } catch (error) {
            console.error('❌ Error loading pest control:', error);
            this.showError('Failed to load pest control tips');
        }
    }

    async loadFarmingTips(cropId) {
        try {
            this.pushNavState('farming_tips', { cropId });
            const response = await this.apiCall(`api.php?action=farming_tips&crop_id=${cropId}`);

            if (!response.success) {
                this.showError(response.error || 'Failed to load farming tips');
                return;
            }

            const tips = response.data || [];

            if (tips.length === 0) {
                this.showNoData();
                return;
            }

            const t = this.texts[this.currentLang];
            const html = `
                <h2 style="margin-bottom: 2rem; color: var(--primary);">🌾 ${this.texts[this.currentLang].farming_tips}</h2>
                <div class="tips-grid">
                    ${tips.map((tip, index) => {
                        const badgeLabel = this.currentLang === 'ci'
                            ? (this.practiceTypeMap[tip.practice_type] || tip.practice_type)
                            : tip.practice_type;
                        return `
                        <div class="tip-card" style="animation: serviceReveal 0.4s ease ${index * 0.1}s both;">
                            <div class="card-accent-bar" style="background: var(--gradient-primary);"></div>
                            <div class="card-header">
                                <h3 style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-primary);">
                                    <span style="font-size: 2rem;">🌾</span>
                                    ${tip.crop_name}
                                </h3>
                                <span class="practice-badge" style="background: var(--primary-glow); color: var(--primary);">${badgeLabel}</span>
                            </div>
                            <p class="card-text">${tip[`practice_${this.currentLang}`] || tip.practice_en}</p>
                        </div>`;
                    }).join('')}
                </div>
                <div class="also-view">
                    <span class="also-view-label">${t.also_view}</span>
                    <button class="also-view-btn" onclick="app.showLoading();app.showCropPestControl(${cropId})">🐛 ${t.pest_control}</button>
                    <button class="also-view-btn" onclick="app.openService('basic-info')">📚 ${t.basic_info}</button>
                </div>
            `;

            document.getElementById('content-area').innerHTML = html;

        } catch (error) {
            console.error('❌ Error loading farming tips:', error);
            this.showError('Failed to load farming tips');
        }
    }

    async loadBasicInfo() {
        try {
            this.pushNavState('basic_info', {});
            const response = await this.apiCall('api.php?action=basic_info');

            if (!response.success) {
                this.showError(response.error || 'Failed to load basic info');
                return;
            }

            const info = response.data || [];

            if (info.length === 0) {
                this.showNoData();
                return;
            }

            const t = this.texts[this.currentLang];
            const html = `
                <h2 style="margin-bottom: 2rem; color: var(--primary);">📚 ${this.texts[this.currentLang].basic_info}</h2>
                <div class="info-grid">
                    ${info.map((item, index) => `
                        <div class="info-card" style="animation: serviceReveal 0.4s ease ${index * 0.1}s both;">
                            <div class="card-accent-bar" style="background: var(--gradient-secondary);"></div>
                            <div class="card-header">
                                <h3 style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-primary);">
                                    <span style="font-size: 2rem;">📚</span>
                                    ${item.topic}
                                </h3>
                                <span class="info-badge" style="background: rgba(139, 115, 85, 0.1); color: var(--accent);">${t.essential_label}</span>
                            </div>
                            <p class="card-text">${item[`info_${this.currentLang}`] || item.info_en}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="also-view">
                    <span class="also-view-label">${t.also_view}</span>
                    <button class="also-view-btn" onclick="app.openService('farming-tips')">🌾 ${t.farming_tips}</button>
                    <button class="also-view-btn" onclick="app.openService('pest-control')">🐛 ${t.pest_control}</button>
                </div>
            `;

            document.getElementById('content-area').innerHTML = html;

        } catch (error) {
            console.error('❌ Error loading basic info:', error);
            this.showError('Failed to load basic farming information');
        }
    }

    getCropIcon(cropName) {
        const icons = {
            'Maize': '🌽',
            'Tobacco': '🍂',
            'Groundnuts': '🥜',
            'Cotton': '🌿',
            'Tea': '🍃',
            'Coffee': '☕',
            'Rice': '🌾',
            'Soybeans': '🫘',
            'Beans': '🫘',
            'Sugarcane': '🎋',
            'Cassava': '🍠',
            'Sweet Potato': '🍠',
            'Tomatoes': '🍅',
            'Onions': '🧅',
            'Cabbage': '🥬',
            'Irish Potato': '🥔',
            'Pigeon Peas': '🫛',
            'Sorghum': '🌾',
            'Millet': '🌾'
        };
        return icons[cropName] || '🌱';
    }

    getCropCategory(cropName) {
        for (const [category, crops] of Object.entries(this.cropCategories)) {
            if (crops.includes(cropName)) {
                return category;
            }
        }
        return 'specialty';
    }
}

// Add CSS animations for weather icons
const weatherAnimationCSS = `
@keyframes weatherFloat {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50% { transform: translateY(-8px) rotate(2deg); }
}

@keyframes iconShine {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: -100%; }
}

/* Additional responsive styles */
@media (max-width: 768px) {
    .current-weather {
        flex-direction: column !important;
        text-align: center;
    }

    .current-details {
        justify-content: center !important;
        gap: 1rem !important;
    }

    .weather-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 0.75rem !important;
    }

    .contact-card {
        flex-direction: column !important;
        text-align: center !important;
    }

    .contact-icon {
        margin-bottom: 1rem !important;
    }
}

@media (max-width: 480px) {
    .weather-grid {
        grid-template-columns: 1fr !important;
    }

    .price-overview {
        grid-template-columns: 1fr !important;
    }

    .platform-highlights {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}
`;



// Add the CSS to document
const weatherStyle = document.createElement('style');
weatherStyle.textContent = weatherAnimationCSS;
document.head.appendChild(weatherStyle);

// Initialize the revolutionary app and expose it on window so that
// the registration DOMContentLoaded handlers (and any inline onclick
// attributes) can reach it via window.app.
window.app = new AgroBusinessRevolution();

// ─── REGISTRATION / KYC MODULE ────────────────────────────────────────────────

AgroBusinessRevolution.prototype.openRegistrationModal = function () {
    const modal = document.getElementById('register-modal');
    if (!modal) return;
    this._regState = { step: 1, userType: null, selectedCrops: [] };
    document.querySelectorAll('.reg-option').forEach(b => b.classList.remove('selected'));
    const bizField = document.getElementById('reg-business-field');
    if (bizField) bizField.style.display = 'none';

    ['reg-full-name', 'reg-phone', 'reg-email', 'reg-national-id', 'reg-village', 'reg-business-name'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    const district = document.getElementById('reg-district');
    if (district) district.value = '';
    document.querySelectorAll('#reg-crops-grid input[type="checkbox"]').forEach(cb => cb.checked = false);

    const successEl = document.getElementById('reg-step-success');
    if (successEl) successEl.style.display = 'none';
    document.querySelectorAll('.reg-step-content').forEach(el => el.style.display = 'none');
    const step1 = document.getElementById('reg-step-1');
    if (step1) step1.style.display = '';

    this._regGotoStep(1);
    this._regLoadDistricts();
    this._regLoadCrops();
    this.openModal(modal);
};

AgroBusinessRevolution.prototype._regGotoStep = function (step) {
    const state = this._regState;
    state.step = step;

    // Hide all step contents
    document.querySelectorAll('.reg-step-content').forEach(el => el.style.display = 'none');
    const target = document.getElementById(`reg-step-${step}`);
    if (target) target.style.display = '';

    // Update step indicators
    document.querySelectorAll('.reg-steps .reg-step').forEach(el => {
        const s = parseInt(el.dataset.step);
        el.classList.toggle('reg-step-active', s === step);
        el.classList.toggle('reg-step-done', s < step);
    });

    // Build review on step 4
    if (step === 4) this._regBuildReview();
};

AgroBusinessRevolution.prototype._regLoadDistricts = function () {
    const sel = document.getElementById('reg-district');
    if (!sel) return;
    // Clear any previously loaded options except the placeholder so re-opens don't duplicate
    while (sel.options.length > 1) sel.remove(1);
    fetch(`api.php?action=districts`)
        .then(r => r.json())
        .then(data => {
            if (!data.success) return;
            data.data.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.id;
                opt.textContent = d.name;
                sel.appendChild(opt);
            });
        })
        .catch(() => {
            if (window.app) window.app.showNotification('Failed to load districts. Please try again.', 'error');
        });
};

AgroBusinessRevolution.prototype._regLoadCrops = function () {
    const grid = document.getElementById('reg-crops-grid');
    if (!grid || grid.children.length > 0) return;
    fetch(`api.php?action=crops`)
        .then(r => r.json())
        .then(data => {
            if (!data.success) return;
            grid.innerHTML = '';
            data.data.forEach(c => {
                const label = document.createElement('label');
                label.className = 'reg-crop-checkbox';
                label.innerHTML = `<input type="checkbox" value="${c.id}" data-name="${c.name}"> ${c.name}`;
                grid.appendChild(label);
            });
        })
        .catch(() => {
            if (window.app) window.app.showNotification('Failed to load crops. Please try again.', 'error');
        });
};

AgroBusinessRevolution.prototype._regBuildReview = function () {
    const s = this._regState;
    const districtName = document.getElementById('reg-district').selectedOptions[0]?.text || '—';
    const selectedCrops = [...document.querySelectorAll('#reg-crops-grid input:checked')].map(el => el.dataset.name).join(', ') || '—';
    const container = document.getElementById('reg-review-content');
    if (!container) return;
    container.innerHTML = `
        <strong>Type:</strong> ${s.userType ? s.userType.charAt(0).toUpperCase() + s.userType.slice(1) : '—'}<br>
        <strong>Name:</strong> ${document.getElementById('reg-full-name').value || '—'}<br>
        <strong>Phone:</strong> ${document.getElementById('reg-phone').value || '—'}<br>
        <strong>Email:</strong> ${document.getElementById('reg-email').value || 'Not provided'}<br>
        <strong>National ID:</strong> ${document.getElementById('reg-national-id').value || 'Not provided'}<br>
        <strong>District:</strong> ${districtName}<br>
        <strong>Village / Town:</strong> ${document.getElementById('reg-village').value || '—'}<br>
        <strong>Crops:</strong> ${selectedCrops}<br>
        ${s.userType !== 'farmer' ? `<strong>Business:</strong> ${document.getElementById('reg-business-name').value || '—'}<br>` : ''}
    `;
};

// Wire up registration modal events once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Close button
    const closeBtn = document.getElementById('register-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const modal = document.getElementById('register-modal');
            if (modal && window.app) { window.app.closeModal(modal); }
        });
    }

    // User type selection (step 1)
    document.querySelectorAll('.reg-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.reg-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            if (window.app) {
                window.app._regState.userType = btn.dataset.type;
                // Show business name field for seller/buyer
                const bizField = document.getElementById('reg-business-field');
                if (bizField) bizField.style.display = btn.dataset.type !== 'farmer' ? '' : 'none';
                setTimeout(() => window.app._regGotoStep(2), 200);
            }
        });
    });

    // Back buttons
    document.querySelectorAll('.reg-back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.app) window.app._regGotoStep(parseInt(btn.dataset.goto));
        });
    });

    // Step 2 → 3
    const step2Next = document.getElementById('reg-step2-next');
    if (step2Next) {
        step2Next.addEventListener('click', () => {
            document.querySelectorAll('#reg-step-2 .field-error').forEach(el => el.remove());
            document.querySelectorAll('#reg-step-2 .is-invalid').forEach(el => el.classList.remove('is-invalid'));

            const setErr = (id, msg) => {
                const el = document.getElementById(id);
                if (!el) return;
                el.classList.add('is-invalid');
                const span = document.createElement('span');
                span.className = 'field-error';
                span.textContent = msg;
                el.parentNode.appendChild(span);
            };

            const name     = document.getElementById('reg-full-name').value.trim();
            const phone    = document.getElementById('reg-phone').value.trim();
            const email    = document.getElementById('reg-email').value.trim();
            const district = document.getElementById('reg-district').value;
            const village  = document.getElementById('reg-village').value.trim();

            let valid = true;
            if (!name || name.length < 2) { setErr('reg-full-name', 'Full name is required (at least 2 characters).'); valid = false; }

            const digitCount = (phone.match(/\d/g) || []).length;
            if (!phone || digitCount < 7) { setErr('reg-phone', 'Enter a valid phone number (e.g. 0999 123 456).'); valid = false; }

            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setErr('reg-email', 'Enter a valid email address or leave blank.'); valid = false; }

            if (!village || village.length < 2) { setErr('reg-village', 'Village or town is required.'); valid = false; }
            if (!district) { setErr('reg-district', 'Please select your district.'); valid = false; }

            if (!valid) return;
            if (window.app) window.app._regGotoStep(3);
        });
    }

    // Clear field errors when user types
    ['reg-full-name', 'reg-phone', 'reg-email', 'reg-village'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => {
            el.classList.remove('is-invalid');
            const err = el.parentNode.querySelector('.field-error');
            if (err) err.remove();
        });
    });
    const districtSel = document.getElementById('reg-district');
    if (districtSel) districtSel.addEventListener('change', () => {
        districtSel.classList.remove('is-invalid');
        const err = districtSel.parentNode.querySelector('.field-error');
        if (err) err.remove();
    });

    // Step 3 → 4
    const step3Next = document.getElementById('reg-step3-next');
    if (step3Next) {
        step3Next.addEventListener('click', () => {
            const selectedCrops = [...document.querySelectorAll('#reg-crops-grid input:checked')].map(el => el.dataset.name);
            const business = document.getElementById('reg-business-name').value.trim();
            const userType = window.app?._regState?.userType;

            if (!selectedCrops.length) { window.app && window.app.showNotification('Please select at least one crop.', 'error'); return; }
            if (userType && userType !== 'farmer' && !business) { window.app && window.app.showNotification('Please enter your business or organisation name.', 'error'); return; }
            if (window.app) window.app._regGotoStep(4);
        });
    }

    // Submit
    const submitBtn = document.getElementById('reg-submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            if (!window.app) return;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting…';

            const state = window.app._regState;
            const selectedCrops = [...document.querySelectorAll('#reg-crops-grid input:checked')].map(el => el.dataset.name).join(', ');
            const districtId = document.getElementById('reg-district').value;

            const payload = {
                user_type: state.userType,
                full_name: document.getElementById('reg-full-name').value.trim(),
                phone_number: document.getElementById('reg-phone').value.trim(),
                email: document.getElementById('reg-email').value.trim(),
                national_id: document.getElementById('reg-national-id').value.trim(),
                district_id: districtId ? parseInt(districtId) : null,
                village: document.getElementById('reg-village').value.trim(),
                crops_of_interest: selectedCrops,
                business_name: document.getElementById('reg-business-name').value.trim(),
                channel: 'web'
            };

            try {
                const res = await fetch(`api.php?action=submit_application`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();

                if (data.success) {
                    document.querySelectorAll('.reg-step-content').forEach(el => el.style.display = 'none');
                    const successEl = document.getElementById('reg-step-success');
                    if (successEl) successEl.style.display = '';
                    const refEl = document.getElementById('reg-ref-number');
                    if (refEl) refEl.textContent = data.ref;
                    // Mark all steps done
                    document.querySelectorAll('.reg-steps .reg-step').forEach(el => {
                        el.classList.remove('reg-step-active');
                        el.classList.add('reg-step-done');
                    });
                } else {
                    if (window.app) window.app.showNotification(data.error || 'Submission failed. Please try again.', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Application ✓';
                }
            } catch (err) {
                if (window.app) window.app.showNotification('Network error. Please check your connection and try again.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Application ✓';
            }
        });
    }

    // Check status button (opens status modal)
    const checkStatusBtn = document.getElementById('reg-check-status-btn');
    if (checkStatusBtn) {
        checkStatusBtn.addEventListener('click', () => {
            const regModal = document.getElementById('register-modal');
            if (regModal && window.app) { window.app.closeModal(regModal); }
            setTimeout(() => {
                const statusModal = document.getElementById('status-modal');
                if (statusModal && window.app) { window.app.openModal(statusModal); }
            }, 260);
        });
    }

    // Status modal close
    const statusCloseBtn = document.getElementById('status-modal-close');
    if (statusCloseBtn) {
        statusCloseBtn.addEventListener('click', () => {
            const modal = document.getElementById('status-modal');
            if (modal && window.app) { window.app.closeModal(modal); }
        });
    }

    // Status check
    const statusCheckBtn = document.getElementById('status-check-btn');
    if (statusCheckBtn) {
        statusCheckBtn.addEventListener('click', async () => {
            const ref = document.getElementById('status-ref-input').value.trim().toUpperCase();
            if (!ref) { if (window.app) window.app.showNotification('Please enter your reference number.', 'error'); return; }
            statusCheckBtn.textContent = 'Checking…';
            statusCheckBtn.disabled = true;
            const result = document.getElementById('status-result');

            try {
                const res = await fetch(`api.php?action=check_application&ref=${encodeURIComponent(ref)}`);
                const data = await res.json();
                if (data.success && data.data) {
                    const d = data.data;
                    const statusClass = d.status;
                    result.style.display = '';
                    result.innerHTML = `
                        <div style="background:#242424;border-radius:10px;padding:1rem;font-size:.9rem;line-height:1.8;">
                            <strong>${d.full_name}</strong> &nbsp; <span class="status-badge ${statusClass}">${d.status.toUpperCase()}</span><br>
                            <strong>Type:</strong> ${d.user_type}<br>
                            <strong>District:</strong> ${d.district_name || '—'}<br>
                            <strong>Applied:</strong> ${new Date(d.created_at).toLocaleDateString()}<br>
                            ${d.status === 'denied' && d.denial_reason ? `<strong>Reason:</strong> ${d.denial_reason}<br>` : ''}
                            ${d.status === 'approved' ? '<br>✅ You are now a verified member of AgroBusiness Malawi!' : ''}
                            ${d.status === 'pending' ? '<br>⏳ Your application is under review. We will notify you soon.' : ''}
                        </div>
                    `;
                } else {
                    result.style.display = '';
                    result.innerHTML = `<p style="color:#ef4444;">Application not found. Please check your reference number.</p>`;
                }
            } catch (err) {
                result.style.display = '';
                result.innerHTML = `<p style="color:#ef4444;">Network error. Please try again.</p>`;
            }

            statusCheckBtn.textContent = 'Check Status';
            statusCheckBtn.disabled = false;
        });
    }

    // Backdrop-click for register-modal and status-modal is already handled by
    // bindModalEvents() which covers all .modal elements. No duplicate listener needed.
});

// ─── END REGISTRATION MODULE ──────────────────────────────────────────────────

// ─── ADMIN PANEL MODULE ───────────────────────────────────────────────────────

AgroBusinessRevolution.prototype.openAdminPanel = function () {
    const modal = document.getElementById('admin-modal');
    if (!modal) return;
    const savedToken = sessionStorage.getItem('agro_admin_token');
    if (savedToken) {
        this._adminToken = savedToken;
        this._adminShowApps('pending');
    } else {
        document.getElementById('admin-login-screen').style.display = '';
        document.getElementById('admin-apps-screen').style.display = 'none';
        document.getElementById('admin-review-screen').style.display = 'none';
    }
    this.openModal(modal);
};

AgroBusinessRevolution.prototype._adminBindEvents = function () {
    const loginBtn = document.getElementById('admin-login-btn');
    if (loginBtn && !loginBtn._adminBound) {
        loginBtn._adminBound = true;
        loginBtn.addEventListener('click', () => this._adminDoLogin());
        document.getElementById('admin-token-input').addEventListener('keydown', e => {
            if (e.key === 'Enter') this._adminDoLogin();
        });
    }

    const closeBtn = document.getElementById('admin-modal-close');
    if (closeBtn && !closeBtn._adminBound) {
        closeBtn._adminBound = true;
        closeBtn.addEventListener('click', () => {
            document.getElementById('admin-modal').classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    const backBtn = document.getElementById('admin-back-btn');
    if (backBtn && !backBtn._adminBound) {
        backBtn._adminBound = true;
        backBtn.addEventListener('click', () => this._adminShowApps(this._adminCurrentTab || 'pending'));
    }

    document.querySelectorAll('#admin-tabs .admin-tab').forEach(tab => {
        if (!tab._adminBound) {
            tab._adminBound = true;
            tab.addEventListener('click', () => {
                document.querySelectorAll('#admin-tabs .admin-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this._adminShowApps(tab.dataset.status);
            });
        }
    });
};

AgroBusinessRevolution.prototype._adminDoLogin = function () {
    const token = (document.getElementById('admin-token-input').value || '').trim();
    const errEl = document.getElementById('admin-login-error');
    if (!token) { errEl.textContent = 'Please enter the admin token.'; errEl.style.display = ''; return; }
    errEl.style.display = 'none';
    this._adminToken = token;
    sessionStorage.setItem('agro_admin_token', token);
    this._adminShowApps('pending');
};

AgroBusinessRevolution.prototype._adminShowApps = function (status) {
    this._adminCurrentTab = status;
    document.getElementById('admin-login-screen').style.display = 'none';
    document.getElementById('admin-review-screen').style.display = 'none';
    document.getElementById('admin-apps-screen').style.display = '';
    const list = document.getElementById('admin-apps-list');
    list.innerHTML = '<div class="loading-spinner" style="margin:2rem auto;"></div>';

    const base = (window.APP_CONFIG && window.APP_CONFIG.apiBase) ? window.APP_CONFIG.apiBase : 'api.php';
    fetch(`${base}?action=admin_applications&status=${status}&token=${encodeURIComponent(this._adminToken)}`)
        .then(r => r.json())
        .then(data => {
            if (!data.success) {
                if (data.error === 'Unauthorized') {
                    sessionStorage.removeItem('agro_admin_token');
                    document.getElementById('admin-login-screen').style.display = '';
                    document.getElementById('admin-apps-screen').style.display = 'none';
                    const errEl = document.getElementById('admin-login-error');
                    errEl.textContent = 'Invalid token. Please try again.';
                    errEl.style.display = '';
                    return;
                }
                list.innerHTML = `<p style="color:#dc2626;">Error: ${data.error || 'Failed to load'}</p>`;
                return;
            }
            this._adminRenderList(data.data || []);
        })
        .catch(() => { list.innerHTML = '<p style="color:#dc2626;">Network error. Check connection.</p>'; });
};

AgroBusinessRevolution.prototype._adminRenderList = function (apps) {
    const list = document.getElementById('admin-apps-list');
    if (!apps.length) {
        list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem 0;">No applications in this category.</p>';
        return;
    }
    const statusBadge = s => {
        const map = { pending: '#f59e0b', approved: '#16a34a', denied: '#dc2626' };
        return `<span style="background:${map[s]||'#6b7280'};color:#fff;border-radius:999px;padding:2px 10px;font-size:0.75rem;font-weight:600;">${s.toUpperCase()}</span>`;
    };
    list.innerHTML = apps.map(a => `
        <div class="admin-app-card" data-id="${a.id}">
            <div class="admin-app-card-header">
                <span class="admin-app-ref">${a.application_ref}</span>
                ${statusBadge(a.status)}
            </div>
            <div class="admin-app-card-body">
                <strong>${a.full_name}</strong> &mdash; <span style="text-transform:capitalize;">${a.user_type}</span><br>
                <span style="color:var(--text-muted);font-size:0.85rem;">${a.district_name || '—'} &bull; ${a.phone_number}</span><br>
                <span style="color:var(--text-muted);font-size:0.8rem;">${new Date(a.created_at).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'})}</span>
            </div>
            ${a.status === 'pending' ? `<button class="admin-review-btn btn-primary" data-id="${a.id}" style="width:100%;margin-top:0.5rem;">Review</button>` : ''}
        </div>
    `).join('');

    list.querySelectorAll('.admin-review-btn').forEach(btn => {
        btn.addEventListener('click', () => this._adminOpenReview(parseInt(btn.dataset.id), apps));
    });
};

AgroBusinessRevolution.prototype._adminOpenReview = function (id, apps) {
    const app = apps.find(a => a.id === id);
    if (!app) return;
    this._adminCurrentAppId = id;
    document.getElementById('admin-apps-screen').style.display = 'none';
    document.getElementById('admin-review-screen').style.display = '';
    document.getElementById('admin-notes-input').value = '';
    document.getElementById('admin-review-msg').style.display = 'none';

    document.getElementById('admin-review-detail').innerHTML = `
        <div class="admin-detail-card">
            <div class="admin-detail-row"><span>Reference</span><strong>${app.application_ref}</strong></div>
            <div class="admin-detail-row"><span>Name</span><strong>${app.full_name}</strong></div>
            <div class="admin-detail-row"><span>Type</span><strong style="text-transform:capitalize;">${app.user_type}</strong></div>
            <div class="admin-detail-row"><span>Phone</span><strong>${app.phone_number}</strong></div>
            <div class="admin-detail-row"><span>Email</span><strong>${app.email || '—'}</strong></div>
            <div class="admin-detail-row"><span>District</span><strong>${app.district_name || '—'}</strong></div>
            <div class="admin-detail-row"><span>Channel</span><strong>${app.channel}</strong></div>
            <div class="admin-detail-row"><span>Applied</span><strong>${new Date(app.created_at).toLocaleString('en-GB')}</strong></div>
        </div>
    `;

    const approveBtn = document.getElementById('admin-approve-btn');
    const denyBtn = document.getElementById('admin-deny-btn');
    // Remove old listeners by replacing elements
    const newApprove = approveBtn.cloneNode(true);
    const newDeny = denyBtn.cloneNode(true);
    approveBtn.parentNode.replaceChild(newApprove, approveBtn);
    denyBtn.parentNode.replaceChild(newDeny, denyBtn);

    newApprove.addEventListener('click', () => this._adminSubmitReview('approve'));
    newDeny.addEventListener('click', () => this._adminSubmitReview('deny'));
};

AgroBusinessRevolution.prototype._adminSubmitReview = function (action) {
    const notes = (document.getElementById('admin-notes-input').value || '').trim();
    const msgEl = document.getElementById('admin-review-msg');
    const base = (window.APP_CONFIG && window.APP_CONFIG.apiBase) ? window.APP_CONFIG.apiBase : 'api.php';

    msgEl.style.color = '#6b7280';
    msgEl.textContent = 'Submitting…';
    msgEl.style.display = '';

    fetch(base + '?action=admin_review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Admin-Token': this._adminToken
        },
        body: JSON.stringify({ application_id: this._adminCurrentAppId, action, notes })
    })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                msgEl.style.color = '#16a34a';
                const label = action === 'approve' ? 'Approved' : 'Denied';
                msgEl.textContent = `✓ ${label} successfully. Email sent to applicant.`;
                setTimeout(() => this._adminShowApps('pending'), 1800);
            } else {
                msgEl.style.color = '#dc2626';
                msgEl.textContent = 'Error: ' + (data.error || 'Failed to submit');
            }
        })
        .catch(() => { msgEl.style.color = '#dc2626'; msgEl.textContent = 'Network error.'; });
};

// Bind admin panel events after DOM ready
document.addEventListener('DOMContentLoaded', function () {
    if (window.app) window.app._adminBindEvents();
    else setTimeout(() => window.app && window.app._adminBindEvents(), 500);

    // Auto-open admin panel if URL contains ?admin
    if (new URLSearchParams(window.location.search).has('admin')) {
        setTimeout(() => window.app && window.app.openAdminPanel(), 600);
    }
});

// ─── END ADMIN PANEL MODULE ───────────────────────────────────────────────────
