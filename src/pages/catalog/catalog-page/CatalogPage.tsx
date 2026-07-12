import PageHeader from '@/components/page-header/PageHeader'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

import './CatalogPage.scss'
import Filters from './components/filters/Filters'
import ProductList from './components/product-list/ProductList'

const CatalogPage = () => {
  useDocumentTitle('Catalog')

  return (
    <div className="catalog-page">
      <PageHeader title="Catalog" />
      <Filters />
      <ProductList />
    </div>
  )
}

export default CatalogPage
