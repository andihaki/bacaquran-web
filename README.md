# Baca Quran

An offline-first SvelteKit foundation for a digital Quran reader.

## Start

```sh
pnpm install
pnpm dev
```

## Offline architecture

- `static/sw.js` caches the application shell and all visited same-origin pages/assets.
- Put a versioned Quran JSON dataset in `static/data/` and pre-cache it in `APP_SHELL` when content is ready for production.
- Bump `CACHE_NAME` whenever app-shell or bundled Quran data changes.
