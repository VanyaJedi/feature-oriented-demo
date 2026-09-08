import { createToken } from '@infra/di'

import type { DeliveryPriceProvider } from '../model'
import type { CheckoutService } from '../services'

export const deliveryPriceProviderToken = createToken<DeliveryPriceProvider>('deliveryPriceProvider')
export const checkoutServiceToken = createToken<CheckoutService>('checkoutService')
