const CACHE_NAME = "baca-quran-v2"; // bump so old caches are deleted
const SCOPE = self.registration.scope; // e.g. https://kodebaik.com/quran/
const APP_SHELL = [SCOPE, new URL("manifest.webmanifest", SCOPE).href];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches
      .match(event.request)
      .then((cached) => {
        const network = fetch(event.request).then((response) => {
          if (
            response.ok &&
            new URL(event.request.url).origin === self.location.origin
          ) {
            // Clone before returning the response: the browser can begin consuming
            // the original response as soon as it is returned from respondWith.
            const responseForCache = response.clone();
            event.waitUntil(
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseForCache)),
            );
          }
          return response;
        });
        return cached || network;
      })
      .catch(() => caches.match("/")),
  );
});
