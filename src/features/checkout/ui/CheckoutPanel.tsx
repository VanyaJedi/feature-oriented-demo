import type { CheckoutSummary } from '../model'

type CheckoutPanelProps = {
    itemCount: number
    summary: CheckoutSummary
    onClear: () => void
}

const formatPrice = (price: number): string => `${new Intl.NumberFormat('ru-RU').format(price)} ₽`

export function CheckoutPanel({ itemCount, summary, onClear }: CheckoutPanelProps) {
    return (
        <aside className="checkout" aria-labelledby="checkout-title">
            <div className="checkout-heading">
                <div>
                    <span className="eyebrow">Checkout feature</span>
                    <h2 id="checkout-title">Ваш заказ</h2>
                </div>
                <span className="checkout-badge">{itemCount}</span>
            </div>

            {summary.items.length === 0 ? (
                <div className="empty-state">
                    <span aria-hidden="true">🛍️</span>
                    <strong>Пока пусто</strong>
                    <p>Добавьте товары из выдачи, чтобы увидеть расчёт.</p>
                </div>
            ) : (
                <>
                    <ul className="checkout-items">
                        {summary.items.map(item => (
                            <li key={item.id}>
                                <span>
                                    {item.title}
                                    {item.quantity > 1 && <small> × {item.quantity}</small>}
                                </span>
                                <strong>{formatPrice(item.price * item.quantity)}</strong>
                            </li>
                        ))}
                    </ul>

                    <div className="summary-row">
                        <span>Товары</span>
                        <span>{formatPrice(summary.subtotal)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Доставка через DI</span>
                        <span className={summary.delivery === 0 ? 'free' : undefined}>
                            {summary.delivery === 0 ? 'Бесплатно' : formatPrice(summary.delivery)}
                        </span>
                    </div>
                    <div className="summary-total">
                        <span>Итого</span>
                        <strong>{formatPrice(summary.total)}</strong>
                    </div>

                    <button className="primary-button" type="button">
                        Оформить заказ
                    </button>
                    <button className="clear-button" type="button" onClick={onClear}>
                        Очистить
                    </button>
                </>
            )}

            <div className="di-note">
                <span>DI</span>
                <p>
                    Checkout знает только контракт <code>DeliveryPriceProvider</code>. Реализация находится в модуле delivery.
                </p>
            </div>
        </aside>
    )
}
