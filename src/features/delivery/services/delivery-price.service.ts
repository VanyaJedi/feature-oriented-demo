const FREE_DELIVERY_THRESHOLD = 10_000
const DEFAULT_DELIVERY_PRICE = 399

export class DeliveryPriceService {
    calculate(subtotal: number): number {
        return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DEFAULT_DELIVERY_PRICE
    }
}
