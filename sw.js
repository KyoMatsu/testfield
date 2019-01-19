var CACHE_NAME  = "testfield-cache-v1";
var urlsToCache = [
    "index.html",
    "img/orgimg.jpg",
    "img/cacheimg.jpg"
];

self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
   caches.open('testfield-cache-v1').then(function(cache) { return cache.addAll(urlsToCache); })
  );
});

self.addEventListener('activate', event => {
  console.log('Now ready to handle fetches!');
});

self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  console.log(event.request.url);
  
  if (url.origin == location.origin && url.pathname == '/testfield/img/orgimg.jpg') {
    event.respondWith(caches.match('img/cacheimg.jpg'));
  }
});
