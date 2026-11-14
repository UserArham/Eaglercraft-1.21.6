# Eaglercraft browser client — 1.12.2 Modded

This GitHub Pages project now launches the **real Eaglercraft 1.12.2 Modded client** from [UserArham/Eaglercraft-1.12.2-Modded](https://github.com/UserArham/Eaglercraft-1.12.2-Modded). It is not a Minecraft 1.21.6 client. The earlier 1.21.6 label was a target that this source does not satisfy.

## What runs

- The actual compiled Eaglercraft client bundle: `classes.js`.
- The matching game asset package: `assets.epk`.
- The source client's configured multiplayer entries.
- Browser-local single-player world storage via IndexedDB.
- A fullscreen control and links to optional texture-pack archives.

The game engine and asset package are loaded from the source repository's `main` branch using raw GitHub URLs. The source repository must remain available, and GitHub's raw content host must be reachable from the browser.

## Modern-looking textures and ViaVersion

The page provides optional downloads for the source repository's `1-21-textures-for-1-12.zip` and `26-1-textures-for-1-12.zip` archives. Download a pack and try it through the in-game **Options → Resource Packs** screen. Texture packs can change appearances only; they do not add modern item IDs, recipes, blocks, entities, or mechanics. The packs are supplied as-is, and compatibility with this exact client build has not been independently verified.

ViaVersion is server-side protocol translation. It is not a client mod or item pack, and placing a ViaVersion jar in this static GitHub Pages site would not enable it. Connecting this Eaglercraft client to modern Java servers requires a compatible Eaglercraft-to-Java protocol bridge plus appropriate server-side translation (for older-client-to-newer-server support, a server setup may also need ViaBackwards). No such bridge or ViaVersion server has been configured by this repository.

## GitHub Pages

In **Settings → Pages**, choose **GitHub Actions** as the deployment source. The existing workflow publishes the static `web/` directory. The Pages workflow has been left unchanged.

Expected URL: https://userarham.github.io/Eaglercraft-1.21.6/

## Attribution and licensing

The client bundle, asset package, and optional texture archives are loaded from [UserArham/Eaglercraft-1.12.2-Modded](https://github.com/UserArham/Eaglercraft-1.12.2-Modded). Review that repository's license and notices for the upstream components. The Apache-2.0 license in this repository applies only to original project material that contributors are authorized to license; it does not grant rights to Minecraft proprietary content or trademarks.
