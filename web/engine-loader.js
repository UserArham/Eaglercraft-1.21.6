/**
 * Optional engine integration boundary.
 *
 * The future game engine module must export:
 *   createClient({ platform, canvas, config }) => { start(), stop(), dispose() }
 *
 * No engine module is configured in this repository yet. This loader refuses
 * to invent a game implementation or silently substitute another Minecraft version.
 */
export async function loadEngine({ modulePath, platform, canvas, config }) {
  if (!modulePath) {
    return Object.freeze({
      loaded: false,
      reason: "No Minecraft 1.21.6 engine module has been integrated."
    });
  }

  const moduleUrl = new URL(modulePath, import.meta.url);
  if (moduleUrl.origin !== window.location.origin) {
    throw new Error("Engine modules must be served from this site origin.");
  }

  const engineModule = await import(moduleUrl.href);
  if (typeof engineModule.createClient !== "function") {
    throw new TypeError("Engine module must export createClient().");
  }

  const client = await engineModule.createClient({ platform, canvas, config });
  for (const method of ["start", "stop", "dispose"]) {
    if (typeof client?.[method] !== "function") {
      throw new TypeError(`Engine client is missing required method: ${method}()`);
    }
  }

  return Object.freeze({ loaded: true, client });
}
