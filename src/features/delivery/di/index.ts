import type { Container } from '@infra/di'
import { DeliveryPriceService } from '../services'
import { deliveryPriceServiceToken } from './tokens'

export { deliveryPriceServiceToken } from './tokens'

export const registerDeliveryServices = (container: Container): void => {
    container.register(deliveryPriceServiceToken, new DeliveryPriceService())
}
