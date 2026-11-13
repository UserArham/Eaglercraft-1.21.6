/**
 * Browser-facing platform services for the Eaglercraft client.
 * This module deliberately contains no Minecraft implementation.
 */

export function createBrowserPlatform({ canvas }) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("createBrowserPlatform requires an HTMLCanvasElement");
  }

  return Object.freeze({
    graphics: createGraphics(canvas),
    input: createInput(canvas),
    storage: createStorage(),
    networking: Object.freeze({ connect: connectWebSocket }),
    audio: createAudio()
  });
}

function createGraphics(canvas) {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: true,
    depth: true,
    powerPreference: "high-performance"
  });

  if (!gl) return null;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };

  return Object.freeze({
    gl,
    renderer: gl.getParameter(gl.RENDERER) || "WebGL2",
    resize,
    get drawingBufferWidth() { return gl.drawingBufferWidth; },
    get drawingBufferHeight() { return gl.drawingBufferHeight; }
  });
}

function createInput(canvas) {
  const keys = new Set();
  const listeners = new Set();
  let pointerLocked = false;

  const emit = () => {
    const snapshot = Object.freeze({
      keys: new Set(keys),
      locked: pointerLocked
    });
    for (const listener of listeners) listener(snapshot);
  };

  const keydown = (event) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
    keys.add(event.code);
    emit();
  };
  const keyup = (event) => { keys.delete(event.code); emit(); };
  const lockChange = () => { pointerLocked = document.pointerLockElement === canvas; emit(); };

  window.addEventListener("keydown", keydown);
  window.addEventListener("keyup", keyup);
  window.addEventListener("blur", () => { keys.clear(); emit(); });
  document.addEventListener("pointerlockchange", lockChange);
  canvas.addEventListener("click", () => {
    if (!pointerLocked && canvas.requestPointerLock) canvas.requestPointerLock();
  });

  return Object.freeze({
    isKeyDown: (code) => keys.has(code),
    get pointerLocked() { return pointerLocked; },
    onChange(listener) {
      if (typeof listener !== "function") throw new TypeError("listener must be a function");
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    dispose() {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
      document.removeEventListener("pointerlockchange", lockChange);
      listeners.clear();
      keys.clear();
    }
  });
}

function createStorage() {
  const prefix = "eaglercraft-1.21.6:";
  return Object.freeze({
    get(key) {
      try { return localStorage.getItem(prefix + key); }
      catch (error) { console.warn("Local storage read failed:", error); return null; }
    },
    set(key, value) {
      try { localStorage.setItem(prefix + key, String(value)); return true; }
      catch (error) { console.warn("Local storage write failed:", error); return false; }
    },
    remove(key) {
      try { localStorage.removeItem(prefix + key); return true; }
      catch (error) { console.warn("Local storage removal failed:", error); return false; }
    }
  });
}

function connectWebSocket(url, protocols) {
  const parsed = new URL(url, window.location.href);
  if (!["ws:", "wss:"].includes(parsed.protocol)) {
    throw new TypeError("WebSocket URL must use ws: or wss:");
  }
  return new WebSocket(parsed, protocols);
}

function createAudio() {
  let context;
  return Object.freeze({
    async resume() {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      context ||= new AudioContextClass();
      if (context.state === "suspended") await context.resume();
      return context;
    },
    get state() { return context?.state ?? "not-created"; },
    close() { return context?.close(); }
  });
}
