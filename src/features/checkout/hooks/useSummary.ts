import { useMemo, useState } from 'react'

import type { Product } from '@features/catalog/model'
import { diContainer } from '@infra/di'

import { checkoutServiceToken } from '../di'

export const useSummary = () => {
    const checkoutService = diContainer.get(checkoutServiceToken)
    const [products, setProducts] = useState<Product[]>([])
    const summary = useMemo(() => checkoutService.createSummary(products), [checkoutService, products])

    return {
        products,
        summary,
        itemCount: products.length,
        addProduct: (product: Product) => setProducts(current => [...current, product]),
        clear: () => setProducts([]),
    }
}
