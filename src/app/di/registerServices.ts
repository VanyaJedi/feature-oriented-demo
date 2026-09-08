import { registerCatalogServices } from '@features/catalog/di'
import { deliveryPriceProviderToken, registerCheckoutServices } from '@features/checkout/di'
import { DeliveryPriceService } from '@features/delivery/services'
import { diContainer } from '@infra/di'

export const registerApplicationServices = (): void => {
    registerCatalogServices(diContainer)
    diContainer.register(deliveryPriceProviderToken, new DeliveryPriceService())
    registerCheckoutServices(diContainer)
}
