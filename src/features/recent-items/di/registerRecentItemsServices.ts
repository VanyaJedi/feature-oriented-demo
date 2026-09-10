import type { Container } from '@infra/di'
import { RecentItemsService } from '../services/recent-items.service'
import { recentItemsServiceToken } from './tokens'

export const registerRecentItemsServices = (container: Container): void => {
    container.register(recentItemsServiceToken, new RecentItemsService())
}
