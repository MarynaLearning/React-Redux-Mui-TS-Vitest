import { Typography } from '@mui/material'

import './CatalogPage.scss'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const CatalogPage = () => {
  useDocumentTitle('Catalog')

  return (
    <div className="catalog-page">
      <Typography variant="h4">Catalog</Typography>
    </div>
  )
}

export default CatalogPage
