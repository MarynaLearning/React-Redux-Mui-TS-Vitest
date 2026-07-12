import { Typography } from '@mui/material'

import './CartPage.scss'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const CartPage = () => {
  useDocumentTitle('Cart')

  return (
    <div className="cart-page">
      <Typography variant="h4">Cart</Typography>
    </div>
  )
}

export default CartPage
