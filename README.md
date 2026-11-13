# Eaglercraft 1.21.6

A browser-based client project targeting Minecraft Java Edition 1.21.6.

> **Status: early development / not playable.** The repository now contains a browser platform layer and a WebGL2 renderer smoke test. It does not yet contain Minecraft game code, a 1.21.6 protocol implementation, or a playable client.

## Current implementation

- [x] Dedicated repository and Apache-2.0 license file.
- [x] Browser entry page in `web/index.html`.
- [x] WebGL2 context initialization and responsive canvas sizing.
- [x] WebGL2 shader compilation, vertex buffers, depth testing, and animation loop smoke test (`web/renderer.js`).
- [x] Browser platform adapters for keyboard input, pointer lock, local storage, WebSocket creation, and Web Audio (`web/platform.js`).
- [ ] Identify and verify a legally usable 1.21.6-compatible game source baseline.
- [ ] Establish a reproducible Java 21 / TeaVM build pipeline.
- [ ] Integrate actual Minecraft client code and required browser-compatible replacements.
- [ ] Implement and test 1.21.6 networking, assets, rendering, audio, and gameplay.
- [ ] Publish a playable build only after compatibility testing.

## Run the renderer smoke test

Serve the repository's `web/` directory from a local HTTP server and open `web/index.html` through that server. ES modules generally should not be tested by opening the file directly with `file://`.

The page displays a rotating test cube when WebGL2 is available. The cube is only a graphics-pipeline test; it is not Minecraft gameplay.

## Licensing

The Apache-2.0 license in this repository applies only to original project material that contributors are authorized to license. It does not grant rights to Minecraft's proprietary code, assets, or trademarks. Every imported component must be reviewed under its own license and attribution requirements. Do not add proprietary game assets or source code unless their use and redistribution are authorized.

See [DEVELOPMENT.md](DEVELOPMENT.md) for architecture and build requirements.
