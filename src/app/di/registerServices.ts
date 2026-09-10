import { registerCatalogServices } from '@features/catalog/di'
import { registerCheckoutServices } from '@features/checkout/di'
import { deliveryPriceServiceToken, registerDeliveryServices } from '@features/delivery/di'
import { diContainer } from '@infra/di'
import { registerRecentItemsServices } from '@features/recent-items/di/registerRecentItemsServices'

export const registerApplicationServices = (): void => {
    registerCatalogServices(diContainer)
    registerRecentItemsServices(diContainer)
    registerDeliveryServices(diContainer)
    registerCheckoutServices(diContainer, {
        deliveryPriceProvider: diContainer.get(deliveryPriceServiceToken),
    })
}
