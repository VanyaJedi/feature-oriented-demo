import { useQuery } from '@tanstack/react-query'

import { diContainer } from '@infra/di'

import { catalogServiceToken } from '../di'

export const useCatalog = () => {
    const catalogService = diContainer.get(catalogServiceToken)
    const query = useQuery({
        queryKey: ['catalog', 'products'],
        queryFn: () => catalogService.getProducts(),
    })

    return {
        products: query.data ?? [],
        isPending: query.isPending,
        error: query.error,
    }
}
