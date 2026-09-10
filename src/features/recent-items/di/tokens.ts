import { createToken } from '@infra/di'
import type { RecentItemsService } from '../services/recent-items.service'

export const recentItemsServiceToken = createToken<RecentItemsService>('recentItemsService')
