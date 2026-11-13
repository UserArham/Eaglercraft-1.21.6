# Development plan

## Repository structure (planned)

```text
.
├── docs/
│   ├── ARCHITECTURE.md
│   └── COMPATIBILITY.md
├── src/
│   ├── client/       # game/client logic
│   ├── platform/     # browser-specific APIs
│   └── wasm/         # generated or hand-written WASM integration
├── web/
│   ├── index.html    # browser entry point
│   └── assets/       # project-owned runtime assets only
├── tools/            # reproducible build scripts
├── DEVELOPMENT.md
├── LICENSE
└── README.md
```

This is a target layout, not a claim that these directories or components already exist.

## Baseline requirements

Before implementation begins, verify all of the following:

1. The source baseline actually targets Java Edition 1.21.6.
2. The source and every dependency can legally be used and redistributed in this project.
3. The selected compiler supports the language and runtime features used by the baseline.
4. The build can be reproduced from documented source inputs.
5. Browser APIs used by the client have explicit compatibility and fallback behavior.

## Browser runtime boundaries

Keep browser integration behind small platform interfaces:

- keyboard, mouse, touch, and pointer-lock input;
- WebGL rendering and context-loss recovery;
- audio output and user-gesture restrictions;
- persistent storage with quota/error handling;
- WebSocket networking;
- download/import handling for user-provided configuration.

Avoid assuming that desktop Java APIs are available in a browser. Any emulation or replacement must be explicit and tested.

## Build and release policy

- Never commit generated output as if it were a verified release.
- Record compiler versions, dependency versions, and source revisions.
- Keep third-party notices with the corresponding components.
- Test the built artifact in supported browsers before calling it playable.
- Do not claim 1.21.6 compatibility based only on a 1.21.1 client or protocol shim.

## Immediate blocker

A verified, legally usable 1.21.6-compatible client source baseline has not yet been added. Until that is identified, this repository is documentation-only.
