import type { Product } from '@features/catalog/model'
import type { DeliveryPriceService } from '@features/delivery/services'

import type { CheckoutItem, CheckoutSummary } from '../model'

export class CheckoutService {
    private readonly deliveryPriceProvider: DeliveryPriceService

    constructor({ deliveryPriceProvider }: { deliveryPriceProvider: DeliveryPriceService }) {
        this.deliveryPriceProvider = deliveryPriceProvider
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
