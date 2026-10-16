# Baca Quran

An offline-first SvelteKit foundation for a digital Quran reader.

## Start

```sh
pnpm install
pnpm dev
```

## Deploy to Cloudflare Workers

```sh
pnpm install
pnpm run deploy:cloudflare
```

Requires Node.js 22.12 or newer. Authenticate with Cloudflare first using
`pnpm exec wrangler login`. `pnpm run deploy:cloudflare` builds the app with
the Cloudflare adapter and deploys it with Wrangler. Run
`pnpm run preview-wrangler` to test the production build locally.

If deploying via Cloudflare Pages / CI, ensure the build command is set to
`pnpm run deploy:cloudflare` (or `pnpm run deploy`) — do NOT use the plain
`pnpm deploy` command. pnpm has a built-in `deploy` command for workspaces and
running `pnpm deploy` (without `run`) can cause the error:

  ERROR  packages field missing or empty

which comes from pnpm expecting a workspace `packages` configuration. Using
`pnpm run deploy:cloudflare` will invoke the package script instead of pnpm's
builtin command.

## Offline architecture

- `static/sw.js` caches the application shell and all visited same-origin pages/assets.
- Put a versioned Quran JSON dataset in `static/data/` and pre-cache it in `APP_SHELL` when content is ready for production.
- Bump `CACHE_NAME` whenever app-shell or bundled Quran data changes.
