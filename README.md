# Eaglercraft browser client — 1.12.2 Modded

This project launches the real Eaglercraft 1.12.2 Modded client from [UserArham/Eaglercraft-1.12.2-Modded](https://github.com/UserArham/Eaglercraft-1.12.2-Modded).

## ViaVersion / ViaBlocks scope

The intended addition is **only the ViaVersion-style modern-content functionality**: ViaBlocks, ViaItems, and the required client-side compatibility pieces. This project is not intended to rebrand or replace its base client with Treasure Client.

[ Treasure Client V1.2 ](https://github.com/TreasureClient/treasureclient.github.io/releases/tag/V1.2) and its [source repository](https://github.com/TreasureClient/Treasure-Client-1.12-src) are reference material for studying that implementation. No Treasure Client launcher or full Treasure Client build is embedded here.

**Status:** the original Eaglercraft launcher is restored. The ViaBlocks implementation has not yet been ported into the UserArham client engine. The current UserArham/Eaglercraft-1.12.2-Modded repository exposes a compiled client bundle and assets, not the Java source tree needed to merge the feature properly. Therefore modern blocks/items and TuffX+ support are not claimed as implemented by this repository yet.

## Current runtime

- Actual compiled Eaglercraft client: `classes.js`
- Matching assets: `assets.epk`
- Browser-local single-player world storage
- Configured multiplayer server entries
- Fullscreen control and optional texture-pack links

The optional texture packs are visual-only; they do not implement ViaBlocks or modern gameplay.

## GitHub Pages

In **Settings → Pages**, choose **GitHub Actions** as the deployment source. The existing workflow publishes the static `web/` directory. Keep its concurrency setting `cancel-in-progress: false`.

Expected URL: https://userarham.github.io/Eaglercraft-1.21.6/

## Licensing

The original client and assets remain hosted in their existing source repository. Review that repository's license and notices for upstream components. This repository's license applies only to original project material it is authorized to license.
