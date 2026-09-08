import { useEffect, useState } from 'react'

import { diContainer } from '@infra/di'

import { catalogServiceToken } from '../di'
import type { Product } from '../model'

export const useCatalog = () => {
    const catalogService = diContainer.get(catalogServiceToken)
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        let isActive = true

        void catalogService.getProducts().then(items => {
            if (isActive) setProducts(items)
        })

        return () => {
            isActive = false
        }
    }, [catalogService])

    return { products }
}
