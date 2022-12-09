/* eslint-disable no-console */
/// <reference lib='webworker' />
// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
import { clientsClaim } from 'workbox-core';
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute, Route } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope

const routesWithoutCaching: Array<string> = ['login', 'logout', '/api.*'];

clientsClaim();

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

const handler = createHandlerBoundToURL('./index.html');

const navigationRoute = new NavigationRoute(handler, {
  denylist: routesWithoutCaching.map((route) => new RegExp(route)),
});

registerRoute(navigationRoute);

const networkFirstPaths = [
  '/disciplines',
  '/discipline'
];

const networkFirstRoute = new Route(
  ({ request }) =>
    networkFirstPaths.some((route) => request.url.includes(route)),
  new NetworkFirst({
    cacheName: 'disciplinesApp',
  }),
)

registerRoute(networkFirstRoute);

// Skip waiting for activation by default
self.addEventListener('install', () => {
  self.skipWaiting()
});

self.addEventListener('push', (event) => {
  const notificationTitle = 'Soft Uni PWA demo';

  const notification = {
    body: (event as any).data.text(),
    icon: './favicon.ico',
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