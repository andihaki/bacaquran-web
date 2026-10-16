/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { base, build, files, prerendered, version } from "$service-worker";

const CACHE = `baca-quran-${version}`;

// build:       hashed JS/CSS from _app/immutable
// files:       everything in static/ (icons, manifest, ...)
// prerendered: prerendered HTML pages and data
// All of these already include the /quran base path.
const PRECACHE = [...build, ...files, ...prerendered];
const PRECACHED = new Set(PRECACHE);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname !== base && !url.pathname.startsWith(base + "/")) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);

      // Precached assets: cache first (they're versioned, so safe)
      if (PRECACHED.has(url.pathname)) {
        const cached = await cache.match(url.pathname);
        if (cached) return cached;
      }

      // Everything else: network first, fall back to cache when offline
      try {
        const response = await fetch(request);
        if (response.status === 200) {
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        const cached = await cache.match(request);
        if (cached) return cached;

        // Offline navigation to an unvisited page: serve the app root
        if (request.mode === "navigate") {
          const shell = await cache.match(`${base}/`);
          if (shell) return shell;
        }
        return Response.error();
      }
    })(),
  );
});
