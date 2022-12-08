/* eslint-disable no-restricted-globals */
const cacheName = 'cache-v1';
const resourcesToPrecache = [
  'index.html',
  'logo192.png',
  'logo512.png'
]; // app-shell*

let defferedEvent = null;

self.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();

  console.log('before install promp activated');
  defferedEvent = event;
});

self.addEventListener('install', (event) => {
  console.log("Install triggered!");

  // wait for the last promise
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(resourcesToPrecache))
  )
});

self.addEventListener("activate", (event) => {
 // old caches can be cleared
 event.waitUntil(
  caches.keys().then((cacheName) => (
    Promise.all(
      cacheName
        .filter(cacheName => cacheName === 'old-cache-to-delete')
        .map((cacheName) => caches.delete(cacheName))
    )
  ))
 )
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request)
    .then((cachedResponse) => cachedResponse || fetch(event.request)))
});

self.addEventListener('push', (event) => {
  const notificationTitle = 'Soft Uni PWA demo';

  const notification = {
    body: event.data.text(),
    icon: './assets/favicon.ico',
  };

  if (Notification.permission === 'granted') {
    event.waitUntil(
      self.registration.showNotification(notificationTitle, {
          ...notification
        }
      )
    )
  } else {
    // request permission
  }
});
