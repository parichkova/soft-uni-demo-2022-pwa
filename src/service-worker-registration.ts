/* eslint-disable */
type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void
  onUpdate?: (registration: ServiceWorkerRegistration) => void
}

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' || // [::1] is the IPv6 localhost address.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ), // 127.0.0.0/8 are considered localhost for IPv4.
)

const registerValidServiceWorker = async (
  serviceWorkerUrl: string,
  config?: Config
): Promise<void> => {
  try {
    const registration = await navigator.serviceWorker.register(
      serviceWorkerUrl
    )

    registration.onupdatefound = () => {
      const installingWorker = registration.installing
      if (installingWorker == null) {
        return
      }
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller !== null) {
            // At this point, the updated precached content has been fetched,
            // but the previous service worker will still serve the older
            // content until all client tabs are closed.
            console.log(
              'New content is available and will be used when all tabs for this page are closed.',
            )
            config?.onUpdate?.(registration)
          } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // 'Content is cached for offline use.' message.
            // eslint-disable-next-line no-console
            console.log('Content is cached for offline use.')
            config?.onSuccess?.(registration)
          }
        }
      }
    }
  } catch (error) {
    console.error('Error during service worker registration:', error)
  }
}

const checkValidServiceWorker = async (
  serviceWorkerUrl: string,
  config?: Config
): Promise<void> => {
  // Check if the service worker can be found. If it can't reload the page.
  try {
    const { status, headers } = await fetch(serviceWorkerUrl, {
      headers: { 'Service-Worker': 'script' },
    })
    const contentType = headers.get('content-type')
    if (status === 404 || !contentType?.includes('javascript')) {
      // No service worker found. Probably a different app. Reload the page.
      const registration = await navigator.serviceWorker.ready
      await registration.unregister()
      window.location.reload()
    } else {
      // Service worker found. Proceed as normal.
      await registerValidServiceWorker(serviceWorkerUrl, config)
    }
  } catch {
    console.log('No internet connection found. App is running in offline mode.')
  }
}

export const registerServiceWorker = (config?: Config): void => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', async () => {
      const serviceWorkerUrl = './service-worker.js'

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        await checkValidServiceWorker(serviceWorkerUrl, config)

        // Add some additional logging to localhost, pointing developers to the service worker/PWA documentation.
        await navigator.serviceWorker.ready
        // eslint-disable-next-line no-console
        console.log(
          'This web app is being served cache-first by a service worker',
        )
      } else {
        // Is not localhost. Just register service worker
        await registerValidServiceWorker(serviceWorkerUrl, config)
      }
    })
  }
}
