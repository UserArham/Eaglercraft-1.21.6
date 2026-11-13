# Eaglercraft 1.21.6

A browser-based client project targeting Minecraft Java Edition 1.21.6.

> **Development status: bootstrap only.** This repository does not contain a playable client yet. It currently contains project documentation and the repository license. Do not advertise it as a working 1.21.6 build until the game engine has been ported, compiled, and tested.

## Goals

- Target Java Edition 1.21.6 protocol and gameplay behavior.
- Run in a modern web browser without requiring a local Java installation.
- Use a reproducible Java-to-WebAssembly/JavaScript toolchain.
- Keep the browser runtime, rendering, input, networking, and game logic clearly separated.
- Preserve attribution and license notices for every third-party component.

## Current state

- [x] Dedicated repository created.
- [x] Apache-2.0 repository license present.
- [ ] Identify and verify a legally usable 1.21.6-compatible source baseline.
- [ ] Establish the Java 21 / TeaVM toolchain and reproducible build.
- [ ] Port or implement the client runtime.
- [ ] Implement browser input, rendering, audio, storage, and networking.
- [ ] Test single-player and multiplayer behavior.
- [ ] Publish a build only after successful compatibility and browser testing.

## Important licensing note

The Apache-2.0 license in this repository applies only to original project material that its contributors are authorized to license. It does not grant rights to Minecraft's proprietary code, assets, trademarks, or other third-party material. Any imported component must be reviewed under its own license and attribution requirements. Do not add proprietary game assets or source code unless their use and redistribution are authorized.

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md) for the initial architecture and build plan.

There is intentionally no fake launcher or placeholder claiming to run Minecraft. A playable build will be added when the actual 1.21.6 engine and browser runtime are available.
