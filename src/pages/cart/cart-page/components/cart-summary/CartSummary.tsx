import { Button, Typography } from '@mui/material'

import { formatCurrency } from '@/utils/currency'

import './CartSummary.scss'
import { useCartSummaryController } from './useCartSummaryController'

const CartSummary = () => {
  const { totalCount, totalPrice, onClearCart } = useCartSummaryController()

  if (totalCount === 0) return null

  return (
    <div className="cart-summary">
      <Typography variant="body2" className="count">
        {totalCount} {totalCount === 1 ? 'item' : 'items'}
      </Typography>
      <Typography variant="h5" className="total">
        Total: {formatCurrency(totalPrice)}
      </Typography>
      <Button variant="outlined" onClick={onClearCart}>
        Clear Cart
      </Button>
    </div>
  )
}

export default CartSummary
