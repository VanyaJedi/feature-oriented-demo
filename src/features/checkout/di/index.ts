import type { Container } from '@infra/di'

import { CheckoutService } from '../services'
import { checkoutServiceToken, deliveryPriceProviderToken } from './tokens'

export { checkoutServiceToken, deliveryPriceProviderToken } from './tokens'

export const registerCheckoutServices = (container: Container): void => {
    container.register(
        checkoutServiceToken,
        new CheckoutService({
            deliveryPriceProvider: container.get(deliveryPriceProviderToken),
        }),
    )
}
