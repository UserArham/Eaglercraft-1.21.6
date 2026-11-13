import { createBrowserPlatform } from "./platform.js";

const status = document.querySelector("#runtime-status");
const graphicsStatus = document.querySelector("#graphics-status");
const inputStatus = document.querySelector("#input-status");
const canvas = document.querySelector("#game-canvas");

try {
  const platform = createBrowserPlatform({ canvas });
  const graphics = platform.graphics;

  if (graphics) {
    graphicsStatus.textContent = `Graphics: WebGL2 ready · ${graphics.renderer}`;
    graphics.resize();
    window.addEventListener("resize", graphics.resize, { passive: true });
  } else {
    graphicsStatus.textContent = "Graphics: WebGL2 unavailable";
  }

  const input = platform.input;
  input.onChange((event) => {
    inputStatus.textContent = event.locked ? "Input: pointer locked" : "Input: ready";
  });

  status.textContent = "Browser platform ready";
  status.dataset.state = "ready";

  // The engine integration will consume this platform object.
  // No game loop is started until a real 1.21.6 engine is connected.
  window.eaglercraftPlatform = platform;
} catch (error) {
  console.error("Browser platform initialization failed:", error);
  status.textContent = "Browser platform failed";
  status.dataset.state = "error";
}
