# Eaglercraft 1.21.6

A browser-based client project targeting Minecraft Java Edition 1.21.6.

> **Status: early development / not playable.** The repository contains a static browser platform layer, WebGL2 renderer smoke test, browser diagnostics, and a Pages deployment workflow. It does not yet contain Minecraft game code, a 1.21.6 protocol implementation, or a playable client.

## Current implementation

- [x] Dedicated repository and Apache-2.0 license file.
- [x] Static browser entry page and root redirect for GitHub Pages.
- [x] WebGL2 context initialization, shader compilation, buffers, depth testing, and animation loop smoke test.
- [x] Browser adapters for keyboard input, pointer lock, local storage, WebSocket creation, and Web Audio.
- [x] Browser capability diagnostics and explicit engine-module loading boundary.
- [x] GitHub Actions workflow to publish the static site to GitHub Pages.
- [ ] Identify and verify a legally usable 1.21.6-compatible game source baseline.
- [ ] Establish a reproducible Java 21 / TeaVM build pipeline.
- [ ] Integrate actual Minecraft client code and browser-compatible replacements.
- [ ] Implement and test 1.21.6 networking, assets, rendering, audio, and gameplay.
- [ ] Publish a playable build only after compatibility testing.

## GitHub Pages

In repository **Settings → Pages**, set the build and deployment source to **GitHub Actions**. The workflow in `.github/workflows/pages.yml` publishes the root page and the `web/` directory on pushes to `main`.

Expected site URL: https://userarham.github.io/Eaglercraft-1.21.6/

## What the current page does

The page displays a rotating test cube when WebGL2 is available and lists browser capability checks. The cube verifies the graphics pipeline only; it is not Minecraft gameplay. Keyboard and pointer-lock events, storage, networking, and audio are exposed as browser platform services for a future engine.

For local testing, serve the repository root using any static HTTP server and open `/` (or `/web/`). ES modules should not be tested through `file://`.

## Licensing

The Apache-2.0 license in this repository applies only to original project material that contributors are authorized to license. It does not grant rights to Minecraft's proprietary code, assets, or trademarks. Every imported component must be reviewed under its own license and attribution requirements. Do not add proprietary game assets or source code unless their use and redistribution are authorized.

See [DEVELOPMENT.md](DEVELOPMENT.md) for architecture and build requirements.
