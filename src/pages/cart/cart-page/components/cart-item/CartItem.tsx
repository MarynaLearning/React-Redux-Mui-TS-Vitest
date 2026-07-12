import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Typography } from '@mui/material'

import QuantityStepper from '@/components/quantity-stepper/QuantityStepper'
import { formatCurrency } from '@/utils/currency'

import './CartItem.scss'
import type { ICartItemProps } from './types'
import { useCartItemController } from './useCartItemController'

const CartItem = (props: ICartItemProps) => {
  const { product, quantity } = props
  const {
    quantityText,
    onIncrement,
    onDecrement,
    onQuantityInputChange,
    onQuantityInputBlur,
    onRemove,
  } = useCartItemController(props)

  return (
    <div className="cart-item">
      <img src={product.imageUrl} alt={product.title} className="image" />
      <Typography variant="subtitle1" className="title">
        {product.title}
      </Typography>
      <Typography variant="body2" className="unit-price">
        {formatCurrency(product.price)}
      </Typography>
      <QuantityStepper
        value={quantityText}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onChange={onQuantityInputChange}
        onBlur={onQuantityInputBlur}
        decrementDisabled={quantity <= 1}
        incrementDisabled={quantity >= product.stock}
      />
      <Typography variant="body1" className="line-total">
        {formatCurrency(product.price * quantity)}
      </Typography>
      <IconButton aria-label={`Remove ${product.title}`} onClick={onRemove}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}

export default CartItem
