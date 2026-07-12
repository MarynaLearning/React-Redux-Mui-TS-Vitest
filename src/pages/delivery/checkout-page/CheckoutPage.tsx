import { Typography } from '@mui/material'

import './CheckoutPage.scss'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const CheckoutPage = () => {
  useDocumentTitle('Checkout')

  return (
    <div className="checkout-page">
      <Typography variant="h4">Checkout</Typography>
    </div>
  )
}

export default CheckoutPage
