import { createToken } from '@infra/di'

import type { CheckoutService } from '../services'

export const checkoutServiceToken = createToken<CheckoutService>('checkoutService')
