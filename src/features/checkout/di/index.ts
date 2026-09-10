import type { Container } from '@infra/di'
import type { DeliveryPriceService } from '@features/delivery/services'

import { CheckoutService } from '../services'
import { checkoutServiceToken } from './tokens'

export { checkoutServiceToken } from './tokens'

export const registerCheckoutServices = (
    container: Container,
    dependencies: { deliveryPriceProvider: DeliveryPriceService },
): void => {
    container.register(
        checkoutServiceToken,
        new CheckoutService(dependencies),
    )
}
