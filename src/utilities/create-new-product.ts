import { Product } from '../types/types';
import { mockarooBaseUrl } from '../constants';
import { getMockarooUrl } from './utilities';
const headers =  { 'Content-Type': 'application/json' };

export const createProduct = async (product: Product | null) => {
  try {
    try {
      debugger;
      const appDataCache = await caches.open('appData');
      const cachedProductReq = await appDataCache.match(
        `${mockarooBaseUrl}/products.json`,
        { ignoreVary: true, ignoreSearch: true } );

      if (cachedProductReq) {
        const cachedProducts = await cachedProductReq?.json() as Array<Product>;

        await appDataCache.put(new Request(
            cachedProductReq.url,
            { method: "GET", headers }
          ),
          new Response(
            JSON.stringify([...cachedProducts, product]),
            { headers }
          ),
        );
      }
    } catch (e) {
      console.log("Issues retrieving requests from the cache");
    }

    const addProductQuery = await fetch(
      getMockarooUrl('/product'),
      { method: "POST", body: JSON.stringify(product) }
    );

    return (await addProductQuery.json()) as Product
  } catch (error) {
    console.log(error)

    return;
  }
}
