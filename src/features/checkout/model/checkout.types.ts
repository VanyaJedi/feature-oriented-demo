import type { Product } from '@features/catalog/model'

export type OrderInput = { products: Product[] }
export type Order = { id: string; summary: CheckoutSummary }

export type CheckoutItem = Pick<Product, 'id' | 'price' | 'title'> & {
    quantity: number
}

export type CheckoutSummary = {
    delivery: number
    items: CheckoutItem[]
    subtotal: number
    total: number
}
