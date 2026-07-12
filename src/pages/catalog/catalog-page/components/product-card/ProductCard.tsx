import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { generatePath, Link as RouterLink } from 'react-router-dom'

import { ROUTES } from '@/routes/constants'

import './ProductCard.scss'
import type { IProductCardProps } from './types'

const ProductCard = ({ product }: IProductCardProps) => {
  const { id, title, price, category, imageUrl, rating } = product

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
              ${price.toFixed(2)}
            </Typography>
            <Typography variant="body2" className="rating">
              ★ {rating.toFixed(1)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
