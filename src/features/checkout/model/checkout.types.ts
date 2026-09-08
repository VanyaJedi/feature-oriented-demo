import type { Product } from '@features/catalog/model'

export type CheckoutItem = Pick<Product, 'id' | 'price' | 'title'> & {
    quantity: number
}

export type CheckoutSummary = {
    delivery: number
    items: CheckoutItem[]
    subtotal: number
    total: number
}
