import { createBrowserPlatform } from "./platform.js";
import { createRenderer } from "./renderer.js";

const status = document.querySelector("#runtime-status");
const graphicsStatus = document.querySelector("#graphics-status");
const inputStatus = document.querySelector("#input-status");
const canvas = document.querySelector("#game-canvas");

try {
  const platform = createBrowserPlatform({ canvas });
  const graphics = platform.graphics;

  if (!graphics) throw new Error("This browser does not provide WebGL2.");

  graphicsStatus.textContent = `Graphics: WebGL2 ready · ${graphics.renderer}`;
  graphics.resize();
  window.addEventListener("resize", graphics.resize, { passive: true });

  const input = platform.input;
  input.onChange((event) => {
    inputStatus.textContent = event.locked ? "Input: pointer locked" : "Input: ready";
  });

  // A rotating cube verifies the WebGL2 shader, buffer, depth, and frame-loop path.
  // It is deliberately labeled as a renderer test, not Minecraft gameplay.
  const renderer = createRenderer(graphics.gl);
  renderer.start();

  status.textContent = "Renderer test running · game engine pending";
  status.dataset.state = "ready";
  window.eaglercraftPlatform = platform;
  window.eaglercraftRendererTest = renderer;

  window.addEventListener("beforeunload", () => {
    renderer.dispose();
    input.dispose();
  }, { once: true });
} catch (error) {
  console.error("Browser platform initialization failed:", error);
  status.textContent = "Browser platform failed";
  status.dataset.state = "error";
  graphicsStatus.textContent = error.message;
}
