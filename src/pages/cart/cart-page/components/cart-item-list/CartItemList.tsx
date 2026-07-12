import { Typography } from '@mui/material'

import CartItem from '@/pages/cart/cart-page/components/cart-item/CartItem'

import './CartItemList.scss'
import { useCartItemListController } from './useCartItemListController'

const CartItemList = () => {
  const { lineItems } = useCartItemListController()

  if (lineItems.length === 0) {
    return (
      <div className="cart-item-list">
        <Typography variant="h5" className="empty-state-heading">
          Your cart is empty
        </Typography>
        <Typography className="empty-state-message">
          Items you add to your cart will show up here.
        </Typography>
      </div>
    )
  }

  return (
    <div className="cart-item-list">
      {lineItems.map(({ product, quantity }) => (
        <CartItem key={product.id} product={product} quantity={quantity} />
      ))}
    </div>
  )
}

export default CartItemList
