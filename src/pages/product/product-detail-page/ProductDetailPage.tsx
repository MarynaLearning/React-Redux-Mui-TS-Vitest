import { Typography } from '@mui/material'

import './ProductDetailPage.scss'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const ProductDetailPage = () => {
  useDocumentTitle('Product')

  return (
    <div className="product-detail-page">
      <Typography variant="h4">Product</Typography>
    </div>
  )
}

export default ProductDetailPage
