var CACHE_NAME  = "testfield-cache-v1";
var urlsToCache = [
    "https://kyomatsu.github.io/testfield/",
    "https://kyomatsu.github.io/testfield/index.html",
    "img/cacheimg.jpg"
];

self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
   caches.open('hogehoge-cache-v1').then(function(cache) { return cache.addAll(urlsToCache); })
  );
});

self.addEventListener('activate', event => {
  console.log('Now ready to handle fetches!');
});

self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  console.log(event.request.url);
  
  if (url.origin == location.origin && url.pathname == '/img/orgimg.jpg') {
    event.respondWith(caches.match('/img/cacheimg.jpg'));
  }
});
