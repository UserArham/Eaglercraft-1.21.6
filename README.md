# Eaglercraft browser client — Treasure Client 1.2

The GitHub Pages launcher now opens **Treasure Client 1.2**, an Eaglercraft **1.12.2** client whose release changelog lists its ViaVersion-style modern-content integration.

## Play

GitHub Pages: https://userarham.github.io/Eaglercraft-1.21.6/

The launcher embeds the published WASM build at:

- https://treasureclient.github.io/versions/1.12WASM.html

The original UserArham Eaglercraft 1.12.2 Modded launcher is preserved at [web/legacy.html](web/legacy.html).

## Treasure Client 1.2 features

The upstream 1.2 changelog describes:
- Modern blocks and items on supported newer servers
- Modern items including wind charges, maces, spears and copper items
- Updated block/item textures and potion colors
- Spear jab and charge behavior
- TuffX+ modern block and mob compatibility

These are upstream release claims; this repository embeds the published build and does not independently certify compatibility with every server. Server-side support may be required.

## Upstream source and attribution

- Client/release: [TreasureClient/treasureclient.github.io](https://github.com/TreasureClient/treasureclient.github.io)
- Source: [TreasureClient/Treasure-Client-1.12-src](https://github.com/TreasureClient/Treasure-Client-1.12-src)
- Release: [Treasure Client V1.2](https://github.com/TreasureClient/treasureclient.github.io/releases/tag/V1.2)

The source repository declares Apache License 2.0. The client is hosted by its upstream publisher and loaded in an iframe; this project does not copy or relicense its compiled client. See upstream notices for third-party components and Minecraft-related rights.

## GitHub Pages

In **Settings → Pages**, choose **GitHub Actions** as the deployment source. The existing workflow publishes the static `web/` directory. Its concurrency setting remains unchanged (`cancel-in-progress: false`).

## Version note

This is Eaglercraft **1.12.2**, not Minecraft 1.21.6. The repository name is retained, but the launched game's actual version is shown accurately.
