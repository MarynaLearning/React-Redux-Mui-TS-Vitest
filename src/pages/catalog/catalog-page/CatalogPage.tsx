import { Typography } from '@mui/material'

import { useDocumentTitle } from '@/hooks/useDocumentTitle'

import './CatalogPage.scss'
import Filters from './components/filters/Filters'
import ProductList from './components/product-list/ProductList'

const CatalogPage = () => {
  useDocumentTitle('Catalog')

  return (
    <div className="catalog-page">
      <Typography variant="h4">Catalog</Typography>
      <Filters />
      <ProductList />
    </div>
  )
}

export default CatalogPage
