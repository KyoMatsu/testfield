self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
   caches.open('hogehoge-cache-v1').then(cache => cache.add('/img/cacheimg.jpg'))
  );
});

self.addEventListener('activate', event => {
  console.log('Now ready to handle fetches!');
});

self.addEventListener('fetch', function(event) {
  const ul = new URL(event.request.url);
  console.log(event.request.url);
  
  if (url.origin == location.origin && url.pathname == '/img/orgimg.jpg') {
    event.respondWith(caches.match('/img/cacheimg.jpg'));
  }
});
