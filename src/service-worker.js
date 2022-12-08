/* eslint-disable no-restricted-globals */

const cacheName = 'cache-v1';
const resourcesToPrecache = [
  'index.html',
  'logo192.png',
  'logo512.png'
];
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

self.addEventListener("activate", () => {
 // old caches can be cleared
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request)
    .then((cachedResponse) => cachedResponse || fetch(event.request)))
});

self.addEventListener('push', (event) => {
  const notificationTitle = 'Custom notification message';
  const notification = {
    body: 'Very long message body',
    icon: '',
    tag: 'notification-tag-soft-uni'
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
