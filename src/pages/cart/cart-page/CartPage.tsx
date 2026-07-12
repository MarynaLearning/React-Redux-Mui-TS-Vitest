import ContinueShoppingLink from '@/components/continue-shopping-link/ContinueShoppingLink'
import PageHeader from '@/components/page-header/PageHeader'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

import './CartPage.scss'
import CartItemList from './components/cart-item-list/CartItemList'
import CartSummary from './components/cart-summary/CartSummary'

const CartPage = () => {
  useDocumentTitle('Cart')

  return (
    <div className="cart-page">
      <PageHeader title="Cart" leftSlot={<ContinueShoppingLink />} />
      <CartItemList />
      <CartSummary />
    </div>
  )
}

export default CartPage
