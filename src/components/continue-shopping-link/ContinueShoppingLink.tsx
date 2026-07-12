import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { ROUTES } from '@/routes/constants'

import './ContinueShoppingLink.scss'

const ContinueShoppingLink = () => (
  <Button
    className="continue-shopping-link"
    component={RouterLink}
    to={ROUTES.HOME}
    startIcon={<ArrowBackIcon />}
  >
    Continue Shopping
  </Button>
)

export default ContinueShoppingLink
