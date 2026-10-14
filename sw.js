const CACHE='karbur-maliyet-v2';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-512-maskable.png','./vendor/html2pdf.bundle.min.js','./fonts/fonts.css',
 './fonts/dm-sans-latin-wght-normal.woff2','./fonts/dm-sans-latin-ext-wght-normal.woff2','./fonts/jetbrains-mono-latin-wght-normal.woff2','./fonts/jetbrains-mono-latin-ext-wght-normal.woff2','./fonts/space-grotesk-latin-wght-normal.woff2','./fonts/space-grotesk-latin-ext-wght-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Önce ağ (güncel sürüm), ağ yoksa önbellek (çevrimdışı çalışır)
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./index.html'))));
});
