import { useEffect, useState } from 'react'
import { diContainer } from '@infra/di'
import { recentItemsServiceToken } from '../di/tokens'

export const useRecentItems = () => {
    const service = diContainer.get(recentItemsServiceToken)
    const [ids, setIds] = useState<number[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        try {
            setIds(service.getItems())
        } catch {
            setError('Не удалось прочитать историю просмотров. Попробуйте очистить её.')
        }
    }, [service])

    const add = (id: number) => {
        try {
            setIds(service.add(id))
            setError(null)
        } catch {
            setError('Не удалось сохранить просмотр в истории.')
        }
    }

    const clear = () => {
        try {
            service.clear()
            setIds([])
            setError(null)
        } catch {
            setError('Не удалось очистить историю просмотров.')
        }
    }

    return { ids, error, add, clear }
}
