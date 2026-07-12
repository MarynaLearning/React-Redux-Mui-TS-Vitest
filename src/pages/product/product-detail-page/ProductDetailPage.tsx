import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Button, IconButton, TextField, Typography } from '@mui/material'

import { useDocumentTitle } from '@/hooks/useDocumentTitle'

import './ProductDetailPage.scss'
import { useProductDetailPageController } from './useProductDetailPageController'

const ProductDetailPage = () => {
  const {
    product,
    quantity,
    quantityText,
    onIncrement,
    onDecrement,
    onQuantityInputChange,
    onQuantityInputBlur,
    onAddToCart,
  } = useProductDetailPageController()

  useDocumentTitle(product ? product.title : 'Product')

  if (!product) {
    return (
      <div className="product-detail-page">
        <Typography className="not-found">Product not found.</Typography>
      </div>
    )
  }

  const { title, description, price, category, imageUrl, stock, rating } =
    product
  const isOutOfStock = stock === 0

  return (
    <div className="product-detail-page">
      <img src={imageUrl} alt={title} className="image" />
      <div className="info">
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body2" className="category">
          {category}
        </Typography>
        <Typography variant="body1" className="description">
          {description}
        </Typography>
        <div className="meta">
          <Typography variant="h5" className="price">
            ${price.toFixed(2)}
          </Typography>
          <Typography variant="body2" className="rating">
            ★ {rating.toFixed(1)}
          </Typography>
        </div>
        <Typography variant="body2" className="stock">
          {isOutOfStock ? 'Out of stock' : `${stock} in stock`}
        </Typography>
        {isOutOfStock ? (
          <Button
            className="add-to-cart-button"
            variant="contained"
            size="small"
            disabled
          >
            Add to Cart
          </Button>
        ) : (
          <div className="cart-actions">
            <div className="quantity-stepper">
              <IconButton
                aria-label="Decrease quantity"
                onClick={onDecrement}
                disabled={quantity <= 1}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                className="quantity-input"
                size="small"
                value={quantityText}
                onChange={onQuantityInputChange}
                onBlur={onQuantityInputBlur}
                slotProps={{
                  htmlInput: {
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    'aria-label': 'Quantity',
                  },
                }}
              />
              <IconButton
                aria-label="Increase quantity"
                onClick={onIncrement}
                disabled={quantity >= stock}
              >
                <AddIcon />
              </IconButton>
            </div>
            <Button
              className="add-to-cart-button"
              variant="contained"
              size="small"
              onClick={onAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailPage
