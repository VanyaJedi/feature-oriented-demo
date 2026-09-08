import { useCatalog } from '@features/catalog/hooks'
import type { Product } from '@features/catalog/model'
import { ProductGrid } from '@features/catalog/ui'
import { useCheckout } from '@features/checkout/hooks'
import { CheckoutPanel } from '@features/checkout/ui'

export function CatalogPage() {
    const { products } = useCatalog()
    const checkout = useCheckout()

    const handleAdd = (product: Product): void => {
        checkout.addProduct(product)
    }

    return (
        <div className="page-shell">
            <header className="hero">
                <div className="brand-mark">FM</div>
                <div>
                    <span className="eyebrow">Feature-oriented demo</span>
                    <h1>Простой маркетплейс</h1>
                    <p>Три независимых бизнес-модуля, связанные в composition root.</p>
                </div>
            </header>

            <div className="architecture-strip" aria-label="Схема взаимодействия модулей">
                <span>catalog</span>
                <i>+</i>
                <span>checkout</span>
                <i>→</i>
                <strong>DeliveryPriceService</strong>
                <i>←</i>
                <span>delivery</span>
            </div>

            <main className="market-layout">
                <ProductGrid products={products} onAdd={handleAdd} />
                <CheckoutPanel itemCount={checkout.itemCount} summary={checkout.summary} onClear={checkout.clear} />
            </main>
        </div>
    )
}
