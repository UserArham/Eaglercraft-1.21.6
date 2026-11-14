# Development notes

## Current client integration

`web/index.html` launches the real Eaglercraft 1.12.2 Modded browser client from the separate source repository:

- Engine script: `https://raw.githubusercontent.com/UserArham/Eaglercraft-1.12.2-Modded/main/classes.js`
- Asset package: `https://raw.githubusercontent.com/UserArham/Eaglercraft-1.12.2-Modded/main/assets.epk`

The launch page configures the source client's `window.eaglercraftXOpts` and invokes its `main()` entry point after page load. The game engine is not a locally built Minecraft 1.21.6 port. The legacy WebGL2 renderer and browser platform modules remain in the repository but are not used as a substitute for the real game.

## Updating the source client

If the source repository changes its default branch, file names, client startup options, or asset-loading requirements, update the two raw URLs and the `eaglercraftXOpts` object in `web/index.html`. Keep the engine script and asset package from the same compatible source revision.

## Texture packs

The page links to the source repository's 1.21 and 26.1 texture archives. They are optional downloads, not automatically applied. Check the pack in the in-game resource-pack selector; visual packs do not implement newer game mechanics or item behavior.

## ViaVersion / modern servers

ViaVersion runs on a Java server or proxy. It cannot be installed into a static Pages site and does not independently add modern items to an old client. An Eaglercraft client needs a compatible protocol gateway/bridge to communicate with Java servers, with server-side version translation configured for the intended client/server direction. This project does not currently include or claim such a gateway.

## GitHub Pages

The existing `.github/workflows/pages.yml` workflow deploys the root redirect and `web/` directory. Its concurrency setting is intentionally preserved with `cancel-in-progress: false`.
