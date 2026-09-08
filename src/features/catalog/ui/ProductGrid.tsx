import type { Product } from '../model'

type ProductGridProps = {
    products: Product[]
    onAdd: (product: Product) => void
}

const formatPrice = (price: number): string => new Intl.NumberFormat('ru-RU').format(price)

export function ProductGrid({ products, onAdd }: ProductGridProps) {
    return (
        <section className="catalog" aria-labelledby="catalog-title">
            <div className="section-heading">
                <div>
                    <span className="eyebrow">Моковая выдача</span>
                    <h2 id="catalog-title">Популярное сегодня</h2>
                </div>
                <span className="product-count">{products.length} товаров</span>
            </div>

            <div className="product-grid">
                {products.map(product => (
                    <article className="product-card" key={product.id}>
                        <div className={`product-visual product-visual--${product.id}`} aria-hidden="true">
                            <span>{product.emoji}</span>
                        </div>
                        <span className="product-category">{product.category}</span>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <div className="product-footer">
                            <strong>{formatPrice(product.price)} ₽</strong>
                            <button type="button" onClick={() => onAdd(product)}>
                                Добавить
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
