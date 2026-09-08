import type { Container } from '@infra/di'

import { CatalogService } from '../services'
import { catalogServiceToken } from './tokens'

export { catalogServiceToken } from './tokens'

export const registerCatalogServices = (container: Container): void => {
    container.register(catalogServiceToken, new CatalogService())
}
