// Network-first service worker. App code (HTML/JS/CSS) is ALWAYS taken
// from the network so a new deploy can never be stuck behind a stale
// cache. The cache is only an offline fallback for static assets.
const CACHE = "mumu-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Let the page force an immediate takeover / cache wipe.
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
  if (e.data === "CLEAR_CACHES") {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
  }
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isCode = req.mode === "navigate" ||
    /\.(html|js|css)$/.test(url.pathname) || url.pathname.endsWith("/");
  if (isCode) {
    // Always network for app code; never serve stale code.
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }
  // Static assets: network-first, cache as offline fallback.
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => { try { c.put(req, copy); } catch (err) {} });
        return res;
      })
      .catch(() => caches.match(req))
  );
});
