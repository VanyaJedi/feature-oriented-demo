import { MOCK_PRODUCTS } from '../model/products.mock'
import type { Product } from '../model/product.types'

export class CatalogService {
    getProducts(): Promise<Product[]> {
        return Promise.resolve(MOCK_PRODUCTS)
    }
}
