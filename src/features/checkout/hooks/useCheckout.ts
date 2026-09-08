import { useMemo, useState } from 'react'

import type { Product } from '@features/catalog/model'
import { diContainer } from '@infra/di'

import { checkoutServiceToken } from '../di'

export const useCheckout = () => {
    const checkoutService = diContainer.get(checkoutServiceToken)
    const [products, setProducts] = useState<Product[]>([])
    const summary = useMemo(() => checkoutService.createSummary(products), [checkoutService, products])

    return {
        addProduct: (product: Product) => setProducts(current => [...current, product]),
        clear: () => setProducts([]),
        itemCount: products.length,
        summary,
    }
}
