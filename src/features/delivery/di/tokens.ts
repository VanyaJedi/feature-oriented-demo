import { createToken } from '@infra/di'
import type { DeliveryPriceService } from '../services'

export const deliveryPriceServiceToken = createToken<DeliveryPriceService>('deliveryPriceService')
