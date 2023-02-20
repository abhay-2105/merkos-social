'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "ca62b05c278829b9a97562b60c3871a1",
"assets/assets/fonts/DMSans-Regular.ttf": "7c217bc9433889f55c38ca9d058514d3",
"assets/assets/fonts/Garamond%2520Premier%2520Pro.ttf": "0fa6b9ca228092dc8bee96117364f40c",
"assets/assets/fonts/Inter-Regular.ttf": "079af0e2936ccb99b391ddc0bbb73dcb",
"assets/assets/fonts/Inter-SemiBold.ttf": "07a48beb92b401297a76ff9f6aedd0ed",
"assets/assets/fonts/ProximaNova-Black.otf": "f401366193520cdf512c7ade98260e27",
"assets/assets/fonts/ProximaNova-Bold.otf": "62d4d7d369292a9bf23762465ec6d704",
"assets/assets/fonts/ProximaNova-Regular.otf": "410504d49238e955ba7dc23a7f963021",
"assets/assets/fonts/ProximaNova-Thin.otf": "8f0bc01ce5e5becef482d277cb72b728",
"assets/assets/fonts/SnellBT-Regular.otf": "f530bd45bfc8de20e0377d00ddd371ff",
"assets/assets/icons/avatar-boy.png": "4ea8bb13747b40a9142ee20322cfba3c",
"assets/assets/icons/avatar-girl.png": "6d3f8745c40f532a330e48d2c97bb34d",
"assets/assets/icons/avatar.png": "af25490494d3338afef00869c59fdd37",
"assets/assets/icons/connect.png": "0efa46aa570e63f791e17e58d5f10178",
"assets/assets/icons/cteen.png": "7d21d18f0514d146b0b2bbea45639ceb",
"assets/assets/icons/explore.png": "2a252c862cd6c41b377c38baeaedd063",
"assets/assets/icons/hbrew_school.png": "fb32f40a8cda0d979d6c5fa6851001fa",
"assets/assets/icons/icon-ran.png": "5d8ac56f79346edb1275b290b5ffd9a7",
"assets/assets/icons/jnet.png": "5d3e371d63f9e05c7f41de02ba144c03",
"assets/assets/icons/kids.png": "4b36ce264ae479755264e457c6bdff66",
"assets/assets/icons/meet_at_chabad.png": "2cbce58cf7ab4f29cce3238607fc1109",
"assets/assets/images/ckids.png": "47e789f84d49320a89883d5616feba4b",
"assets/assets/images/cKids.svg": "4bf7f14bd909d2324330bcecbd586c89",
"assets/assets/images/coffee.png": "4390eb42e9aca2268d8fa3157acbd0f0",
"assets/assets/images/cTeen.svg": "d83b01c2a3d02d5b848dacf0a4ea6f52",
"assets/assets/images/eventsJpg.jpg": "bb7cc855cb8beb559e130b559ffa8794",
"assets/assets/images/hebrewSchool.svg": "5754511989e3e3deadef3d4a15ec7339",
"assets/assets/images/highlightsJpg.jpg": "c5a969d944a56b67471fb11b7817835d",
"assets/assets/images/jnet.svg": "e132be6a48180188c6154a8d8057861d",
"assets/assets/images/logo.png": "997ebb8a426ad2046834e2c5a089424e",
"assets/assets/images/metAtChabad.svg": "7c6b99f1af59c34d1dd856311b036967",
"assets/assets/images/profileSvg.svg": "74b136f8fa2d2f1a595c9f524e4476eb",
"assets/assets/images/theShluchimExchangeJpg.jpg": "91d3762b746dfbe91d6fcba7f3890630",
"assets/assets/images/theShluchimExchangeSvg.svg": "be560e4de7b610aa1ba39394227e7666",
"assets/FontManifest.json": "b28b02ba96109c761ab8a84cf1d787e8",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "f66808947e23516612612891bef67b82",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "40830b9c360dbd74a7364e1c020115dd",
"/": "40830b9c360dbd74a7364e1c020115dd",
"main.dart.js": "a6abd8e87ddce9615262dd41429401f5",
"manifest.json": "e3653540279937c106d10c2f3fa0b1ba",
"version.json": "d60e1836b216c13e4298b7f58996b8fe"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
