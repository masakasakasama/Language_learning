// Network-first service worker. Always tries the network so a new
// deploy is picked up immediately; the cache is only an offline
// fallback. This prevents the app from getting stuck on a stale
// cached version (the recurring "更新されてない" problem).
const CACHE = "mumu-v1";

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        // Refresh the offline copy with the freshest version.
        const copy = res.clone();
        caches.open(CACHE).then((c) => { try { c.put(req, copy); } catch (err) {} });
        return res;
      })
      .catch(() => caches.match(req))
  );
});
