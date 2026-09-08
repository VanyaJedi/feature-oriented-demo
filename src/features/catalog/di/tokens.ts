import { createToken } from '@infra/di'

import type { CatalogService } from '../services'

export const catalogServiceToken = createToken<CatalogService>('catalogService')
