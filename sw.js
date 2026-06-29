// AgroBusiness Malawi — Service Worker
const CACHE = 'agrobiz-v1';
const PRECACHE = [
    '/agrobusinessmalawi/',
    '/agrobusinessmalawi/index.html',
    '/agrobusinessmalawi/assets/css/style.css',
    '/agrobusinessmalawi/assets/js/app.js',
    '/agrobusinessmalawi/assets/js/config.js',
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    // Network-first for API calls; cache-first for static assets
    if (e.request.url.includes('api.php') || e.request.url.includes('open-meteo.com')) {
        e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    } else {
        e.respondWith(
            caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
                if (res.ok) {
                    const clone = res.clone();
                    caches.open(CACHE).then(c => c.put(e.request, clone));
                }
                return res;
            }))
        );
    }
});
