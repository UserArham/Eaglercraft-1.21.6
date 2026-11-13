/** Browser capability checks used by the startup screen. */
export function getBrowserDiagnostics() {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2");
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  return Object.freeze({
    webgl2: Boolean(gl),
    webAssembly: typeof WebAssembly === "object",
    webSocket: typeof WebSocket === "function",
    pointerLock: "requestPointerLock" in document.createElement("canvas"),
    audio: Boolean(AudioContextClass),
    secureContext: window.isSecureContext,
    userAgent: navigator.userAgent
  });
}
