'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "139f6dbb580976d729305f1796d06520",
"assets/AssetManifest.bin.json": "0327e1f39eb779b9248a4d1ab555dfe6",
"assets/AssetManifest.json": "3e7d386d652d300099b15b7ca4dcf963",
"assets/assets/fonts/Tajawal-Regular.ttf": "e3fe295c55a0cb720f766bccc5eecf63",
"assets/assets/images/app_development.jpg": "a7af6e2ee9c4b66e0cc277d0cc03ea89",
"assets/assets/images/document_download.png": "526776364e4a10755686b9c303c80bfc",
"assets/assets/images/esimly.jpg": "8c1085cbbb07f59b650b9170f38bcdb7",
"assets/assets/images/facebook.png": "ceda85dc6354796fd08c69a2032d2b29",
"assets/assets/images/flutter_bg.jpg": "1f6390b24b8a1b302b072a634e66f9cc",
"assets/assets/images/flutter_bg.png": "4e8cf971a8927ad4ba7874f33e5698a4",
"assets/assets/images/flutter_ic.png": "f24e9946283ba3a9b47bee779c475d1e",
"assets/assets/images/github.png": "2fc8f09378b548f2dfcd750252e5d1ec",
"assets/assets/images/gmail.png": "6c9baa013f158d3e9fc323ecd7afad9b",
"assets/assets/images/idbook.jpg": "9b9060853d9555ae7ee6d381dc1c95a7",
"assets/assets/images/idbook_promoter.jpg": "f3dea66738bf1f982b30c25c13e27520",
"assets/assets/images/idb_management.png": "12ad9466b7699b570bc03bda8b2275e7",
"assets/assets/images/java_ic.png": "b2047d4dfd818f05485411f88418e910",
"assets/assets/images/java_script_ic.png": "dc14a6a05fd36812c9bb49ad0b98715e",
"assets/assets/images/jena.jpg": "f79a672b8826a51ab2b86513d45b0298",
"assets/assets/images/Lines.jpg": "9dea65c38db0c25639b4aca240db7f4c",
"assets/assets/images/linkedin.png": "d2b6c44104204eb1644c41e0382b9656",
"assets/assets/images/pattern.jpg": "b3992879b377c633fdb34fd6fe395f5a",
"assets/assets/images/pbs_ic.png": "dd6fd765bafce63a1baeb9929b74d96d",
"assets/assets/images/team_management.png": "88c5a10a6ab5f68052c086c37c0b63c6",
"assets/assets/images/whatsapp.png": "148776e80e8b8dd1c29b06559ae77fc8",
"assets/assets/images/youshaa_fanous.png": "d3279647db04c14fb52162540127a192",
"assets/assets/images/youshaa_logo.png": "751272729859fb3595109e86d00004d9",
"assets/FontManifest.json": "c7a94d599ad1dce98f88d3a2a15a06c7",
"assets/fonts/MaterialIcons-Regular.otf": "37bd250c2491539f7efbc3df90009b41",
"assets/NOTICES": "364c46cbf06a18dbfc204ff59297104a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"favicon.png": "4c4a6a293a34e42d726b10737f534d1d",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "b588084c31435f328b85dafabe52b024",
"icons/Icon-192.png": "c640a018d52704bd78925fe4f3e9fcc0",
"icons/Icon-512.png": "0c83136fc0243e576d2eab3b25bb73c7",
"icons/Icon-maskable-192.png": "c640a018d52704bd78925fe4f3e9fcc0",
"icons/Icon-maskable-512.png": "0c83136fc0243e576d2eab3b25bb73c7",
"index.html": "8cb3a2b8ed3f4179e9dc4d881f5ebc97",
"/": "8cb3a2b8ed3f4179e9dc4d881f5ebc97",
"main.dart.js": "4819291d2173aa425c3b384fa8505ff2",
"manifest.json": "c7d2688ec71d7ba37c17b1dd8deeb806",
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
