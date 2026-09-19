# Feature-oriented demo

English · [Русский](README.md)

A minimal React example for an article about modular feature-oriented architecture.

The application contains four business modules:

- `catalog` owns products and product listing;
- `checkout` owns the order contents and total;
- `delivery` calculates the delivery price;
- `recent-items` stores the five most recently viewed products in `localStorage`.

To try the history, click “Details” for several products and then reload the page.
Viewing a product again moves it to the beginning of the list, while “Clear history”
removes the saved views. The order flow works as before. Only product IDs are stored;
product data comes from the catalog.

`RecentItemsService` accesses storage through `getLocalStorage` from
`shared/platform`. The hook calls the service through DI and manages the UI state.
If storage access, reading, or writing fails, the UI shows an error; no in-memory
fallback is used. Tests cover ordering, the item limit, restoring, clearing, and
errors.

`checkout` imports only the type of `DeliveryPriceService` from `delivery`. The `app`
layer calls `registerDeliveryServices`, gets an instance by its delivery token, and
passes it to `registerCheckoutServices`. A separate interface for a single
implementation is not needed.

```text
CatalogPage
├── catalog UI + useCatalog
└── checkout UI + useSummary + useCheckout
                    ↓
              CheckoutService
                    ↓
         DeliveryPriceService
```

## Running the demo

The verification tools require Node.js 20.19+, 22.13+, or 24+.

```bash
npm install
npm run dev
```

`npm test` runs the `CheckoutService` test suite with Vitest: a stub service returns
a delivery price of 150, so an order of 1000 has a total of 1150. The test creates
the service directly, without React or a DI container.

## Structure

```text
src/
├── app/              # composition root and root component
├── pages/            # composition of feature modules on the screen
├── features/
│   ├── catalog/      # mock products and listing UI
│   ├── checkout/     # order flow and delivery-service consumer
│   └── delivery/     # delivery-price implementation
├── infrastructure/
│   └── di/           # educational DI container and its instance
└── shared/
    └── platform/     # safe access to browser APIs
```

To demonstrate replaceable implementations, pass another object with a compatible
`calculate(subtotal: number): number` method to `registerCheckoutServices`. TypeScript
uses structural typing, so a separate interface for this replacement is not required.

## Educational DI container

The demo uses a local container from `src/infrastructure/di/container.ts`. It has no
dependencies on an internal DI package or a corporate npm registry.

`createToken<T>()` creates a unique typed token, `register(token, instance)` stores a
ready-made instance, and `get(token)` returns it. If a token has not been registered,
the container throws an error containing its name. Registering the same token again
replaces the instance.

Dependencies are passed explicitly when services are created:

```ts
container.register(
    checkoutServiceToken,
    new CheckoutService({
        deliveryPriceProvider: dependencies.deliveryPriceProvider,
    }),
)
```

That is why the delivery service is registered before checkout. All instances are
created when the application starts. There is no automatic name-based injection,
lazy loading, scopes, or resource-lifecycle management: the container exists only to
demonstrate how modules can be connected through tokens.

## ESLint architecture checks

```bash
npm run lint
npm run test:lint
```

The `architecture/import-direction` rule is located in `eslint/architecture.js`,
with configuration in `eslint.config.js`. It adapts a rule from the main project to
the demo layers: `app → pages → features → infrastructure → shared`.

- Dependencies on the current layer and any lower layer are allowed.
- Between different features, only type-only imports and re-exports are allowed.
- Imports between different pages are forbidden.
- The root import `@features/catalog` is forbidden; use entry points such as
  `@features/catalog/model` or `@features/catalog/di`.
- The rule checks demo aliases, relative paths, re-exports, and dynamic imports with
  string literals.
- Direct access to browser globals is forbidden. Access through `globalThis.window`
  and similar properties is allowed only in `shared/platform`.

For a file inside `features/checkout`:

```ts
// Allowed: a type dependency on a neighboring feature.
import type { Product } from '@features/catalog/model'

// Error: a runtime dependency on a neighboring feature.
import { CatalogService } from '@features/catalog/services'

// Error: an import from a higher layer.
import { App } from '@app/App'
```

`eslint/architecture.test.js` contains executable examples of allowed and forbidden
dependencies. This is an educational static check: it does not track computed
import paths, arbitrary `globalThis` aliases, cycles inside a layer, or API
availability checks in adapters. The public status of each nested feature file is
also not checked separately.

## Architecture and agent instructions

The decisions and constraints of this educational example are documented in
[ADR 0001](docs/adr/0001-architecture.md).

The `.agents/skills` directory contains two local skills:

- [adr-slice-auditor](.agents/skills/adr-slice-auditor/SKILL.md) — checks layers,
  imports, code placement, and explicit DI assembly;
- [platform-agnostic-frontend](.agents/skills/platform-agnostic-frontend/SKILL.md) —
  routes browser API access through adapters and defines behavior when those APIs are
  unavailable.

These instructions match the demo: they do not require internal libraries, corporate
infrastructure, or frameworks that are not project dependencies.

## Demo order flow

Add products and click “Place order”. `CheckoutService.placeOrder(OrderInput)`
validates the input, calculates the total, and simulates a request with an 800 ms
delay. `useSummary` stores the products and calculates the subtotal; `useCheckout`
stores `isSubmitting`, `error`, and `orderId`, and handles the result with
`try/catch/finally`, as in the article. While the request is in progress, changing
the cart and submitting again are disabled. On success, the cart is cleared and a
`DEMO-…` order number appears; on failure, the products remain for another attempt.
Order numbers are valid only during the current demo run; there is no backend.
