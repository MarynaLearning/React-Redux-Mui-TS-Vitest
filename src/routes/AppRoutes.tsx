import { Route, Routes } from 'react-router-dom'

import { ROUTES } from './constants'
import AuthLayout from '../components/layouts/auth-layout/AuthLayout'
import MainLayout from '../components/layouts/main-layout/MainLayout'
import ProtectedRoute from '../components/protected-route/ProtectedRoute'
import AccountLayout from '../pages/account/AccountLayout'
import PersonalInfo from '../pages/account/component/personal-info/PersonalInfo'
import Preferences from '../pages/account/component/preferences/Preferences'
import Statistics from '../pages/account/component/statistics/Statistics'
import LoginPage from '../pages/auth/login-page/LoginPage'
import SignupPage from '../pages/auth/signup-page/SignupPage'
import CartPage from '../pages/cart/cart-page/CartPage'
import CatalogPage from '../pages/catalog/catalog-page/CatalogPage'
import CheckoutPage from '../pages/delivery/checkout-page/CheckoutPage'
import NotFoundPage from '../pages/not-found-page/NotFoundPage'
import ProductDetailPage from '../pages/product/product-detail-page/ProductDetailPage'

const AppRoutes = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
    </Route>
    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<CatalogPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route element={<AccountLayout />}>
          <Route
            path={ROUTES.ACCOUNT_PERSONAL_INFO}
            element={<PersonalInfo />}
          />
          <Route path={ROUTES.ACCOUNT_PREFERENCES} element={<Preferences />} />
          <Route path={ROUTES.ACCOUNT_STATISTICS} element={<Statistics />} />
        </Route>
      </Route>
    </Route>
    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
  </Routes>
)

export default AppRoutes
