const cacheName="cache-v1",resourcesToPrecache=["index.html","logo192.png","logo512.png"];let defferedEvent=null;self.addEventListener("beforeinstallprompt",(e=>{e.preventDefault(),console.log("before install promp activated"),defferedEvent=e})),self.addEventListener("install",(e=>{console.log("Install triggered!"),e.waitUntil(caches.open(cacheName).then((e=>e.addAll(resourcesToPrecache))))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((e=>Promise.all(e.filter((e=>"old-cache-to-delete"===e)).map((e=>caches.delete(e)))))))})),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((t=>t||fetch(e.request))))})),self.addEventListener("push",(e=>{const t={body:e.data.text(),icon:"./favicon.ico"};"granted"===Notification.permission&&e.waitUntil(self.registration.showNotification("Soft Uni PWA demo",{...t}))}));