importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/service-worker.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
	{ url: '/team.html', revision: '1' },
	{ url: '/pages/myfav.html', revision: '1' },
    { url: '/pages/mysub.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
	{ url: '/js/materialize.min.js', revision: '1' },
	{ url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/sw.js', revision: '1' },
	{ url: '/js/swteam.js', revision: '1' },
	{ url: '/js/navi.js', revision: '1' },
    { url: '/img/icon.png', revision: '1' },
    { url: '/img/icon_a.png', revision: '1' },
    { url: '/img/icon_b.png', revision: '1' },
]);

workbox.routing.registerRoute(
	new RegExp('/pages/'),
	  workbox.strategies.staleWhileRevalidate({
		  cacheName: 'pages'
	  })
);

workbox.routing.registerRoute(
	new RegExp('/js/'),
	  workbox.strategies.staleWhileRevalidate({
		  cacheName: 'js'
	  })
);

workbox.routing.registerRoute(
	new RegExp('/css/'),
	  workbox.strategies.staleWhileRevalidate({
		  cacheName: 'css'
	  })
);

workbox.routing.registerRoute(
	new RegExp('/img/'),
	  workbox.strategies.staleWhileRevalidate({
		  cacheName: 'img'
	  })
);

const CACHE_NAME = "sepak-la-bola";
var urlsToCache = [
	"/",
	"/service-worker.js",
	"/manifest.json",
	"/index.html",
	"/nav.html",
	"/team.html",
	"/pages/myfav.html",
	"/pages/mysub.html",
	"/pages/home.html",
	"/css/materialize.min.css",
	"/js/materialize.min.js",
	"/js/api.js",
	"/js/db.js",
	"/js/idb.js",
	"/js/sw.js",
	"/js/swteam.js",
	"/js/navi.js",
	"/img/icon.png",
	"/img/icon_a.png",
	"/img/icon_b.png"
];

self.addEventListener("install", function(event){
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(caches){
			return caches.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", function(event){
	var base_url = "https://api.football-data.org/v2/competitions/2014/";
	var base_url_team = "https://api.football-data.org/v2/teams/";

	if (event.request.url.indexOf(base_url) > -1) {	
		event.respondWith(
			caches.open(CACHE_NAME).then(function(cache) {
				return fetch(event.request).then(function(response) {
					cache.put(event.request.url, response.clone());
					return response;
				})
			})
		);
	} else if (event.request.url.indexOf(base_url_team) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(function(cache) {
				return fetch(event.request).then(function(response) {
					cache.put(event.request.url, response.clone());
					return response;
				})
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request, {ignoreSearch: true}).then(function(response) {
				return response || fetch(event.request);
			})
		)
	}
});

self.addEventListener("activate", function(event){
	event.waitUntil(
		caches.keys().then(function(cacheName){
			return Promise.all(
				cacheName.map(function(cacheName){
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache "+cacheName+" dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener("push", function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push no payload'
    }

    var options = {
        body: body,
        vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push Notif Here ', options)
    );
});