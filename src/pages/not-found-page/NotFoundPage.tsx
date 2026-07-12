import { Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/routes/constants'
import './NotFoundPage.scss'

const NotFoundPage = () => {
  useDocumentTitle('Page not found')

  return (
    <div className="not-found-page">
      <Typography variant="h4">Page not found</Typography>
      <RouterLink to={ROUTES.HOME}>Back to catalog</RouterLink>
    </div>
  )
}

export default NotFoundPage
