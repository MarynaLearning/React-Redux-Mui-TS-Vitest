# Shop Application — Technical Plan

> Single source of truth for architecture and delivery. Kept across sessions.
> Stack: React + TypeScript (Vite), MUI, Redux Toolkit (+ Context when needed),
> React Hook Form + Yup, ESLint + Prettier, Vitest. No backend, no real auth.

---

## 1. Key decisions

| Concern      | Decision                                       | Rationale                                                                                                                    |
| ------------ | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Build tool   | Vite + React + TS                              | Fast, first-class Vitest integration                                                                                         |
| Persistence  | **`sessionStorage`** (via redux-persist)       | Survives refresh, clears on tab/window close — matches "closing tab deletes info". Switchable to `localStorage` in one line. |
| Catalog data | Static seed `src/data/products.ts`             | No backend; only user state (cart/orders/account) is mutable                                                                 |
| Global state | Redux Toolkit for app **data**                 | cart, orders, auth, account, preferences                                                                                     |
| Context      | UI ephemera only                               | Snackbar/notifications + theme bridge                                                                                        |
| Routing      | React Router v6 nested layout routes           | Layout composition + fake-auth guard                                                                                         |
| Forms        | React Hook Form + Yup (`yupResolver`)          | One schema per form, colocated with page                                                                                     |
| Theming      | Custom MUI `createTheme` + component overrides | "MUI but looks different"                                                                                                    |

**Persistence behavior:** refresh keeps cart/login/account (`sessionStorage`); closing
the tab or window clears everything. To make data survive tab close too, switch the
persist storage to `localStorage`.

---

## 2. State ownership

**Redux slices** (`src/store/slices/`)

- `authSlice` — `{ user, isLoggedIn }`. Fake login/signup populates this.
- `cartSlice` — `{ items: [{ productId, quantity }] }`. add / remove / setQuantity / clear.
- `orderSlice` — `{ orders: Order[] }`. Checkout pushes here; feeds Statistics.
- `preferencesSlice` — `{ themeMode, currency, language }`. Drives theme.
- `filterSlice` — catalog search term, category, sort.

**Persistence:** redux-persist wraps the root reducer with `sessionStorage`. Whitelist
`auth`, `cart`, `order`, `preferences`. `filter` may stay non-persisted (transient UI).

**Context**

- `NotificationContext` — snackbar/toast.
- `ThemeModeProvider` — reads `preferences.themeMode` from Redux, builds MUI theme.

**Derived (selectors, no slice)**

- Cart totals/counts → `cartSelectors` (memoized with `createSelector`).
- Statistics (total spent, order count, items bought, favorite category, avg order value)
  → `statisticsSelectors` over `orderSlice`.

---

## 3. Data models (fields)

- **Product**: id, title, description, price, category, imageUrl, stock, rating
- **CartItem**: productId, quantity
- **Order**: id, items (snapshot), delivery, total, createdAt, status
- **DeliveryInfo**: fullName, phone, address, city, postalCode, country, method, date
- **User**: id, email, firstName, lastName
- **Preferences**: themeMode (light/dark), currency, language
- **Form inputs**: LoginForm, SignupForm

---

## 4. Folder structure

```
src/
  store/                    # ALL Redux
    index.ts                # configureStore + persist + RootState / AppDispatch
    hooks.ts                # typed useAppDispatch / useAppSelector ONLY
    slices/
      authSlice.ts
      cartSlice.ts
      orderSlice.ts
      preferencesSlice.ts
      filterSlice.ts
    selectors/
      cartSelectors.ts
      statisticsSelectors.ts
  pages/                    # presentational, thin
    auth/
      LoginPage.tsx         + loginSchema.ts        # schema colocated
      SignupPage.tsx        + signupSchema.ts
    catalog/                # ProductList, ProductCard, Filters
    product/                # ProductDetailPage
    cart/                   # CartPage
    delivery/
      CheckoutPage.tsx      + deliverySchema.ts
    account/
      personalInfo/         PersonalInfoPage.tsx + personalInfoSchema.ts
      preferences/
      statistics/           # cards + charts
  hooks/                    # reusable custom hooks (useCart, useDebounce, useNotification)
  components/               # shared UI + layouts + ProtectedRoute
    layouts/                # MainLayout, AuthLayout, AccountLayout
  theme/
  data/products.ts          # seed catalog
  types/
  utils/                    # currency/date formatters
  test/                     # setup.ts, renderWithProviders
```

**hooks distinction:** `store/hooks.ts` = typed Redux hooks only. `src/hooks/` =
reusable business hooks composing them.

**schemas:** colocated per form page (each schema serves one form).

---

## 5. Routing

```
AuthLayout
  /login
  /signup
MainLayout (header + nav; ProtectedRoute)
  /                     -> Catalog (shopping list)
  /product/:id          -> Product item
  /cart                 -> Cart
  /checkout             -> Delivery
  AccountLayout (nested)
    /account/personal-info
    /account/preferences
    /account/statistics
  *                     -> 404
```

`ProtectedRoute` reads `isLoggedIn`; false -> redirect to `/login`.

---

## 6. Testing (Vitest)

- Vitest + React Testing Library + `@testing-library/jest-dom` + user-event. No MSW.
- `renderWithProviders` helper: store + theme + router + notification context.
- Cover: reducers/selectors, form validation, key flows (add to cart, place order).

---

## 7. PR / commit roadmap

Slices are introduced in the PR of their first consumer.

| PR                          | Scope                                                                                                             | Notes                |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------- |
| 1. Setup & config           | Vite scaffold, TS strict, ESLint, Prettier, Vitest+RTL, scripts, MUI base                                         | one commit           |
| 2. Core structure & routing | store + persist + typed hooks, providers, custom theme, 3 layouts, route tree + placeholders, ProtectedRoute, 404 |                      |
| 3. Auth                     | `authSlice`, Login + Signup (RHF+Yup), fake login -> redirect                                                     |                      |
| 4. Catalog                  | seed `products.ts`, `filterSlice`, grid + filters/search/sort                                                     |                      |
| 5. Product item             | detail view; Add to cart -> introduces `cartSlice`                                                                |                      |
| 6. Cart                     | cart list, quantity stepper, totals, remove/clear                                                                 |                      |
| 7. Delivery/checkout        | delivery form, place order -> `orderSlice`, confirmation                                                          | needs non-empty cart |
| 8. Account — Personal Info  | edit `authSlice.user`                                                                                             |                      |
| 9. Account — Preferences    | `preferencesSlice`, theme toggle wired to ThemeModeProvider                                                       |                      |
| 10. Account — Statistics    | selectors + MUI cards + Recharts charts                                                                           | needs orders         |

---

## 8. Kickoff commands per step

Run from the project root. Each PR starts on its own branch.

### PR 1 — Setup & config

```bash
# scaffold into current dir (keep .git, .claude, .idea, PLAN.md)
npm create vite@latest . -- --template react-ts
npm install

# runtime deps
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @reduxjs/toolkit react-redux redux-persist react-router-dom
npm install react-hook-form @hookform/resolvers yup

# dev deps: testing + lint/format
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D prettier eslint-config-prettier eslint-plugin-jsx-a11y

# verify
npm run dev
npm run test
```

### PR 2 — Core structure & routing

```bash
git checkout -b pr2-core-structure
# create: src/store (configureStore + redux-persist over sessionStorage),
#         src/store/hooks.ts, src/components/layouts, src/theme,
#         src/pages placeholders, ProtectedRoute, router
npm run dev
```

### PR 3 — Auth

```bash
git checkout -b pr3-auth
# create: store/slices/authSlice.ts, pages/auth/{LoginPage,loginSchema,SignupPage,signupSchema}
npm run test
```

### PR 4 — Catalog

```bash
git checkout -b pr4-catalog
# create: data/products.ts, store/slices/filterSlice.ts, pages/catalog/*
npm run dev
```

### PR 5 — Product item

```bash
git checkout -b pr5-product
# create: pages/product/ProductDetailPage.tsx, store/slices/cartSlice.ts, hooks/useCart.ts
```

### PR 6 — Cart

```bash
git checkout -b pr6-cart
# create: pages/cart/CartPage.tsx, store/selectors/cartSelectors.ts
```

### PR 7 — Delivery / checkout

```bash
git checkout -b pr7-delivery
# create: store/slices/orderSlice.ts, pages/delivery/{CheckoutPage,deliverySchema}
```

### PR 8 — Account: Personal Info

```bash
git checkout -b pr8-account-personal-info
# create: pages/account/personalInfo/{PersonalInfoPage,personalInfoSchema}
```

### PR 9 — Account: Preferences

```bash
git checkout -b pr9-account-preferences
# create: store/slices/preferencesSlice.ts, pages/account/preferences/*
```

### PR 10 — Account: Statistics

```bash
git checkout -b pr10-account-statistics
npm install recharts
# create: store/selectors/statisticsSelectors.ts, pages/account/statistics/*
```

---

## 9. Progress log

- [x] PR 1 - Setup & config
- [ ] PR 2 - Core structure & routing
- [ ] PR 3 - Auth
- [ ] PR 4 - Catalog
- [ ] PR 5 - Product item
- [ ] PR 6 - Cart
- [ ] PR 7 - Delivery / checkout
- [ ] PR 8 - Account: Personal Info
- [ ] PR 9 - Account: Preferences
- [ ] PR 10 - Account: Statistics
