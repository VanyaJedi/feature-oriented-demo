import { QueryClient } from '@tanstack/react-query'

import { registerCatalogServices } from '@features/catalog/di'
import { registerCheckoutServices } from '@features/checkout/di'
import { deliveryPriceServiceToken, registerDeliveryServices } from '@features/delivery/di'
import { diContainer } from '@infra/di'
import { queryClientToken } from '@infra/query'
import { registerRecentItemsServices } from '@features/recent-items/di/registerRecentItemsServices'

export const registerApplicationServices = (): void => {
    diContainer.register(queryClientToken, new QueryClient({
        defaultOptions: {
            queries: { staleTime: 60_000 },
        },
    }))
    registerCatalogServices(diContainer)
    registerRecentItemsServices(diContainer)
    registerDeliveryServices(diContainer)
    registerCheckoutServices(diContainer, {
        deliveryPriceProvider: diContainer.get(deliveryPriceServiceToken),
    })
}
