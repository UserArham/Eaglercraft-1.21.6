# Development notes

## Base client

The active launcher loads the actual Eaglercraft 1.12.2 Modded runtime from:

- Engine: https://raw.githubusercontent.com/UserArham/Eaglercraft-1.12.2-Modded/main/classes.js
- Assets: https://raw.githubusercontent.com/UserArham/Eaglercraft-1.12.2-Modded/main/assets.epk

The launch page configures `window.eaglercraftXOpts` and invokes the real client's `main()` entry point.

## ViaBlocks port — pending

Requested scope is limited to the ViaVersion-style modern-content features (ViaBlocks, ViaItems and associated compatibility code). Treasure Client V1.2 is a reference implementation only:

- Release: https://github.com/TreasureClient/treasureclient.github.io/releases/tag/V1.2
- Source: https://github.com/TreasureClient/Treasure-Client-1.12-src

Do not replace the UserArham client with the Treasure Client build or copy its launcher/branding. Port only the required engine-side ViaBlocks-related source and assets, with attribution and license notices as required.

The current `UserArham/Eaglercraft-1.12.2-Modded` repo contains the compiled `classes.js` and `assets.epk`, but does not expose the editable Java source tree. A proper engine-level port cannot be completed against the compiled bundle alone. Until the editable source is available and the port is compiled/tested, do not claim modern blocks/items or TuffX+ compatibility are implemented.

## GitHub Pages

The existing `.github/workflows/pages.yml` deploys the static `web/` directory. Preserve `cancel-in-progress: false`.
