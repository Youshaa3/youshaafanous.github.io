'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "be850f22f3c40d5f7da355007a79bfe0",
"assets/AssetManifest.bin.json": "478da7b35f090f5b98f0e211277827a9",
"assets/AssetManifest.json": "ebd9a34e63e1705aa97af923beb1c167",
"assets/assets/fonts/Tajawal-Regular.ttf": "e3fe295c55a0cb720f766bccc5eecf63",
"assets/assets/images/app_development.jpg": "a7af6e2ee9c4b66e0cc277d0cc03ea89",
"assets/assets/images/document_download.png": "526776364e4a10755686b9c303c80bfc",
"assets/assets/images/facebook.png": "ceda85dc6354796fd08c69a2032d2b29",
"assets/assets/images/flutter_bg.jpg": "1f6390b24b8a1b302b072a634e66f9cc",
"assets/assets/images/flutter_bg.png": "4e8cf971a8927ad4ba7874f33e5698a4",
"assets/assets/images/flutter_ic.png": "f24e9946283ba3a9b47bee779c475d1e",
"assets/assets/images/github.png": "2fc8f09378b548f2dfcd750252e5d1ec",
"assets/assets/images/gmail.png": "6c9baa013f158d3e9fc323ecd7afad9b",
"assets/assets/images/java_ic.png": "b2047d4dfd818f05485411f88418e910",
"assets/assets/images/java_script_ic.png": "dc14a6a05fd36812c9bb49ad0b98715e",
"assets/assets/images/Lines.jpg": "9dea65c38db0c25639b4aca240db7f4c",
"assets/assets/images/linkedin.png": "d2b6c44104204eb1644c41e0382b9656",
"assets/assets/images/pattern.jpg": "b3992879b377c633fdb34fd6fe395f5a",
"assets/assets/images/pbs_ic.png": "dd6fd765bafce63a1baeb9929b74d96d",
"assets/assets/images/whatsapp.png": "148776e80e8b8dd1c29b06559ae77fc8",
"assets/assets/images/youshaa_fanous.png": "d3279647db04c14fb52162540127a192",
"assets/assets/images/youshaa_logo.png": "751272729859fb3595109e86d00004d9",
"assets/FontManifest.json": "c8e70e47b7e476264c1fcd87bc39a743",
"assets/fonts/MaterialIcons-Regular.otf": "37bd250c2491539f7efbc3df90009b41",
"assets/NOTICES": "aeb97c99cdc5b7ab584c655c13cc37f3",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "6cfe36b4647fbfa15683e09e7dd366bc",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "ba4a8ae1a65ff3ad81c6818fd47e348b",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "4c4a6a293a34e42d726b10737f534d1d",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "0600d0f1a2bd0603855b5b1688a146c5",
"icons/Icon-192.png": "c640a018d52704bd78925fe4f3e9fcc0",
"icons/Icon-512.png": "0c83136fc0243e576d2eab3b25bb73c7",
"icons/Icon-maskable-192.png": "c640a018d52704bd78925fe4f3e9fcc0",
"icons/Icon-maskable-512.png": "0c83136fc0243e576d2eab3b25bb73c7",
"index.html": "a63c191a0fbe3da70d195379b709cee1",
"/": "a63c191a0fbe3da70d195379b709cee1",
"main.dart.js": "0cdc2317f4f244f88bc1c05057857ce6",
"manifest.json": "7dc2102cc472b77ab8b716b297f3f3e9",
"version.json": "79fc05bd0692ed746050979566db5bcc"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
