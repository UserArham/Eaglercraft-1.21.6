# Development guide

## Current repository layout

```text
.
├── .github/workflows/pages.yml  # static Pages deployment
├── web/
│   ├── index.html               # browser UI
│   ├── main.js                  # startup and diagnostics
│   ├── config.js                # public client configuration
│   ├── diagnostics.js           # browser feature checks
│   ├── engine-loader.js         # future engine integration boundary
│   ├── platform.js              # browser API adapters
│   ├── renderer.js              # WebGL2 smoke-test renderer
│   └── style.css
├── index.html                   # Pages root entry point
├── .nojekyll
├── DEVELOPMENT.md
├── LICENSE
└── README.md
```

## GitHub Pages deployment

1. Open repository **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Push changes to `main`, or manually run the **Deploy GitHub Pages** workflow under Actions.
4. Check the workflow run before expecting the site to be updated.

The workflow copies only the static root entry point and `web/` assets into the Pages artifact. No Node.js, backend server, or Java installation is required to host this static development page.

## Browser platform services

`web/platform.js` provides:
- WebGL2 context creation and canvas resizing;
- keyboard state and pointer-lock tracking;
- namespaced local storage with error handling;
- validated WebSocket URL creation;
- Web Audio context initialization after a user gesture.

`web/diagnostics.js` reports browser capabilities. `web/renderer.js` is a minimal rotating-cube test for the graphics pipeline, not a Minecraft renderer.

## Engine integration contract

The engine loader expects a same-origin ES module whose exports include:

```js
export async function createClient({ platform, canvas, config }) {
  return {
    start() {},
    stop() {},
    dispose() {}
  };
}
```

Do not configure `engineModule` in `web/config.js` until a real, verified Minecraft 1.21.6 client implementation exists and has been built for the browser. The current value is intentionally `null`.

## Requirements before a real game port

1. Verify that the source baseline genuinely targets Java Edition 1.21.6.
2. Verify redistribution rights for the source, dependencies, assets, and build outputs.
3. Select and pin a compatible Java-to-WebAssembly/JavaScript compiler and toolchain.
4. Replace unsupported desktop APIs with documented browser platform implementations.
5. Validate the protocol, asset pipeline, rendering, input, audio, storage, and multiplayer behavior.
6. Run browser compatibility tests before publishing a playable release.

A 1.21.1 client with its version string changed is not a 1.21.6 port. Do not label a build playable until the actual game engine is integrated and tested.
