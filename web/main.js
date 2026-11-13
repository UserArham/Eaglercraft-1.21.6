import { createBrowserPlatform } from "./platform.js";
import { createRenderer } from "./renderer.js";
import { CLIENT_CONFIG } from "./config.js";
import { getBrowserDiagnostics } from "./diagnostics.js";
import { loadEngine } from "./engine-loader.js";

const status = document.querySelector("#runtime-status");
const graphicsStatus = document.querySelector("#graphics-status");
const inputStatus = document.querySelector("#input-status");
const diagnosticsList = document.querySelector("#diagnostics-list");
const canvas = document.querySelector("#game-canvas");

function renderDiagnostics() {
  const checks = getBrowserDiagnostics();
  const labels = [
    ["WebGL 2", checks.webgl2],
    ["WebAssembly", checks.webAssembly],
    ["WebSocket", checks.webSocket],
    ["Pointer Lock", checks.pointerLock],
    ["Web Audio", checks.audio],
    ["Secure context", checks.secureContext]
  ];
  diagnosticsList.replaceChildren(...labels.map(([label, supported]) => {
    const item = document.createElement("li");
    item.textContent = `${label}: ${supported ? "Available" : "Unavailable"}`;
    item.dataset.ok = String(supported);
    return item;
  }));
}

try {
  renderDiagnostics();
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

  // Renderer smoke test only; no Minecraft world or game logic is present.
  const renderer = createRenderer(graphics.gl);
  renderer.start();

  const engine = await loadEngine({
    modulePath: CLIENT_CONFIG.engineModule,
    platform,
    canvas,
    config: CLIENT_CONFIG
  });

  status.textContent = engine.loaded
    ? "Browser platform ready · game engine loaded"
    : "Renderer test running · game engine pending";
  status.dataset.state = "ready";
  window.eaglercraftPlatform = platform;
  window.eaglercraftRendererTest = renderer;
  window.eaglercraftEngine = engine;

  window.addEventListener("beforeunload", () => {
    renderer.dispose();
    input.dispose();
    if (engine.loaded) engine.client.dispose();
  }, { once: true });
} catch (error) {
  console.error("Client initialization failed:", error);
  status.textContent = "Client initialization failed";
  status.dataset.state = "error";
  graphicsStatus.textContent = error.message;
}
