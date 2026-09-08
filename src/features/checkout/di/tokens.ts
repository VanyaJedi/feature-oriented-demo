import type { DeliveryPriceService } from '@features/delivery/services'
import { createToken } from '@infra/di'

import type { CheckoutService } from '../services'

export const deliveryPriceProviderToken = createToken<DeliveryPriceService>('deliveryPriceProvider')
export const checkoutServiceToken = createToken<CheckoutService>('checkoutService')
