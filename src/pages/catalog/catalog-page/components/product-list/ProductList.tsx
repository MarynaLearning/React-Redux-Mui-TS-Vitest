import { Typography } from '@mui/material'

import ProductCard from '@/pages/catalog/catalog-page/components/product-card/ProductCard'

import './ProductList.scss'
import { useProductListController } from './useProductListController'

const ProductList = () => {
  const { products } = useProductListController()

  if (products.length === 0) {
    return (
      <div className="product-list">
        <Typography className="empty-state">
          No products match your filters.
        </Typography>
      </div>
    )
  }

  return (
    <div className="product-list">
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
