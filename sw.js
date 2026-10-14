const CACHE='karbur-maliyet-v3';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-512-maskable.png','./html2pdf.bundle.min.js','./fonts.css',
 './dm-sans-latin-wght-normal.woff2','./dm-sans-latin-ext-wght-normal.woff2','./jetbrains-mono-latin-wght-normal.woff2','./jetbrains-mono-latin-ext-wght-normal.woff2','./space-grotesk-latin-wght-normal.woff2','./space-grotesk-latin-ext-wght-normal.woff2'];
// Tek bir dosya eksik olsa bile kurulum bozulmasın
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Önce ağ (her zaman güncel fiyat), ağ yoksa önbellek (çevrimdışı çalışır)
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./index.html'))));
});
