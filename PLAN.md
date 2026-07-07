# Shop Application — Technical Plan

> Single source of truth for architecture and delivery. Kept across sessions.
> Stack: React + TypeScript (Vite), MUI, Redux Toolkit (+ Context when needed),
> React Hook Form + Yup, ESLint + Prettier, Vitest. No backend, no real auth.

---

## 1. Key decisions

| Concern      | Decision                                                                                                                                         | Rationale                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Build tool   | Vite + React + TS                                                                                                                                | Fast, first-class Vitest integration                                                                                                                                                       |
| Persistence  | In-memory only (Redux state, no persistence layer)                                                                                               | Cleared on refresh and on tab/window close, per original spec; no `redux-persist` dependency                                                                                               |
| Catalog data | Static seed `src/data/products.ts`                                                                                                               | No backend; only user state (cart/orders/account) is mutable                                                                                                                               |
| Global state | Redux Toolkit for app **data**                                                                                                                   | cart, orders, auth, account, preferences                                                                                                                                                   |
| Context      | UI ephemera only                                                                                                                                 | Snackbar/notifications + theme bridge                                                                                                                                                      |
| Routing      | React Router v6 nested layout routes                                                                                                             | Layout composition + fake-auth guard                                                                                                                                                       |
| Forms        | React Hook Form + Yup (`yupResolver`)                                                                                                            | One schema per form, colocated with page                                                                                                                                                   |
| Theming      | Custom MUI `createTheme` (component defaults) + same tokens mirrored as CSS custom properties on `:root`                                         | "MUI but looks different"; CSS vars available to plain SCSS files                                                                                                                          |
| Styling      | Global Sass (`.scss`, not CSS Modules) + CSS variables; one semantic kebab-case root class per component, children nested via plain SCSS nesting | Colocated, framework-agnostic styling instead of emotion-generated classes from `styled()`/`sx`; hierarchy visible directly in the file instead of behind a `styles.x` object              |
| Imports      | External packages (alphabetized) → project-relative (alphabetized), ESLint-enforced                                                              | Consistent, mechanically checked import ordering; `eslint-plugin-import`'s `import/order` can't reliably pin React ahead of other packages within one group, so React sorts alongside them |

---

## 2. State ownership

**Redux reducers** (each in its own `src/store/<name>/reducer.ts` — no shared
`slices/` or `selectors/` folder)

- `auth` — `{ user, isLoggedIn }`. Fake login/signup populates this.
- `cart` — `{ items: [{ productId, quantity }] }`. add / remove / setQuantity / clear.
- `order` — `{ orders: Order[] }`. Checkout pushes here; feeds Statistics.
- `preferences` — `{ themeMode, currency, language }`. Drives theme.
- `filter` — catalog search term, category, sort.

`src/store/rootReducer.ts` combines them; `src/store/index.ts` only holds store
config (configureStore).

**Context** (`src/context/`, one file per context — see §5)

- `NotificationContext.tsx` — snackbar/toast.
- `ThemeModeContext.tsx` — `ThemeModeProvider` builds the MUI theme; will read
  `preferences.themeMode` from Redux once that reducer lands (PR9).

**Derived (selectors, colocated with their reducer folder, no separate slice)**

- Cart totals/counts → `store/cart/selectors.ts` (memoized with `createSelector`).
- Statistics (total spent, order count, items bought, favorite category, avg order value)
  → `store/order/selectors.ts`, derived over `order` state.

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
    index.ts                # configureStore + RootState / AppDispatch
    rootReducer.ts          # combineReducers — imports each reducer folder
    hooks.ts                # typed useAppDispatch / useAppSelector ONLY
    auth/
      reducer.ts
    cart/
      reducer.ts
      selectors.ts
    order/
      reducer.ts
      selectors.ts          # statistics selectors
    preferences/
      reducer.ts
    filter/
      reducer.ts
  pages/                    # presentational, thin — folder per component
    auth/
      login-page/
        LoginPage.tsx
        LoginPage.scss
        LoginPage.test.tsx
        loginSchema.ts       # schema colocated
      signup-page/
        SignupPage.tsx
        SignupPage.scss
        SignupPage.test.tsx
        signupSchema.ts
    catalog/                # ProductList, ProductCard, Filters — each its own folder
    product/                # ProductDetailPage
    cart/                   # CartPage
    delivery/
      checkout-page/
        CheckoutPage.tsx
        CheckoutPage.scss
        CheckoutPage.test.tsx
        deliverySchema.ts
    account/
      AccountLayout.tsx      # Tabs nav + Outlet — root files of the page itself
      AccountLayout.scss
      AccountLayout.test.tsx
      constants.ts           # ACCOUNT_TABS
      types.ts                # IAccountTab
      component/              # page-local child components (see §5)
        personal-info/
          PersonalInfo.tsx
          PersonalInfo.scss
          PersonalInfo.test.tsx
        preferences/
          Preferences.tsx
          Preferences.scss
          Preferences.test.tsx
        statistics/
          Statistics.tsx
          Statistics.scss
          Statistics.test.tsx
  routes/                   # ROUTES path constants + AppRoutes (the <Routes> tree,
                             # rendered inside BrowserRouter in App.tsx)
    constants.ts
    AppRoutes.tsx
  hooks/                    # reusable hooks with NO Context/store dependency
                             # (useCart, useDebounce) — context hooks live inside
                             # their context/*.tsx file; store hooks live in
                             # store/hooks.ts
  context/                  # one file per context: interface + createContext +
                             # Provider + consuming hook, all together
    NotificationContext.tsx
    ThemeModeContext.tsx
  components/               # shared UI reused ACROSS pages — layouts, ProtectedRoute
    layouts/
      main-layout/
        MainLayout.tsx
        MainLayout.scss
        MainLayout.test.tsx
      auth-layout/
        AuthLayout.tsx
        AuthLayout.scss
        AuthLayout.test.tsx
  theme/                    # MUI createTheme + color tokens only — the
                             # ThemeModeProvider itself lives in context/
  styles/
    variables.scss          # :root CSS custom properties, imported once in main.tsx
  data/products.ts          # seed catalog
  types/
  utils/                    # general reusable constants (UPPER_CASE, e.g.
                             # TIME_DURATIONS, EMAIL_REGEX) + pure-function
                             # helpers (formatCurrency, formatDate), split
                             # per domain (date.ts, currency.ts, ...) — populated
                             # once a PR actually needs one
  test/                     # setup.ts, renderWithProviders
```

**hooks distinction:** `store/hooks.ts` = typed Redux hooks only. Context hooks
(`useNotification`, `useThemeMode`) live inside their own `context/*.tsx` file,
never in `src/hooks/`. `src/hooks/` is reserved for reusable hooks with no
Context/store dependency (`useCart`, `useDebounce`).

**utils convention:** `src/utils/` holds general-purpose, reusable constants
(`UPPER_CASE`, e.g. `TIME_DURATIONS`, `EMAIL_REGEX`) and pure-function helpers
(`formatCurrency`, `formatDate`), split into per-domain files (`date.ts`,
`currency.ts`) rather than one catch-all file. Populated as PRs actually need one —
not scaffolded speculatively.

**schemas:** colocated per form page (each schema serves one form).

**store folder convention:** `store/index.ts` only configures the store
(configureStore only, no persistence layer). `store/rootReducer.ts` combines every
reducer. Each reducer gets its own folder (`store/<name>/`) holding `reducer.ts` and
any related files (`selectors.ts`, types, etc.) for that reducer — no shared
`slices/` or `selectors/` folder.

**component folder convention:** every component (page or shared) lives in its own
kebab-case folder containing its PascalCase files: `Component.tsx`,
`Component.scss`, `Component.test.tsx` (see §5 Coding conventions). When a
component has local constant data or local types, they're extracted into sibling
`constants.ts` / `types.ts` files in the same folder rather than defined inline.

**pages vs. components:** a page's own root files (`Page.tsx` + its `.scss`/
`.test.tsx` + any page-only `constants.ts`/`types.ts`/hooks) sit directly in the
page's folder under `pages/`. If a page needs child components of its own (not
just data), they go in a page-local `component/` folder inside that same page
folder (e.g. `pages/account/component/personal-info/`) — not the top-level
`src/components/`, which is reserved for UI genuinely reused across multiple pages
(the 3 layouts, `ProtectedRoute`).

---

## 5. Coding conventions

- **TypeScript everywhere** — no `.js`/`.jsx` files; strict mode (set in PR1).
- **Component folders** — kebab-case folder name, PascalCase filenames inside
  (`login-page/LoginPage.tsx`), one component per folder with its style module and
  test colocated.
- **Styling** — plain Sass, not CSS Modules: `Component.scss` imported as a
  side-effect (`import './Component.scss'`, no `styles` object). One semantic
  kebab-case root class per component (`.login-page`, `.main-layout`), matching the
  component's own name — never a generic `.root`. Children are plain nested
  selectors under the root class (`.toolbar`, `.content`), applied as literal string
  `className`s, so the DOM hierarchy is visible directly in the SCSS file. Always
  select by class — never by tag (`div`, `h1`) or `#id`. CSS custom properties for
  shared tokens (colors, spacing) live in `src/styles/variables.scss`. Avoid MUI
  `sx`/`styled()` for structural/visual styling (MUI props remain fine for behavior,
  e.g. `component=` swapping).
- **Tests** — colocated as `Component.test.tsx`.
- **Import order** — external packages (alphabetized), then project-relative
  imports (alphabetized), each group separated by a blank line; enforced by
  ESLint's `eslint-plugin-import` `import/order` rule (added in PR2 setup).
- **Constants and types** — never defined inline in a component/logic file; always
  in sibling files. Inside a component folder (one component per folder): generic
  `constants.ts` / `types.ts`. Inside a flat multi-file folder (e.g. `hooks/`, where
  `types.ts` alone would collide across files): suffix per file, e.g.
  `useCart.types.ts`. Constant identifiers are `UPPER_CASE` (`ACCOUNT_TABS`,
  `THEME_COLORS`).
- **Naming: types vs. interfaces** — every `interface` is prefixed `I`
  (`INotificationContextValue`, `IAccountTab`); every `type` alias is prefixed `T`
  (`TRootState`, `TAppDispatch`).
- **Context files** — one file per React Context in `src/context/<Name>Context.tsx`,
  holding everything together: the value interface, `createContext`, the `Provider`
  component, and the consuming hook (e.g. `useNotification`). This intentionally
  overrides `react-refresh/only-export-components` (a context module mixing a
  non-component export with a component is exactly the point), so each context file
  opens with a file-level `/* eslint-disable react-refresh/only-export-components
-- ... */` comment explaining why.
- **Route paths** — every route path is centralized in `routes/constants.ts` as
  `ROUTES` (`ROUTES.HOME`, `ROUTES.CART`, ...). Never hardcode a path string a
  second time once it exists there — `<Route path=...>`, `<Navigate to=...>`,
  `<Link to=...>`, and any nav-link/tab data array (`NAV_LINKS`, `ACCOUNT_TABS`)
  all reference `ROUTES` instead.

---

## 6. Routing

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

## 7. Testing (Vitest)

- Vitest + React Testing Library + `@testing-library/jest-dom` + user-event. No MSW.
- `renderWithProviders` helper: store + theme + router + notification context.
- Cover: reducers/selectors, form validation, key flows (add to cart, place order).

---

## 8. PR / commit roadmap

Reducers are introduced in the PR of their first consumer.

| PR                          | Scope                                                                                                   | Notes                |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------- |
| 1. Setup & config           | Vite scaffold, TS strict, ESLint, Prettier, Vitest+RTL, scripts, MUI base                               | one commit           |
| 2. Core structure & routing | store + typed hooks, providers, custom theme, 3 layouts, route tree + placeholders, ProtectedRoute, 404 |                      |
| 3. Auth                     | `auth` reducer, Login + Signup (RHF+Yup), fake login -> redirect                                        |                      |
| 4. Catalog                  | seed `products.ts`, `filter` reducer, grid + filters/search/sort                                        |                      |
| 5. Product item             | detail view; Add to cart -> introduces `cart` reducer                                                   |                      |
| 6. Cart                     | cart list, quantity stepper, totals, remove/clear                                                       |                      |
| 7. Delivery/checkout        | delivery form, place order -> `order` reducer, confirmation                                             | needs non-empty cart |
| 8. Account — Personal Info  | edit `auth.user`                                                                                        |                      |
| 9. Account — Preferences    | `preferences` reducer, theme toggle wired to ThemeModeProvider                                          |                      |
| 10. Account — Statistics    | selectors + MUI cards + Recharts charts                                                                 | needs orders         |

---

## 9. Kickoff commands per step

Run from the project root. Each PR starts on its own branch.

### PR 1 — Setup & config

```bash
# scaffold into current dir (keep .git, .claude, .idea, PLAN.md)
npm create vite@latest . -- --template react-ts
npm install

# runtime deps
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @reduxjs/toolkit react-redux react-router-dom
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
git checkout -b feature/core-structure-routing
npm install -D sass eslint-plugin-import
# create: src/store/index.ts (configureStore, in-memory only — no persistence),
#         src/store/rootReducer.ts, src/store/hooks.ts, src/components/layouts
#         (folder-per-component, .scss + .test.tsx), src/theme,
#         src/styles/variables.scss, src/pages placeholders, ProtectedRoute, router
# also: add `import/order` rule to eslint.config.js (react / external / project groups)
npm run dev
```

### PR 3 — Auth

```bash
git checkout -b feature/auth
# create: store/auth/reducer.ts, pages/auth/{login-page,signup-page}
npm run test
```

### PR 4 — Catalog

```bash
git checkout -b feature/catalog
# create: data/products.ts, store/filter/reducer.ts, pages/catalog/*
npm run dev
```

### PR 5 — Product item

```bash
git checkout -b feature/product-item
# create: pages/product/product-detail-page/ProductDetailPage.tsx, store/cart/reducer.ts, hooks/useCart.ts
```

### PR 6 — Cart

```bash
git checkout -b feature/cart
# create: pages/cart/cart-page/CartPage.tsx, store/cart/selectors.ts
```

### PR 7 — Delivery / checkout

```bash
git checkout -b feature/delivery-checkout
# create: store/order/reducer.ts, pages/delivery/checkout-page
```

### PR 8 — Account: Personal Info

```bash
git checkout -b feature/account-personal-info
# create: pages/account/component/personal-info/{PersonalInfo,personalInfoSchema}
```

### PR 9 — Account: Preferences

```bash
git checkout -b feature/account-preferences
# create: store/preferences/reducer.ts, pages/account/component/preferences/*
```

### PR 10 — Account: Statistics

```bash
git checkout -b feature/account-statistics
npm install recharts
# create: store/order/selectors.ts, pages/account/component/statistics/*
```

---

## 10. Progress log

- [x] PR 1 - Setup & config
- [x] PR 2 - Core structure & routing
- [ ] PR 3 - Auth
- [ ] PR 4 - Catalog
- [ ] PR 5 - Product item
- [ ] PR 6 - Cart
- [ ] PR 7 - Delivery / checkout
- [ ] PR 8 - Account: Personal Info
- [ ] PR 9 - Account: Preferences
- [ ] PR 10 - Account: Statistics
