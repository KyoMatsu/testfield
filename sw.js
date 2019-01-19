var CACHE_NAME  = "testfield-cache-v2";
var urlsToCache = [
    "/testfield/",
    "/testfield/index.html",
    "/testfield/img/orgimg.jpg",
    "/testfield/img/cacheimg.jpg",
    "/testfield/app.js"
];

self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
   caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(urlsToCache); })
  );
});

self.addEventListener('activate', event => {
  console.log('Now ready to handle fetches!');
  caches.keys().then(function(cache) {
      cache.map(function(name) {
        if(CACHE_NAME !== name) caches.delete(name);
      })
  })
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
        if(res) return res;
        return fetch(event.request);
    })
  );
});
