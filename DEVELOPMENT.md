# Development notes

## Active client integration

`web/index.html` embeds the published Treasure Client 1.2 WASM build:

- https://treasureclient.github.io/versions/1.12WASM.html

This is an upstream-hosted Eaglercraft **1.12.2** client. Its V1.2 release changelog advertises modern blocks/items, wind charges, maces, spears, copper items, updated textures and potion colors, spear jab/charge, and TuffX+ support. Server compatibility depends on the corresponding upstream/server implementation.

The launcher provides a fullscreen control and a direct upstream fallback link. The original UserArham Eaglercraft 1.12.2 Modded launcher is preserved as `web/legacy.html`.

## Upstream source

- Release: https://github.com/TreasureClient/treasureclient.github.io/releases/tag/V1.2
- Source: https://github.com/TreasureClient/Treasure-Client-1.12-src
- Source repository license: Apache-2.0 (review upstream notices for third-party components).

The compiled client is loaded from the publisher's GitHub Pages site in an iframe; this project does not rebuild or modify its engine.

## GitHub Pages

The existing `.github/workflows/pages.yml` workflow deploys the root redirect and `web/` directory. Preserve its `cancel-in-progress: false` concurrency setting.
