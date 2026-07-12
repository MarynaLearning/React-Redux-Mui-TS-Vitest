import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { generatePath, Link as RouterLink } from 'react-router-dom'

import { ROUTES } from '@/routes/constants'
import { formatCurrency } from '@/utils/currency'

import './ProductCard.scss'
import type { IProductCardProps } from './types'
import { useProductCardController } from './useProductCardController'

const ProductCard = (props: IProductCardProps) => {
  const { product } = props
  const { id, title, price, category, imageUrl, rating } = product
  const { onAddToCart, isAddToCartDisabled } = useProductCardController(props)

  return (
    <Card className="product-card">
      <CardActionArea
        component={RouterLink}
        to={generatePath(ROUTES.PRODUCT_DETAIL, { id })}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          className="media"
        />
        <CardContent className="content">
          <Typography variant="subtitle1" className="title">
            {title}
          </Typography>
          <Typography variant="body2" className="category">
            {category}
          </Typography>
          <div className="meta">
            <Typography variant="body1" className="price">
              {formatCurrency(price)}
            </Typography>
            <Typography variant="body2" className="rating">
              ★ {rating.toFixed(1)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <div className="actions">
        <Button
          variant="contained"
          size="small"
          onClick={onAddToCart}
          disabled={isAddToCartDisabled}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  )
}

export default ProductCard
