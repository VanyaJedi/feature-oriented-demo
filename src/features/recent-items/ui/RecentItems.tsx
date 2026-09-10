import type { Product } from '@features/catalog/model'

type Props = {
    products: Product[]
    error: string | null
    onView: (product: Product) => void
    onClear: () => void
}

export function RecentItems({ products, error, onView, onClear }: Props) {
    return (
        <section className="recent-items" aria-labelledby="recent-title">
            <div className="section-heading">
                <h2 id="recent-title">Недавно просмотренные</h2>
                <button type="button" onClick={onClear} disabled={!products.length && !error}>Очистить историю</button>
            </div>
            <p>Последние пять товаров. История сохраняется после перезагрузки страницы.</p>
            {error && <p role="alert">{error}</p>}
            {!products.length && !error && <p>Нажмите «Подробнее» у товара, чтобы он появился здесь.</p>}
            <ul className="recent-list">
                {products.map(product => (
                    <li key={product.id}>
                        <button type="button" onClick={() => onView(product)}>
                            <span aria-hidden="true">{product.emoji}</span> {product.title}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}
