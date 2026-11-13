import { createBrowserPlatform } from "./platform.js";
import { createRenderer } from "./renderer.js";
import { CLIENT_CONFIG } from "./config.js";
import { getBrowserDiagnostics } from "./diagnostics.js";
import { loadEngine } from "./engine-loader.js";

const status = document.querySelector("#runtime-status");
const graphicsStatus = document.querySelector("#graphics-status");
const inputStatus = document.querySelector("#input-status");
const diagnosticsList = document.querySelector("#diagnostics-list");
const diagnosticsSummary = document.querySelector("#diagnostics-summary");
const diagnosticsToggle = document.querySelector("#diagnostics-toggle");
const diagnosticsContent = document.querySelector("#diagnostics-content");
const pauseButton = document.querySelector("#pause-button");
const pauseIcon = document.querySelector("#pause-icon");
const pauseLabel = document.querySelector("#pause-label");
const fullscreenButton = document.querySelector("#fullscreen-button");
const viewport = document.querySelector("#viewport");
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
  const supported = labels.filter(([, ok]) => ok).length;
  diagnosticsSummary.textContent = `${supported}/${labels.length} available`;
  diagnosticsList.replaceChildren(...labels.map(([label, ok]) => {
    const item = document.createElement("li");
    item.textContent = `${label} · ${ok ? "Available" : "Unavailable"}`;
    item.dataset.ok = String(ok);
    return item;
  }));
}

diagnosticsToggle.addEventListener("click", () => {
  const expanded = diagnosticsToggle.getAttribute("aria-expanded") === "true";
  diagnosticsToggle.setAttribute("aria-expanded", String(!expanded));
  diagnosticsContent.hidden = expanded;
});

fullscreenButton.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) await viewport.requestFullscreen();
    else await document.exitFullscreen();
  } catch (error) {
    console.warn("Fullscreen request failed:", error);
    status.textContent = "Fullscreen is unavailable in this browser";
  }
});

document.addEventListener("fullscreenchange", () => {
  fullscreenButton.querySelector("span:last-child").textContent =
    document.fullscreenElement ? "Exit fullscreen" : "Fullscreen";
});

try {
  renderDiagnostics();
  const platform = createBrowserPlatform({ canvas });
  const graphics = platform.graphics;
  if (!graphics) throw new Error("WebGL2 is not available in this browser.");

  graphicsStatus.textContent = `Graphics: WebGL2 · ${graphics.renderer}`;
  graphics.resize();
  window.addEventListener("resize", graphics.resize, { passive: true });

  const input = platform.input;
  input.onChange((event) => {
    inputStatus.textContent = event.locked ? "Input: pointer locked" : "Input: ready";
  });

  const renderer = createRenderer(graphics.gl);
  renderer.start();
  let paused = false;
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    if (paused) renderer.stop();
    else renderer.start();
    pauseIcon.textContent = paused ? "▶" : "Ⅱ";
    pauseLabel.textContent = paused ? "Resume" : "Pause";
    pauseButton.setAttribute("aria-label", paused ? "Resume preview" : "Pause preview");
  });

  const engine = await loadEngine({
    modulePath: CLIENT_CONFIG.engineModule,
    platform,
    canvas,
    config: CLIENT_CONFIG
  });

  status.textContent = engine.loaded
    ? "Browser platform ready · game engine loaded"
    : "Renderer preview active · game engine pending";
  status.dataset.state = "ready";
  window.eaglercraftPlatform = platform;
  window.eaglercraftRendererTest = renderer;
  window.eaglercraftEngine = engine;

  window.addEventListener("beforeunload", () => {
    renderer.dispose();
    input.dispose();
    platform.audio.close();
    if (engine.loaded) engine.client.dispose();
  }, { once: true });
} catch (error) {
  console.error("Client initialization failed:", error);
  status.textContent = "Client initialization failed";
  status.dataset.state = "error";
  graphicsStatus.textContent = error.message;
  diagnosticsSummary.textContent = "Some checks failed";
}
