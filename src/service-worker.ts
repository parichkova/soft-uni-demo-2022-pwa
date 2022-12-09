/* eslint-disable no-console */
/// <reference lib='webworker' />

import { clientsClaim } from 'workbox-core';
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { NetworkFirst } from 'workbox-strategies';
import { NavigationRoute, registerRoute, Route } from 'workbox-routing';
import { cacheName, networkFirstPaths, routesWithoutCaching } from './constants';

declare const self: ServiceWorkerGlobalScope;

clientsClaim(); // allows an active service worker to set itself as the controller for all clients within its scope.

precacheAndRoute(self.__WB_MANIFEST); // During installation phase

cleanupOutdatedCaches(); // during the activation phase

const navigationRoute = new NavigationRoute(createHandlerBoundToURL('./index.html'), {
  denylist: routesWithoutCaching.map((route) => new RegExp(route)),
});

registerRoute(navigationRoute);

const networkFirstRoute = new Route(({ request }) =>
    networkFirstPaths.some((route) => request.url.includes(route)),
  new NetworkFirst({
    cacheName,
  }),
)

registerRoute(networkFirstRoute);

self.addEventListener('install', () => {
  self.skipWaiting();
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
  }
});