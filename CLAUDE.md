# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A React + TypeScript + Vite "Shop" demo app (MUI, Redux Toolkit, React Router v6, React Hook Form + Yup). No backend and no real authentication — everything is client-only. `PLAN.md` at the repo root is the living architecture/roadmap doc: read it before making structural changes, and keep it in sync when you make them (folder structure, key decisions table, coding conventions, PR roadmap, progress log).

## Commands

```bash
npm run dev           # start Vite dev server
npm run build         # tsc -b (typecheck) && vite build
npm run lint           # eslint .
npm run lint -- --fix  # eslint . --fix
npm run format         # prettier --write .
npm run format:check   # prettier --check .
npm run test           # vitest run (single pass, CI-style)
npm run test:watch     # vitest (watch mode)
```

Run a single test file: `npx vitest run src/path/to/Component.test.tsx`. Filter by test name: `npx vitest run -t "some test name"`.

There is no backend/dev server proxy — `npm run dev` is the entire local environment.

## Known placeholders — intentional, not bugs

These look like unfinished work but are deliberate at this stage of the project. Do not "fix" them without a PR that actually needs the real implementation:

- **`src/store/rootReducer.ts`** is `combineReducers({})` — intentionally empty. Each reducer is added here in the PR that first needs it.
- **`src/hooks/`** is currently empty. It's reserved for reusable hooks that depend on neither a Context nor the Redux store (e.g. a future `useCart`, `useDebounce`).
- **`src/utils/`** is currently empty. Populate it only when a PR actually needs it (see utils/ section below).

## Architecture

### State: Redux Toolkit, no persistence

Global data state is Redux Toolkit. There is **no persistence layer** (no redux-persist, no localStorage/sessionStorage) — Redux state is purely in-memory and clears on refresh or tab close, by design (see PLAN.md §1 "Persistence").

- `src/store/index.ts` — `configureStore` only (no middleware customization beyond defaults).
- `src/store/rootReducer.ts` — `combineReducers`, see "Known placeholders" above.
- Each reducer gets its own folder under `src/store/<name>/` (`reducer.ts` + any `selectors.ts`) — there is no shared `slices/` or `selectors/` folder.
- `src/store/hooks.ts` holds only the typed `useAppDispatch`/`useAppSelector`.

### Context: one file per context, on purpose

Every React Context lives in a single self-contained file under `src/context/<Name>Context.tsx`: the value interface, `createContext`, the `Provider` component, and the consuming hook (e.g. `useNotification`) are all colocated. This deliberately triggers `react-refresh/only-export-components`, so each context file opens with a file-level `/* eslint-disable react-refresh/only-export-components -- ... */` comment — this is intentional, not something to "fix" by splitting the file back apart.

`src/hooks/` is reserved for reusable hooks that depend on **neither** a Context **nor** the Redux store (e.g. a future `useCart`, `useDebounce`). Store-typed hooks live in `store/hooks.ts`; context-consuming hooks live inside their own context file.

### Pages vs. components

- `src/pages/<page>/` holds a routed page's own root files (`Page.tsx` + `.scss` + `.test.tsx`, plus any page-only `constants.ts`/`types.ts`/hooks).
- If a page needs child components of its own, they go in a **page-local** `components/` folder inside that page's folder (e.g. `pages/auth/login-page/components/login-form/LoginForm.tsx`) — not the top-level `src/components/`. (`pages/account/component/` is singular and predates this convention — not yet migrated; new page-local component folders use plural `components/`.)
- Top-level `src/components/` is reserved for UI genuinely reused **across multiple pages**: the 3 layouts (`MainLayout`, `AuthLayout`, and the page-specific `AccountLayout` is the exception — it lives in `pages/account/` since it's specific to one page). `ProtectedRoute` lives in `src/routes/` instead, alongside `constants.ts`/`AppRoutes.tsx` — it's routing/gating logic, not reusable UI.
- Every component (page or shared) lives in its own kebab-case folder with PascalCase files inside it.

### Controller hook + view component pattern

Any component with non-trivial logic — event handlers, local state, `useEffect`, form wiring, dispatch/navigation side effects — splits into two colocated files inside its own `components/<kebab-name>/` folder:

- `<Name>.tsx` — the view: pure presentation. It calls its `use<Name>Controller` hook and renders from what that hook returns; it doesn't call `useAppDispatch`/`useAppSelector`/`useNavigate`/`useForm` etc. directly.
- `use<Name>Controller.ts` — the controller: a hook (must keep the `use` prefix so `eslint-plugin-react-hooks` recognizes it) that owns all state, handlers, effects, and side effects, returning exactly what the view needs.

Every file colocated with a view takes that view's full name as a prefix — not just the domain name. For `LoginForm`, that's `useLoginFormController.ts` and `LoginFormSchema.ts`, not `useLoginController.ts`/`LoginSchema.ts`.

Example: `pages/auth/login-page/components/login-form/` holds `LoginForm.tsx` (view), `useLoginFormController.ts` (controller: RHF wiring, credential lookup, dispatch, redirect), `LoginFormSchema.ts` (Yup schema, PascalCase to match its sibling view/controller files — this supersedes the older page-level camelCase `loginSchema.ts` naming), `LoginForm.scss`, `LoginForm.test.tsx`. The page's own root file (`LoginPage.tsx`) stays a thin wrapper: heading + `<LoginForm />`.

This isn't limited to forms — any component whose logic is more than trivial JSX gets this split.

### Routing and auth

Route tree (see PLAN.md §6): `AuthLayout` wraps `/login` and `/signup`. `MainLayout` wraps Catalog, Product detail, and Cart — all public, no login required to browse. `ProtectedRoute` (`src/routes/ProtectedRoute.tsx`) gates only the Checkout route and the nested `AccountLayout` (personal-info/preferences/statistics tabs); an unauthenticated user hitting either is redirected to `/login` carrying the attempted location as router state, and lands back there after a successful login/signup via the `useAuthRedirect` hook (`src/hooks/useAuthRedirect.ts`) instead of always landing on Catalog.

### Styling

Plain global Sass, not CSS Modules: `Component.scss` is imported as a side-effect (`import './Component.scss'`), no `styles.x` object. Each component gets one semantic kebab-case root class matching its own name (`.login-page`, `.main-layout`) — never a generic `.root`. Children are plain nested selectors under that root class, applied as literal string `className`s, so the DOM hierarchy is visible directly in the SCSS file. Always select by class, never by tag or `#id`. Shared CSS custom properties live in `src/styles/variables.scss`; the same color tokens are duplicated (manually kept in sync) in `src/theme/constants.ts` for MUI's `createTheme`.

### Naming conventions

- Arrow functions everywhere, not `function` declarations (including default exports: `const X = () => {}; export default X`).
- Every `interface` is prefixed `I` (`IAccountTab`); every `type` alias is prefixed `T` (`TRootState`).
- Constants are `UPPER_CASE` and always live in a sibling `constants.ts` (never inline); types/interfaces always live in a sibling `types.ts` (never inline). In a flat multi-file folder where a generic `types.ts` would collide across files, suffix per file instead (`useCart.types.ts`). This applies to page/component-local constants and types — for app-wide, cross-domain constants, see `utils/` below.
- `useState` (and similar generic hooks) always gets an explicit type parameter, even when TypeScript could infer it from the initial value.
- Destructure objects/params wherever their fields are accessed, rather than dot-accessing (`.map(({ path, label }) => ...)`, not `.map((link) => link.path)`).
- Every route path is centralized in `routes/constants.ts` as `ROUTES` — never hardcode a path string a second time once it exists there.

### Code style: ESLint & Prettier

Formatting is fully delegated to Prettier — `eslint-config-prettier` is last in the ESLint `extends` list, so ESLint enforces no stylistic rules of its own (no semi/quote-style rules etc.), only correctness/logic ones (`js.configs.recommended`, `tseslint.configs.recommended`, `reactHooks`, `reactRefresh.configs.vite`, `jsxA11y`, `eslint-plugin-import`).

Prettier config (`.prettierrc.json`): no semicolons (`semi: false`), single quotes (`singleQuote: true`), trailing commas everywhere including function params (`trailingComma: "all"`), 80-char print width, 2-space indentation.

`import/order` (ESLint, enforced as an error): groups are `builtin` → `external` → `internal` (`@/**` alias imports — see Path aliases below) → `[parent, sibling, index]` (same-folder imports only, now that any cross-folder import uses the alias instead of `../`), a blank line required between each group, alphabetized case-insensitively within a group. This is **not** a strict "React first" grouping — `@mui/material` sorts before `react` alphabetically within `external`, and that's expected, not a bug to "fix" with a path-group override (already tried for that specific case; the plugin doesn't support it cleanly in the installed version).

### Path aliases

`@` maps to `src/` (configured in both `vite.config.ts`'s `resolve.alias` and `tsconfig.app.json`'s `paths`). Any import that leaves the current folder uses the alias — `@/routes/constants`, `@/store/hooks`, `@/pages/auth/login-page/LoginPage` — instead of a relative `../` specifier. Same-folder imports (`./Component.scss`, `./loginSchema`) stay relative. `import/order`'s `pathGroups` maps `@/**` to the `internal` group so alias imports sort in their own tier.

### TypeScript configuration

`strict: true` in both `tsconfig.app.json` and `tsconfig.node.json` (set in PR1). No other deviations from the Vite React-TS template's defaults.

### Testing conventions

Vitest + React Testing Library + `@testing-library/jest-dom` + `@testing-library/user-event`, `jsdom` environment (configured in `vite.config.ts`'s `test` block), global setup at `src/test/setup.ts` (imports `@testing-library/jest-dom`). Tests are colocated as `Component.test.tsx` next to the component. `src/test/renderWithProviders.tsx` wraps RTL's `render` with a Redux `Provider` (fresh `configureStore` per call, optional `preloadedState`) and a `MemoryRouter` (optional `route`/`state`), returning the render result plus the `store`. Use it for any component that reads/dispatches Redux state or needs router context; plain `render` is still fine for presentation-only components (see the layout tests).

### utils/

`src/utils/` (currently empty) is for general-purpose reusable constants (`UPPER_CASE`, e.g. time durations, regex patterns) and pure-function helpers (e.g. currency/date formatting), split per domain (`date.ts`, `currency.ts`) rather than one catch-all file — populate it only when a PR actually needs one. This is distinct from page/component-local `constants.ts` files (see Naming conventions above), which stay colocated with the code that uses them.

### Pre-commit checklist

Run before committing any changes:

- `npm run format` (or `format:check` if you just want to verify)
- `npm run lint`
- `npm run test`
- `npm run build`
