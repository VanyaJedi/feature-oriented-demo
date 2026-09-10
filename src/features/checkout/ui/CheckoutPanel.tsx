import type { CheckoutSummary } from '../model'

type CheckoutPanelProps = {
    itemCount: number
    summary: CheckoutSummary
    onClear: () => void
    onPlaceOrder: () => void
    isSubmitting: boolean
    error: string | null
    orderId: string | null
}

const formatPrice = (price: number): string => `${new Intl.NumberFormat('ru-RU').format(price)} ₽`

export function CheckoutPanel({ itemCount, summary, onClear, onPlaceOrder, isSubmitting, error, orderId }: CheckoutPanelProps) {
    return (
        <aside className="checkout" aria-labelledby="checkout-title">
            <div className="checkout-heading">
                <div>
                    <span className="eyebrow">Checkout feature</span>
                    <h2 id="checkout-title">Ваш заказ</h2>
                </div>
                <span className="checkout-badge">{itemCount}</span>
            </div>

            {orderId && <p className="order-success" role="status">Демо-заказ {orderId} оформлен!</p>}
            {error && <p className="order-error" role="alert">{error}</p>}
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

                    <button className="primary-button" type="button" disabled={isSubmitting} onClick={onPlaceOrder}>
                        {isSubmitting ? 'Оформляем…' : 'Оформить заказ'}
                    </button>
                    <button className="clear-button" type="button" onClick={onClear} disabled={isSubmitting}>
                        Очистить
                    </button>
                </>
            )}
            <p className="order-demo-note">Учебный пример: реальный заказ не создаётся.</p>

            <div className="di-note">
                <span>DI</span>
                <p>
                    Checkout импортирует только тип <code>DeliveryPriceService</code> из delivery и получает экземпляр через DI.
                </p>
            </div>
        </aside>
    )
}
