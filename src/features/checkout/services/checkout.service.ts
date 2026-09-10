import type { Product } from '@features/catalog/model'
import type { DeliveryPriceService } from '@features/delivery/services'

import type { CheckoutItem, CheckoutSummary, OrderInput, Order } from '../model'

export class CheckoutService {
    private nextOrderId = 1
    private readonly deliveryPriceProvider: DeliveryPriceService

    constructor({ deliveryPriceProvider }: { deliveryPriceProvider: DeliveryPriceService }) {
        this.deliveryPriceProvider = deliveryPriceProvider
    }

    async placeOrder(input: OrderInput): Promise<Order> {
        if (input.products.length === 0) throw new Error('Заказ не должен быть пустым')
        if (input.products.some(product => !Number.isFinite(product.price) || product.price < 0)) {
            throw new Error('Некорректная цена товара')
        }
        const summary = this.createSummary(input.products)
        // Имитация запроса: реальный заказ никуда не отправляется.
        await new Promise(resolve => setTimeout(resolve, 800))
        return { id: `DEMO-${this.nextOrderId++}`, summary }
    }

    createSummary(products: Product[]): CheckoutSummary {
        const itemsById = new Map<number, CheckoutItem>()

        for (const product of products) {
            const current = itemsById.get(product.id)
            itemsById.set(product.id, {
                id: product.id,
                price: product.price,
                quantity: (current?.quantity ?? 0) + 1,
                title: product.title,
            })
        }

        const items = [...itemsById.values()]
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const delivery = items.length === 0 ? 0 : this.deliveryPriceProvider.calculate(subtotal)

        return {
            delivery,
            items,
            subtotal,
            total: subtotal + delivery,
        }
    }
}
