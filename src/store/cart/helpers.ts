import { PRODUCTS } from '@/data/products'

/**
 * @Description Returns the max quantity of a product allowed in the cart
 * (its stock). Returns 0 if the product isn't found, so an unrecognized
 * id is never allowed to add to the cart.
 * @param productId
 * */
export const getMaxCartQuantity = (productId: string): number =>
  PRODUCTS.find((product) => product.id === productId)?.stock ?? 0
