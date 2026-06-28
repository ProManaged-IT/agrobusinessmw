// config.js - Environment Configuration
// config.js - Updated with localStorage support
const AppConfig = {
    // Detect environment
    getEnvironment() {
        // Check localStorage first (for manual override)
        const savedEnv = localStorage.getItem('agrobusiness_environment');
        if (savedEnv) return savedEnv;
        
        // Auto-detect based on hostname
        const hostname = window.location.hostname;
        
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'local';
        } else if (hostname.includes('test.') || hostname.includes('staging.')) {
            return 'staging';
        } else if (hostname.includes('agrobusinessmw.com')) {
            return 'production';
        }
        return 'production'; // default
    },
    
    // API Configuration for each environment
    api: {
        local: {
            baseUrl: 'http://localhost:8080/api.php', // Local development
            host: 'YOUR_SERVER_IP', // Replace with your server IP
            environment: 'local'
        },
        staging: {
            baseUrl: 'https://test.agrobusinessmw.com/api.php', // If you have staging
            host: 'localhost',
            environment: 'staging'
        },
        production: {
            baseUrl: 'https://agrobusinessmw.com/agrobusinessmw/api.php',
            host: 'localhost',
            environment: 'production'
        }
    },
    
    // Get current API config
    getApiConfig() {
        const env = this.getEnvironment();
        return this.api[env] || this.api.production;
    },
    
    // Feature flags
    features: {
        debugMode: true, // Enable console logs
        analytics: true,
        serviceWorker: false // Disable SW for now
    }
};

// Add to global scope for easy access
window.AppConfig = AppConfig;