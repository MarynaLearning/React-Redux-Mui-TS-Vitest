import { Button, Typography } from '@mui/material'

import ContinueShoppingLink from '@/components/continue-shopping-link/ContinueShoppingLink'
import PageHeader from '@/components/page-header/PageHeader'
import QuantityStepper from '@/components/quantity-stepper/QuantityStepper'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { formatCurrency } from '@/utils/currency'

import './ProductDetailPage.scss'
import { useProductDetailPageController } from './useProductDetailPageController'

const ProductDetailPage = () => {
  const {
    product,
    quantity,
    quantityText,
    maxAddable,
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
        <PageHeader
          title="Product not found"
          leftSlot={<ContinueShoppingLink />}
        />
        <Typography className="not-found">
          We couldn't find that product. It may have been removed.
        </Typography>
      </div>
    )
  }

  const { title, description, price, category, imageUrl, stock, rating } =
    product
  const isOutOfStock = stock === 0
  const isMaxInCart = !isOutOfStock && maxAddable <= 0

  return (
    <div className="product-detail-page">
      <PageHeader title={title} leftSlot={<ContinueShoppingLink />} />
      <div className="content">
        <img src={imageUrl} alt={title} className="image" />
        <div className="info">
          <Typography variant="body2" className="category">
            {category}
          </Typography>
          <Typography variant="body1" className="description">
            {description}
          </Typography>
          <div className="meta">
            <Typography variant="h5" className="price">
              {formatCurrency(price)}
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
          ) : isMaxInCart ? (
            <Typography variant="body2" className="max-in-cart">
              All available stock is already in your cart
            </Typography>
          ) : (
            <div className="cart-actions">
              <QuantityStepper
                value={quantityText}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onChange={onQuantityInputChange}
                onBlur={onQuantityInputBlur}
                decrementDisabled={quantity <= 1}
                incrementDisabled={quantity >= maxAddable}
              />
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
    </div>
  )
}

export default ProductDetailPage
