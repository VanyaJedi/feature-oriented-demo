import type { Product } from '@features/catalog/model'

export type DeliveryPriceProvider = {
    calculate(subtotal: number): number
}

export type CheckoutItem = Pick<Product, 'id' | 'price' | 'title'> & {
    quantity: number
}

export type CheckoutSummary = {
    delivery: number
    items: CheckoutItem[]
    subtotal: number
    total: number
}
