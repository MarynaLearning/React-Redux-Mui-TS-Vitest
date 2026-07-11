import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import AuthLayout from '@/components/layouts/auth-layout/AuthLayout'
import MainLayout from '@/components/layouts/main-layout/MainLayout'
import AccountLayout from '@/pages/account/AccountLayout'

import { ROUTES } from './constants'
import ProtectedRoute from './ProtectedRoute'

const PersonalInfo = lazy(
  () => import('@/pages/account/component/personal-info/PersonalInfo'),
)
const Preferences = lazy(
  () => import('@/pages/account/component/preferences/Preferences'),
)
const Statistics = lazy(
  () => import('@/pages/account/component/statistics/Statistics'),
)
const LoginPage = lazy(() => import('@/pages/auth/login-page/LoginPage'))
const SignupPage = lazy(() => import('@/pages/auth/signup-page/SignupPage'))
const CartPage = lazy(() => import('@/pages/cart/cart-page/CartPage'))
const CatalogPage = lazy(
  () => import('@/pages/catalog/catalog-page/CatalogPage'),
)
const CheckoutPage = lazy(
  () => import('@/pages/delivery/checkout-page/CheckoutPage'),
)
const NotFoundPage = lazy(() => import('@/pages/not-found-page/NotFoundPage'))
const ProductDetailPage = lazy(
  () => import('@/pages/product/product-detail-page/ProductDetailPage'),
)

const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<CatalogPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
          <Route element={<AccountLayout />}>
            <Route
              path={ROUTES.ACCOUNT_PERSONAL_INFO}
              element={<PersonalInfo />}
            />
            <Route
              path={ROUTES.ACCOUNT_PREFERENCES}
              element={<Preferences />}
            />
            <Route path={ROUTES.ACCOUNT_STATISTICS} element={<Statistics />} />
          </Route>
        </Route>
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  </Suspense>
)

export default AppRoutes
