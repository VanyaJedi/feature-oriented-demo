import { useState } from 'react'
import { useRecentItems } from '@features/recent-items/hooks/useRecentItems'
import { RecentItems } from '@features/recent-items/ui/RecentItems'
import { ProductDetails } from '@features/catalog/ui/ProductDetails'
import { useCatalog } from '@features/catalog/hooks'
import type { Product } from '@features/catalog/model'
import { ProductGrid } from '@features/catalog/ui'
import { useCheckout, useSummary } from '@features/checkout/hooks'
import { CheckoutPanel } from '@features/checkout/ui'

export function CatalogPage() {
    const { products } = useCatalog()
    const cart = useSummary()
    const checkout = useCheckout({ onSuccess: cart.clear })
    const recent = useRecentItems()
    const [selected, setSelected] = useState<Product | null>(null)
    const viewProduct = (product: Product) => {
        setSelected(product)
        recent.add(product.id)
    }
    const recentProducts = recent.ids.flatMap(id => {
        const product = products.find(item => item.id === id)
        return product ? [product] : []
    })

    const handleAdd = (product: Product): void => {
        if (checkout.reset()) cart.addProduct(product)
    }

    return (
        <div className="page-shell">
            <header className="hero">
                <div className="brand-mark">FM</div>
                <div>
                    <span className="eyebrow">Feature-oriented demo</span>
                    <h1>Простой маркетплейс</h1>
                    <p>Каталог, заказ, доставка и история просмотров.</p>
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
                <div>
                    {selected && (
                        <ProductDetails product={selected} onAdd={handleAdd} onClose={() => setSelected(null)} isAddingDisabled={checkout.isSubmitting} />
                    )}
                    <RecentItems products={recentProducts} error={recent.error} onView={viewProduct} onClear={recent.clear} />
                    <ProductGrid products={products} onAdd={handleAdd} onView={viewProduct} isAddingDisabled={checkout.isSubmitting} />
                </div>
                <CheckoutPanel
                    itemCount={cart.itemCount}
                    summary={cart.summary}
                    onClear={() => { if (checkout.reset()) cart.clear() }}
                    onPlaceOrder={() => { void checkout.placeOrder({ products: cart.products }) }}
                    isSubmitting={checkout.isSubmitting}
                    error={checkout.error}
                    orderId={checkout.orderId}
                />
            </main>
        </div>
    )
}
