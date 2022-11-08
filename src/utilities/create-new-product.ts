import { Product } from '../types/types'
import { getMockarooUrl } from './utilities'

export const createProduct = async (product: Product) => {
  try {
    const addProductQuery = await fetch(
      getMockarooUrl('/products'),
      { method: "POST", body: JSON.stringify(product) }
    );

    return (await addProductQuery.json()) as Product
  } catch (error) {
    console.log(error)

    return;
  }
}
