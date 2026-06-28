// AgroBusiness Malawi - Revolutionary Final Version (COMPLETE)
class AgroBusinessRevolution {
        constructor() {
        // Load configuration
        this.config = window.AppConfig?.getApiConfig() || { 
            baseUrl: '/api.php',
            environment: 'production'
        };
        this.environment = this.config.environment;
        
        console.log(`🚀 Starting in ${this.environment} environment`);
        console.log(`🌐 API Base: ${this.config.baseUrl}`);
        
        
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
                basic_info: 'Basic Information',
                basic_info_desc: 'Essential farming knowledge',
                select_district: 'Select Your District',
                select_crop: 'Select Your Crop',
                loading: 'Loading...',
                no_data: 'No data available',
                error: 'An error occurred',
                search_districts: 'Search districts...',
        search_crops: 'Search crops...'
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
                basic_info: 'Zidziwitso Zoyambira',
                basic_info_desc: 'Zidziwitso zofunikira za ulimi',
                select_district: 'Sankhani Chigawo Chanu',
                select_crop: 'Sankhani Mbeu Yanu',
                loading: 'Kuyembekezera...',
                no_data: 'Palibe zidziwitso',
                error: 'Pali vuto',
                search_districts: 'Fufuzani maboma...',
        search_crops: 'Fufuzani mbeu...'
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
        console.log('🚀 Initializing AgroBusiness Revolution...');
        
        // Initialize loading animation with real data
        await this.initializeLoadingScreen();
        
        // Bind all events
        this.bindAllEvents();
        
        // Hide loading screen after data is loaded
        setTimeout(() => this.hideLoadingScreen(), 3000);
        
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
            
            console.log('✅ Loading screen initialized with real data');
        } catch (error) {
            console.log('⚠️ Loading screen fallback to default numbers');
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
            const activeModal = document.querySelector('.modal-revolution.active');
            if (activeModal) {
                this.closeModal(activeModal);
            }
        }
        
        // Tab key trapping in modals
        if (e.key === 'Tab') {
            const activeModal = document.querySelector('.modal-revolution.active');
            if (activeModal) {
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
        if (e.target.closest('.modal-revolution')) {
            return;
        }
        document.activeElement.setAttribute('data-last-focused', 'true');
    });
}
    bindLanguageSelection() {
        document.querySelectorAll('.language-card-modern').forEach(card => {
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
        console.log('📊 Initializing dashboard...');
        
        // Load and display real statistics
        await this.updateDashboardStats();
        
        // Show language switcher in header now that language is selected
        const langSwitcher = document.getElementById('lang-switcher');
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
            
            console.log(`📊 Updated stats: ${districts.length} districts, ${crops.length} crops`);
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
    document.querySelectorAll('.service-card-revolution').forEach(card => {
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
    const langSwitcher = document.getElementById('lang-switcher');

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
    const langSwitcher = document.getElementById('lang-switcher');
    const langDropdown = document.getElementById('lang-dropdown');
    const langCurrent = document.getElementById('current-lang-btn');
    
    if (langSwitcher && langDropdown && langCurrent) {
        const isActive = langSwitcher.classList.contains('active');
        
        if (isActive) {
            this.closeLanguageDropdown();
        } else {
            langSwitcher.classList.add('active');
            langDropdown.classList.add('active');
            langCurrent.setAttribute('aria-expanded', 'true');
            
            // Announce to screen readers
            this.announceToScreenReader('Language selector opened');
        }
    }
}

    closeLanguageDropdown() {
        const langSwitcher = document.getElementById('lang-switcher');
        const langDropdown = document.getElementById('lang-dropdown');
        
        if (langSwitcher && langDropdown) {
            langSwitcher.classList.remove('active');
            langDropdown.classList.remove('active');
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
}

    bindModalEvents() {
        document.querySelectorAll('.modal-close-revolution').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal-revolution');
                if (modal) this.closeModal(modal);
            });
        });

        document.querySelectorAll('.modal-revolution').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-backdrop-revolution')) {
                    this.closeModal(modal);
                }
            });
        });
    }

    bindSearchEvents() {
        const districtSearch = document.getElementById('district-search');
        const cropSearch = document.getElementById('crop-search');

        if (districtSearch) {
            districtSearch.addEventListener('input', (e) => {
                this.filterDistricts(e.target.value);
            });
        }

        if (cropSearch) {
            cropSearch.addEventListener('input', (e) => {
                this.filterCrops(e.target.value);
            });
        }
    }

    filterDistricts(searchTerm) {
        const items = document.querySelectorAll('.district-item-revolution');
        let visibleCount = 0;
        
        items.forEach((item, index) => {
            const name = item.querySelector('.district-name')?.textContent.toLowerCase() || '';
            const region = item.querySelector('.district-region')?.textContent.toLowerCase() || '';
            const matches = name.includes(searchTerm.toLowerCase()) || 
                          region.includes(searchTerm.toLowerCase());
            
            if (matches) {
                item.style.display = 'block';
                item.style.animation = `districtItemReveal 0.3s ease ${index * 0.05}s both`;
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Update search stats
        const searchStats = document.getElementById('search-stats');
        if (searchStats) {
            searchStats.textContent = `${visibleCount} districts found`;
        }
    }

    filterCrops(searchTerm) {
        const items = document.querySelectorAll('.crop-item-revolution');
        let visibleCount = 0;
        
        items.forEach((item, index) => {
            const name = item.querySelector('.crop-name')?.textContent.toLowerCase() || '';
            const category = item.querySelector('.crop-category')?.textContent.toLowerCase() || '';
            const matches = name.includes(searchTerm.toLowerCase()) || 
                          category.includes(searchTerm.toLowerCase());
            
            if (matches) {
                item.style.display = 'block';
                item.style.animation = `cropItemReveal 0.3s ease ${index * 0.05}s both`;
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Update search stats
        const cropSearchStats = document.getElementById('crop-search-stats');
        if (cropSearchStats) {
            cropSearchStats.textContent = `${visibleCount} crops found`;
        }
    }

    bindNavigation() {
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.navigateBack();
            });
        }

        // Share button
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareContent();
            });
        }
    }

    navigateBack() {
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                backBtn.style.transform = '';
                this.showScreen('dashboard');
            }, 150);
        }
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
                console.log('Share cancelled');
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href);
            this.showNotification('Link copied to clipboard!');
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
        switch(action) {
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
        switch(action) {
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
        const targetScreen  = document.getElementById(screenId);
        if (!targetScreen) return;

        if (currentActive && currentActive !== targetScreen) {
            currentActive.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            currentActive.style.transform  = 'translateX(-60px)';
            currentActive.style.opacity    = '0';

            this._screenTimer = setTimeout(() => {
                this._screenTimer = null;
                document.querySelectorAll('.screen').forEach(s => {
                    s.classList.remove('active');
                    s.style.transition = '';
                    s.style.transform  = '';
                    s.style.opacity    = '';
                    s.style.filter     = '';
                });
                targetScreen.classList.add('active');
                targetScreen.style.opacity   = '0';
                targetScreen.style.transform = 'translateX(30px)';
                requestAnimationFrame(() => {
                    targetScreen.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    targetScreen.style.transform  = '';
                    targetScreen.style.opacity    = '';
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

        switch(service) {
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
                    <button class="cta-button-revolution" onclick="app.showScreen('dashboard')" style="margin: 0 auto;">
                        <span class="cta-text">Back to Home</span>
                        <span class="cta-icon">🏠</span>
                    </button>
                </div>
            `;
        }
    }
    
    showNoData() {
        const area = document.getElementById('content-area');
        if (area) {
            area.innerHTML = `
                <div class="no-data" style="text-align: center; padding: 4rem 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📭</div>
                    <p style="font-size: 1.3rem; margin-bottom: 2rem; color: var(--text-secondary);">${this.texts[this.currentLang].no_data}</p>
                    <button class="cta-button-revolution" onclick="app.showScreen('dashboard')" style="margin: 0 auto;">
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
        
        this.showScreen('content');
        const title = document.getElementById('content-title');
        if (title) title.textContent = `${district.name} Services`;
        
        const area = document.getElementById('content-area');
        if (area) {
            area.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h2 style="margin-bottom: 2rem; color: var(--primary);">📍 ${district.name}</h2>
                    <p style="margin-bottom: 3rem; color: var(--text-secondary);">What would you like to know about ${district.name}?</p>
                    
                    <div class="services-grid-revolution" style="max-width: 800px; margin: 0 auto;">
                        <div class="service-card-revolution" onclick="app.loadWeather(${districtId})" style="cursor: pointer;">
                            <div class="service-icon-3d">🌤️</div>
                            <div class="service-content-modern">
                                <h3>Weather Forecast</h3>
                                <p>7-day weather predictions for ${district.name}</p>
                            </div>
                        </div>
                        
                        <div class="service-card-revolution" onclick="app.loadMarketInsights(${districtId})" style="cursor: pointer;">
                            <div class="service-icon-3d">📊</div>
                            <div class="service-content-modern">
                                <h3>Market Insights</h3>
                                <p>Local market information and trends</p>
                            </div>
                        </div>
                        
                        <div class="service-card-revolution" onclick="app.loadSellers(${districtId})" style="cursor: pointer;">
                            <div class="service-icon-3d">👨‍🌾</div>
                            <div class="service-content-modern">
                                <h3>Find Sellers</h3>
                                <p>Connect with suppliers in ${district.name}</p>
                            </div>
                        </div>
                        
                        <div class="service-card-revolution" onclick="app.loadBuyers(${districtId})" style="cursor: pointer;">
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
            
            this.showScreen('content');
            const title = document.getElementById('content-title');
            if (title) title.textContent = `${crop.name} Services`;
            
            const area = document.getElementById('content-area');
            if (area) {
                area.innerHTML = `
                    <div style="text-align: center; padding: 3rem;">
                        <h2 style="margin-bottom: 2rem; color: var(--primary);">${this.getCropIcon(crop.name)} ${crop.name}</h2>
                        <p style="margin-bottom: 3rem; color: var(--text-secondary);">What would you like to know about ${crop.name}?</p>
                        
                        <div class="services-grid-revolution" style="max-width: 800px; margin: 0 auto;">
                            <div class="service-card-revolution" onclick="app.showCropPrices('${crop.name}')" style="cursor: pointer;">
                                <div class="service-icon-3d">💰</div>
                                <div class="service-content-modern">
                                    <h3>Current Prices</h3>
                                    <p>Market prices for ${crop.name}</p>
                                </div>
                            </div>
                            
                            <div class="service-card-revolution" onclick="app.loadFarmingTips(${cropId})" style="cursor: pointer;">
                                <div class="service-icon-3d">🌾</div>
                                <div class="service-content-modern">
                                    <h3>Farming Tips</h3>
                                    <p>Best practices for ${crop.name}</p>
                                </div>
                            </div>
                            
                            <div class="service-card-revolution" onclick="app.showCropPestControl(${cropId})" style="cursor: pointer;">
                                <div class="service-icon-3d">🐛</div>
                                <div class="service-content-modern">
                                    <h3>Pest Control</h3>
                                    <p>Protect your ${crop.name} crops</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
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
            console.log('📍 Loading districts for selection:', districts.length);
            
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
            if (searchStats) searchStats.textContent = `${districts.length} districts available`;
            
            // Create revolutionary district grid
            list.innerHTML = districts.map((district, index) => {
                const coords = this.districtCoords[district.id];
                return `
                    <div class="district-item-revolution" data-id="${district.id}" style="--delay: ${index * 0.05}s">
                        <div class="district-icon">📍</div>
                        <div class="district-name">${district.name}</div>
                        <div class="district-region">${coords ? coords.region + ' Region' : 'Malawi'}</div>
                    </div>
                `;
            }).join('');
            
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

            // Add click handlers
            list.querySelectorAll('.district-item-revolution').forEach(item => {
                item.addEventListener('click', () => {
                    this.selectedDistrict = item.dataset.id;
                    console.log('📍 District selected:', this.selectedDistrict);
                    districtSelected = true;

                    item.style.background = 'var(--primary)';
                    item.style.color = 'white';
                    item.style.transform = 'scale(1.1)';
                    item.style.boxShadow = 'var(--shadow-glow)';

                    setTimeout(() => {
                        this.closeModal(modal);
                        if (callback) callback();
                    }, 300);
                });
            });

            this.openModal(modal);
        }).catch(error => {
            console.error('❌ District selection error:', error);
            this.showError('Failed to load districts');
        });
    }
    
    showCropSelection(callback) {
        this.loadCrops().then(crops => {
            console.log('🌾 Loading crops for selection:', crops.length);
            
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
            
            // Create revolutionary crop grid
            list.innerHTML = crops.map((crop, index) => {
                const category = this.getCropCategory(crop.name);
                return `
                    <div class="crop-item-revolution" data-id="${crop.id}" style="--delay: ${index * 0.05}s">
                        <div class="crop-emoji">${this.getCropIcon(crop.name)}</div>
                        <div class="crop-name">${crop.name}</div>
                        <div class="crop-category">${category}</div>
                    </div>
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
            list.querySelectorAll('.crop-item-revolution').forEach(item => {
                item.addEventListener('click', () => {
                    this.selectedCrop = item.dataset.id;
                    console.log('🌾 Crop selected:', this.selectedCrop);
                    cropSelected = true;

                    item.style.background = 'var(--success)';
                    item.style.color = 'white';
                    item.style.transform = 'scale(1.1)';
                    item.style.boxShadow = 'var(--shadow-glow)';

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
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Enhanced modal animation
        const content = modal.querySelector('.modal-content-revolution');
        if (content) {
            content.style.transform = 'scale(0.7) translateY(200px)';
            content.style.opacity = '0';
            
            requestAnimationFrame(() => {
                content.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                content.style.transform = 'scale(1) translateY(0)';
                content.style.opacity = '1';
            });
        }
        
        // Focus management
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
        
        // Announce to screen readers
        const modalTitle = modal.querySelector('h2')?.textContent || 'Modal';
        this.announceToScreenReader(`${modalTitle} opened`);
    }
}

// Update closeModal method
closeModal(modal) {
    if (modal) {
        const content = modal.querySelector('.modal-content-revolution');
        if (content) {
            content.style.transform = 'scale(0.8) translateY(-100px)';
            content.style.opacity = '0';
        }
        
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            modal.dispatchEvent(new Event('modalclosed'));

            const lastFocused = document.querySelector('[data-last-focused]');
            if (lastFocused) {
                lastFocused.focus();
                lastFocused.removeAttribute('data-last-focused');
            }
        }, 400);
    }
}

    // Test database connection with environment info
    async testConnection() {
        try {
            console.log('🔄 Testing connection in', this.environment, 'environment...');
            const response = await this.apiCall('api.php?action=test');
            
            if (response.success) {
                console.log('✅ Database connection successful:', response);
                this.showNotification(`Connected to ${this.environment} database!`, 'success');
            } else {
                console.error('❌ Database connection failed:', response);
                this.showNotification(`${this.environment} database connection failed`, 'error');
            }
        } catch (error) {
            console.error('❌ Connection test error:', error);
            // Show environment-specific help
            if (this.environment === 'local') {
                console.warn('💡 Local Development Tip: Ensure your IP is whitelisted in cPanel Remote MySQL');
            }
        }
    }


    // Enhanced Smart API Communication
    async apiCall(endpoint, params = {}) {
        try {
            let url;
            
            // Add environment parameter
            params.env = this.environment;
            
            // 1. External APIs (like Open-Meteo)
            if (endpoint.startsWith('http')) {
                url = new URL(endpoint);
            } 
            // 2. Use config baseUrl for our API
            else if (this.config.baseUrl) {
                const base = this.config.baseUrl;
                // If it's a full URL
                if (base.includes('http')) {
                    url = new URL(endpoint, base);
                } else {
                    // Relative path
                    url = new URL(endpoint, window.location.origin);
                    if (!endpoint.startsWith('/')) {
                        url = new URL(base + (base.endsWith('/') ? '' : '/') + endpoint, window.location.origin);
                    }
                }
            } 
            // 3. Fallback to relative path
            else {
                url = new URL(endpoint, window.location.origin);
            }
            
            // Add parameters
            Object.entries(params).forEach(([key, value]) => {
                if (value != null) url.searchParams.append(key, value);
            });
            
            console.log(`🌐 ${this.environment.toUpperCase()} API Call:`, url.toString());
            
            const response = await fetch(url);
            
            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") === -1) {
                    throw new Error(`Server returned HTML (${response.status})`);
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(`✅ ${this.environment.toUpperCase()} API Response:`, data);
            return data;
            
        } catch (error) {
            console.error(`❌ ${this.environment.toUpperCase()} API Error:`, error);
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
            
            console.log('🌤️ Fetching weather from Open-Meteo for:', coords.name);
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Open-Meteo API error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('🌤️ Open-Meteo data received:', data);
            
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
            const url = specificCrop
                ? `api.php?action=dual_crop_prices`
                : `api.php?action=dual_crop_prices`;
            const response = await this.apiCall(url);

            if (!response.success) {
                this.showError(response.error || 'Failed to load crop prices');
                return;
            }

            let admarc    = response.admarc    || [];
            let community = response.community || [];

            if (specificCrop) {
                const lc = specificCrop.toLowerCase();
                admarc    = admarc.filter(r => r.crop_name.toLowerCase().includes(lc));
                community = community.filter(r => r.crop_name.toLowerCase().includes(lc));
            }

            const fmt = n => n ? 'MK ' + parseFloat(n).toLocaleString() : 'N/A';
            const ago = dt => {
                const d = Math.floor((Date.now() - new Date(dt)) / 86400000);
                return d === 0 ? 'Today' : d === 1 ? 'Yesterday' : `${d}d ago`;
            };

            const admarRows = admarc.map((r, i) => `
                <tr style="animation:serviceReveal .3s ease ${i*.04}s both">
                    <td><span style="font-size:1.3rem">${this.getCropIcon(r.crop_name)}</span> <strong>${r.crop_name}</strong></td>
                    <td>${r.depot_name || '—'}</td>
                    <td><span class="price-badge">${fmt(r.buying_price)}</span></td>
                    <td><span class="price-badge price-high">${fmt(r.selling_price)}</span></td>
                    <td style="color:var(--text-muted);font-size:.8rem">${r.price_date ? new Date(r.price_date).toLocaleDateString() : '—'}</td>
                </tr>`).join('') || `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:2rem">No ADMARC data yet</td></tr>`;

            const commRows = community.map((r, i) => `
                <tr style="animation:serviceReveal .3s ease ${i*.04}s both">
                    <td><span style="font-size:1.3rem">${this.getCropIcon(r.crop_name)}</span> <strong>${r.crop_name}</strong></td>
                    <td>${r.district_name || '—'}</td>
                    <td>${r.market_name || '—'}</td>
                    <td><span class="price-badge">${fmt(r.min_price)}</span></td>
                    <td><span class="price-badge price-high">${fmt(r.avg_price)}</span></td>
                    <td><span class="price-badge" style="background:rgba(200,164,90,.12);color:var(--accent)">${fmt(r.max_price)}</span></td>
                    <td style="color:var(--text-muted);font-size:.8rem">${r.report_count} report${r.report_count>1?'s':''}<br>${ago(r.last_reported)}</td>
                </tr>`).join('') || `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem">No community reports yet — be the first!</td></tr>`;

            const area = document.getElementById('content-area');
            area.innerHTML = `
                <h2 style="font-family:'DM Serif Display',serif;margin-bottom:1.5rem;color:var(--text-primary)">Crop Prices</h2>

                <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:1.5rem">
                    <button class="price-tab active" id="tab-admarc" onclick="app._priceTab('admarc')">ADMARC Official</button>
                    <button class="price-tab" id="tab-community" onclick="app._priceTab('community')">Community Reports <span style="background:var(--accent);color:#fff;border-radius:20px;padding:.1rem .5rem;font-size:.75rem;margin-left:.3rem">${community.length}</span></button>
                    <button class="price-tab" id="tab-report" onclick="app._priceTab('report')" style="margin-left:auto;background:var(--primary);color:#fff;border-color:var(--primary)">+ Report a Price</button>
                </div>

                <!-- ADMARC Tab -->
                <div id="pane-admarc" class="price-pane">
                    <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:1rem">Official buying &amp; selling prices from ADMARC depots across Malawi. Updated daily when ADMARC publishes new data.</p>
                    <div style="overflow-x:auto">
                    <table class="data-table">
                        <thead><tr>
                            <th>Crop</th><th>Depot</th><th>ADMARC Buys (MWK)</th><th>ADMARC Sells (MWK)</th><th>Date</th>
                        </tr></thead>
                        <tbody>${admarRows}</tbody>
                    </table>
                    </div>
                    <p style="margin-top:1rem;font-size:.8rem;color:var(--text-muted)">Source: ADMARC Malawi. Prices in MWK per kg.</p>
                </div>

                <!-- Community Tab -->
                <div id="pane-community" class="price-pane" style="display:none">
                    <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:1rem">Prices reported by farmers and traders at local markets in the last 30 days. Compare with ADMARC to spot the best deal.</p>
                    <div style="overflow-x:auto">
                    <table class="data-table">
                        <thead><tr>
                            <th>Crop</th><th>District</th><th>Market</th><th>Min (MWK)</th><th>Avg (MWK)</th><th>Max (MWK)</th><th>Reports</th>
                        </tr></thead>
                        <tbody>${commRows}</tbody>
                    </table>
                    </div>
                </div>

                <!-- Report Tab -->
                <div id="pane-report" class="price-pane" style="display:none">
                    <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:1.5rem">Seen a price at your local market? Report it to help other farmers make better decisions.</p>
                    <form id="price-report-form" style="max-width:480px;display:flex;flex-direction:column;gap:1rem">
                        <div class="reg-field">
                            <label>Crop *</label>
                            <select id="pr-crop" required>
                                <option value="">Select crop...</option>
                                ${[...new Set([...admarc.map(r=>({id:r.crop_id,name:r.crop_name})),...community.map(r=>({id:r.crop_id,name:r.crop_name}))])
                                    .reduce((acc,c)=>{if(!acc.find(x=>x.id===c.id))acc.push(c);return acc;},[])
                                    .sort((a,b)=>a.name.localeCompare(b.name))
                                    .map(c=>`<option value="${c.id}">${c.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="reg-field">
                            <label>Price per kg (MWK) *</label>
                            <input type="number" id="pr-price" min="1" max="99999" step="1" placeholder="e.g. 250" required>
                        </div>
                        <div class="reg-field">
                            <label>Market / Location</label>
                            <input type="text" id="pr-market" placeholder="e.g. Limbe Market (optional)">
                        </div>
                        <div class="reg-field">
                            <label>Your Phone (optional)</label>
                            <input type="tel" id="pr-phone" placeholder="+265...">
                        </div>
                        <button type="submit" class="cta-button-revolution" style="align-self:flex-start">Submit Price Report</button>
                        <p id="pr-msg" style="display:none;padding:.75rem 1rem;border-radius:8px;font-weight:600"></p>
                    </form>
                </div>
            `;

            // Tab switching
            area.querySelector('#price-report-form').addEventListener('submit', async e => {
                e.preventDefault();
                const btn = e.target.querySelector('button[type=submit]');
                btn.disabled = true; btn.textContent = 'Submitting...';
                const msg = document.getElementById('pr-msg');
                try {
                    const res = await this.apiCall('api.php?action=submit_price', {
                        method: 'POST',
                        body: JSON.stringify({
                            crop_id:    +document.getElementById('pr-crop').value,
                            price_per_kg: +document.getElementById('pr-price').value,
                            market_name: document.getElementById('pr-market').value.trim(),
                            phone:       document.getElementById('pr-phone').value.trim() || 'web-anonymous',
                            channel:     'web',
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
                } catch(err) {
                    msg.style.display='block'; msg.style.color='#b94040'; msg.textContent='Network error.';
                } finally { btn.disabled=false; btn.textContent='Submit Price Report'; }
            });

        } catch (error) {
            console.error('Error loading crop prices:', error);
            this.showError('Failed to load crop prices');
        }
    }

    _priceTab(tab) {
        ['admarc','community','report'].forEach(t => {
            document.getElementById('pane-'+t).style.display = t===tab ? 'block' : 'none';
            document.getElementById('tab-'+t).classList.toggle('active', t===tab);
        });
    }

    showCropDetails(cropName) {
        const area = document.getElementById('content-area');
        if (area) {
            area.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h2 style="margin-bottom: 2rem; color: var(--primary);">${this.getCropIcon(cropName)} ${cropName} Details</h2>
                    <p style="margin-bottom: 3rem; color: var(--text-secondary);">Learn more about ${cropName}</p>
                    
                    <div class="services-grid-revolution" style="max-width: 800px; margin: 0 auto;">
                        <div class="service-card-revolution" onclick="app.loadCropPrices('${cropName}')" style="cursor: pointer;">
                            <div class="service-icon-3d">💰</div>
                            <div class="service-content-modern">
                                <h3>Price History</h3>
                                <p>Historical pricing for ${cropName}</p>
                            </div>
                        </div>
                        
                        <div class="service-card-revolution" onclick="app.getCropFarmingTips('${cropName}')" style="cursor: pointer;">
                            <div class="service-icon-3d">🌾</div>
                            <div class="service-content-modern">
                                <h3>Growing Guide</h3>
                                <p>Best practices for ${cropName}</p>
                            </div>
                        </div>
                        
                        <div class="service-card-revolution" onclick="app.getCropMarkets('${cropName}')" style="cursor: pointer;">
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
            console.log('🌤️ Loading weather for district:', districtId);
            
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
    
    async loadSellers(districtId, specificCrop = null) {
        try {
            let endpoint = `api.php?action=sellers&district_id=${districtId}`;
            if (specificCrop) {
                endpoint += `&crop=${encodeURIComponent(specificCrop)}`;
            }
            
            const response = await this.apiCall(endpoint);
            
            if (!response.success) {
                this.showError(response.error || 'Failed to load sellers');
                return;
            }
            
            const sellers = response.data || [];
            
            if (sellers.length === 0) {
                this.showNoData();
                return;
            }
            
            const html = `
                <h2 style="margin-bottom: 2rem; color: var(--primary);">👨‍🌾 ${this.texts[this.currentLang].find_sellers}${specificCrop ? ` - ${specificCrop}` : ''}</h2>
                <div class="sellers-grid" style="display: grid; gap: 1.5rem;">
                    ${sellers.map((seller, index) => `
                        <div class="contact-card" style="background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: 2rem; display: flex; align-items: center; gap: 2rem; transition: var(--transition-normal); animation: serviceReveal 0.4s ease ${index * 0.1}s both; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'; this.style.borderColor='var(--primary)'" onmouseout="this.style.transform=''; this.style.boxShadow=''; this.style.borderColor='var(--gray-200)'">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: var(--gradient-accent);"></div>
                            <div class="contact-icon" style="font-size: 4rem; width: 80px; height: 80px; background: var(--gradient-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; position: relative; overflow: hidden;">
                                👨‍🌾
                                <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); animation: iconShine 3s ease-in-out infinite;"></div>
                            </div>
                            <div class="contact-info" style="flex: 1;">
                                <h4 style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">${seller.name}</h4>
                                <p class="location" style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                                    <span style="font-size: 1.2rem;">📍</span>
                                    ${seller.district_name}
                                </p>
                                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                                    <a href="tel:${seller.phone_number}" class="contact-phone" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--primary-glow); color: var(--primary); text-decoration: none; border-radius: var(--radius-md); font-weight: 500; transition: var(--transition-fast);" onmouseover="this.style.background='var(--primary)'; this.style.color='white'" onmouseout="this.style.background='var(--primary-glow)'; this.style.color='var(--primary)'">
                                        <span style="font-size: 1rem;">📞</span>
                                        ${seller.phone_number}
                                    </a>
                                    ${seller.email ? `
                                        <a href="mailto:${seller.email}" class="contact-email" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--accent-glow); color: var(--accent); text-decoration: none; border-radius: var(--radius-md); font-weight: 500; transition: var(--transition-fast);" onmouseover="this.style.background='var(--accent)'; this.style.color='white'" onmouseout="this.style.background='var(--accent-glow)'; this.style.color='var(--accent)'">
                                            <span style="font-size: 1rem;">✉️</span>
                                            Email
                                        </a>
                                    ` : ''}
                                </div>
                                ${seller.crops_display ? `
                                    <div class="crops-info" style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); margin-top: 1rem; padding: 0.75rem 1rem; background: var(--gray-50); border-radius: var(--radius-md);">
                                        <span style="font-size: 1.2rem;">🌾</span>
                                        <span><strong>Crops:</strong> ${seller.crops_display}</span>
                                    </div>
                                ` : ''}
                                ${seller.rating ? `
                                    <div class="rating" style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.75rem;">
                                        <span class="stars" style="color: #fbbf24;">${'⭐'.repeat(Math.floor(seller.rating))}</span>
                                        <span class="rating-value" style="color: var(--text-secondary); font-size: 0.9rem;">${seller.rating}/5 rating</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            document.getElementById('content-area').innerHTML = html;
            
        } catch (error) {
            console.error('❌ Error loading sellers:', error);
            this.showError('Failed to load sellers');
        }
    }
    
    async loadBuyers(districtId) {
        try {
            const response = await this.apiCall('api.php?action=buyers&district_id=' + districtId);
            
            if (!response.success) {
                this.showError(response.error || 'Failed to load buyers');
                return;
            }
            
            const buyers = response.data || [];
            
            if (buyers.length === 0) {
                this.showNoData();
                return;
            }
            
            const html = `
                <h2 style="margin-bottom: 2rem; color: var(--primary);">🏢 ${this.texts[this.currentLang].find_buyers}</h2>
                <div class="buyers-grid" style="display: grid; gap: 1.5rem;">
                    ${buyers.map((buyer, index) => `
                        <div class="contact-card" style="background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: 2rem; display: flex; align-items: center; gap: 2rem; transition: var(--transition-normal); animation: serviceReveal 0.4s ease ${index * 0.1}s both; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'; this.style.borderColor='var(--primary)'" onmouseout="this.style.transform=''; this.style.boxShadow=''; this.style.borderColor='var(--gray-200)'">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: var(--gradient-cool);"></div>
                            <div class="contact-icon" style="font-size: 4rem; width: 80px; height: 80px; background: var(--gradient-cool); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; position: relative; overflow: hidden;">
                                🏢
                                <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); animation: iconShine 3s ease-in-out infinite;"></div>
                            </div>
                            <div class="contact-info" style="flex: 1;">
                                <h4 style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">${buyer.name}</h4>
                                <p class="location" style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                                    <span style="font-size: 1.2rem;">📍</span>
                                    ${buyer.district_name}
                                </p>
                                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                                    <a href="tel:${buyer.phone_number}" class="contact-phone" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(6, 182, 212, 0.1); color: #0891b2; text-decoration: none; border-radius: var(--radius-md); font-weight: 500; transition: var(--transition-fast);" onmouseover="this.style.background='#0891b2'; this.style.color='white'" onmouseout="this.style.background='rgba(6, 182, 212, 0.1)'; this.style.color='#0891b2'">
                                        <span style="font-size: 1rem;">📞</span>
                                        ${buyer.phone_number}
                                    </a>
                                    ${buyer.email ? `
                                        <a href="mailto:${buyer.email}" class="contact-email" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--accent-glow); color: var(--accent); text-decoration: none; border-radius: var(--radius-md); font-weight: 500; transition: var(--transition-fast);" onmouseover="this.style.background='var(--accent)'; this.style.color='white'" onmouseout="this.style.background='var(--accent-glow)'; this.style.color='var(--accent)'">
                                            <span style="font-size: 1rem;">✉️</span>
                                            Email
                                        </a>
                                    ` : ''}
                                </div>
                                ${buyer.crops_display ? `
                                    <div class="crops-info" style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); margin-top: 1rem; padding: 0.75rem 1rem; background: var(--gray-50); border-radius: var(--radius-md);">
                                        <span style="font-size: 1.2rem;">🛒</span>
                                        <span><strong>Buying:</strong> ${buyer.crops_display}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            document.getElementById('content-area').innerHTML = html;
            
        } catch (error) {
            console.error('❌ Error loading buyers:', error);
            this.showError('Failed to load buyers');
        }
    }
    
    async loadPestControl(cropId, districtId) {
        try {
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
            
            const html = `
                <h2 style="margin-bottom: 2rem; color: var(--primary);">🐛 ${this.texts[this.currentLang].pest_control}</h2>
                <div class="tips-grid" style="display: grid; gap: 1.5rem;">
                    ${tips.map((tip, index) => `
                        <div class="tip-card" style="background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: 2rem; position: relative; overflow: hidden; animation: serviceReveal 0.4s ease ${index * 0.1}s both;">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: var(--gradient-warm);"></div>
                            <div class="card-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                                <h3 style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-primary);">
                                    <span style="font-size: 2rem;">🐛</span>
                                    ${tip.crop_name} - ${tip.district_name}
                                </h3>
                                <span class="tip-badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; padding: 0.25rem 0.75rem; border-radius: var(--radius-md); font-size: 0.75rem; font-weight: 600; text-transform: uppercase;">Prevention</span>
                            </div>
                            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1rem;">${tip[`tip_${this.currentLang}`] || tip.tip_en}</p>
                        </div>
                    `).join('')}
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
            
            const html = `
                <h2 style="margin-bottom: 2rem; color: var(--primary);">🌾 ${this.texts[this.currentLang].farming_tips}</h2>
                <div class="tips-grid" style="display: grid; gap: 1.5rem;">
                    ${tips.map((tip, index) => `
                        <div class="tip-card" style="background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: 2rem; position: relative; overflow: hidden; animation: serviceReveal 0.4s ease ${index * 0.1}s both;">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: var(--gradient-primary);"></div>
                            <div class="card-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                                <h3 style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-primary);">
                                    <span style="font-size: 2rem;">🌾</span>
                                    ${tip.crop_name}
                                </h3>
                                <span class="practice-badge" style="background: var(--primary-glow); color: var(--primary); padding: 0.25rem 0.75rem; border-radius: var(--radius-md); font-size: 0.75rem; font-weight: 600; text-transform: uppercase;">${tip.practice_type}</span>
                            </div>
                            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1rem;">${tip[`practice_${this.currentLang}`] || tip.practice_en}</p>
                        </div>
                    `).join('')}
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
            
            const html = `
                <h2 style="margin-bottom: 2rem; color: var(--primary);">📚 ${this.texts[this.currentLang].basic_info}</h2>
                <div class="info-grid" style="display: grid; gap: 1.5rem;">
                    ${info.map((item, index) => `
                        <div class="info-card" style="background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: 2rem; position: relative; overflow: hidden; animation: serviceReveal 0.4s ease ${index * 0.1}s both;">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: var(--gradient-secondary);"></div>
                            <div class="card-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                                <h3 style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-primary);">
                                    <span style="font-size: 2rem;">📚</span>
                                    ${item.topic}
                                </h3>
                                <span class="info-badge" style="background: rgba(59, 130, 246, 0.1); color: var(--accent); padding: 0.25rem 0.75rem; border-radius: var(--radius-md); font-size: 0.75rem; font-weight: 600; text-transform: uppercase;">Essential</span>
                            </div>
                            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1rem;">${item[`info_${this.currentLang}`] || item.info_en}</p>
                        </div>
                    `).join('')}
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

// Initialize the revolutionary app
const app = new AgroBusinessRevolution();

// ─── REGISTRATION / KYC MODULE ────────────────────────────────────────────────

AgroBusinessRevolution.prototype.openRegistrationModal = function() {
    const modal = document.getElementById('register-modal');
    if (!modal) return;
    this._regState = { step: 1, userType: null, selectedCrops: [] };
    this._regGotoStep(1);
    this._regLoadDistricts();
    this._regLoadCrops();
    this.openModal(modal);
};

AgroBusinessRevolution.prototype._regGotoStep = function(step) {
    const state = this._regState;
    state.step = step;

    // Hide all step contents
    document.querySelectorAll('.reg-step-content').forEach(el => el.style.display = 'none');
    const target = document.getElementById(`reg-step-${step}`);
    if (target) target.style.display = '';

    // Update step indicators
    document.querySelectorAll('#reg-steps .reg-step').forEach(el => {
        const s = parseInt(el.dataset.step);
        el.classList.toggle('reg-step-active', s === step);
        el.classList.toggle('reg-step-done', s < step);
    });

    // Build review on step 4
    if (step === 4) this._regBuildReview();
};

AgroBusinessRevolution.prototype._regLoadDistricts = function() {
    const sel = document.getElementById('reg-district');
    if (!sel || sel.options.length > 1) return;
    fetch(`${this.config.baseUrl}?action=districts`)
        .then(r => r.json())
        .then(data => {
            if (!data.success) return;
            data.data.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.id;
                opt.textContent = d.name;
                sel.appendChild(opt);
            });
        });
};

AgroBusinessRevolution.prototype._regLoadCrops = function() {
    const grid = document.getElementById('reg-crops-grid');
    if (!grid || grid.children.length > 0) return;
    fetch(`${this.config.baseUrl}?action=crops`)
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
        });
};

AgroBusinessRevolution.prototype._regBuildReview = function() {
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
        <strong>Village:</strong> ${document.getElementById('reg-village').value || '—'}<br>
        <strong>Crops:</strong> ${selectedCrops}<br>
        ${s.userType !== 'farmer' ? `<strong>Business:</strong> ${document.getElementById('reg-business-name').value || '—'}<br>` : ''}
    `;
};

// Wire up registration modal events once DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Close button
    const closeBtn = document.getElementById('register-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const modal = document.getElementById('register-modal');
            if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
        });
    }

    // User type selection (step 1)
    document.querySelectorAll('.reg-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.reg-type-btn').forEach(b => b.classList.remove('selected'));
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
            const name  = document.getElementById('reg-full-name').value.trim();
            const phone = document.getElementById('reg-phone').value.trim();
            if (!name || name.length < 2) { alert('Please enter your full name.'); return; }
            if (!phone || !/\+?[\d\s\-]{8,20}/.test(phone)) { alert('Please enter a valid phone number.'); return; }
            if (window.app) window.app._regGotoStep(3);
        });
    }

    // Step 3 → 4
    const step3Next = document.getElementById('reg-step3-next');
    if (step3Next) {
        step3Next.addEventListener('click', () => {
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
                user_type:         state.userType,
                full_name:         document.getElementById('reg-full-name').value.trim(),
                phone_number:      document.getElementById('reg-phone').value.trim(),
                email:             document.getElementById('reg-email').value.trim(),
                national_id:       document.getElementById('reg-national-id').value.trim(),
                district_id:       districtId ? parseInt(districtId) : null,
                village:           document.getElementById('reg-village').value.trim(),
                crops_of_interest: selectedCrops,
                business_name:     document.getElementById('reg-business-name').value.trim(),
                channel:           'web'
            };

            try {
                const res = await fetch(`${window.app.config.baseUrl}?action=submit_application`, {
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
                    document.querySelectorAll('#reg-steps .reg-step').forEach(el => {
                        el.classList.remove('reg-step-active');
                        el.classList.add('reg-step-done');
                    });
                } else {
                    alert('Error: ' + (data.error || 'Submission failed. Please try again.'));
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Application ✓';
                }
            } catch (err) {
                alert('Network error. Please check your connection and try again.');
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
            if (regModal) { regModal.classList.remove('active'); document.body.style.overflow = ''; }
            const statusModal = document.getElementById('status-modal');
            if (statusModal) { statusModal.classList.add('active'); document.body.style.overflow = 'hidden'; }
        });
    }

    // Status modal close
    const statusCloseBtn = document.getElementById('status-modal-close');
    if (statusCloseBtn) {
        statusCloseBtn.addEventListener('click', () => {
            const modal = document.getElementById('status-modal');
            if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
        });
    }

    // Status check
    const statusCheckBtn = document.getElementById('status-check-btn');
    if (statusCheckBtn) {
        statusCheckBtn.addEventListener('click', async () => {
            const ref = document.getElementById('status-ref-input').value.trim().toUpperCase();
            if (!ref) { alert('Please enter your reference number.'); return; }
            statusCheckBtn.textContent = 'Checking…';
            statusCheckBtn.disabled = true;
            const result = document.getElementById('status-result');

            try {
                const res = await fetch(`${window.app.config.baseUrl}?action=check_application&ref=${encodeURIComponent(ref)}`);
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

    // Close modals on backdrop click
    ['register-modal', 'status-modal'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.addEventListener('click', e => {
                if (e.target === modal || e.target.classList.contains('modal-backdrop-revolution')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
});

// ─── END REGISTRATION MODULE ──────────────────────────────────────────────────

console.log('🎉 AgroBusiness Revolution initialized successfully!');
console.log('🚀 Features: Open-Meteo Weather API, Revolutionary UI, Smart Language Switching, Mobile-First Design');
console.log('📱 Ready for all devices and browsers!');
