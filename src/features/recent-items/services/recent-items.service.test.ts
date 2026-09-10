import { expect, it } from 'vitest'
import { RecentItemsService } from './recent-items.service'

const createStorage = () => {
    const data = new Map<string, string>()
    return {
        getItem: (key: string) => data.get(key) ?? null,
        setItem: (key: string, value: string) => { data.set(key, value) },
        removeItem: (key: string) => { data.delete(key) },
    }
}

it('сохраняет пять последних уникальных товаров и восстанавливает историю', () => {
    const storage = createStorage()
    const service = new RecentItemsService(() => storage)
    for (const id of [1, 2, 3, 4, 5, 6, 3]) service.add(id)
    const restored = new RecentItemsService(() => storage)
    expect(restored.getItems()).toEqual([3, 6, 5, 4, 2])
    restored.clear()
    expect(service.getItems()).toEqual([])
})

it('сообщает об отсутствии storage', () => {
    expect(() => new RecentItemsService(() => null).add(1)).toThrow()
})

it('не возвращает успешный результат при ошибке записи', () => {
    const storage = createStorage()
    storage.setItem = () => { throw new Error('Quota exceeded') }
    expect(() => new RecentItemsService(() => storage).add(1)).toThrow('Quota exceeded')
})

it('позволяет очистить повреждённую историю', () => {
    const storage = createStorage()
    storage.setItem('feature-oriented-demo:recent-items', '{broken')
    const service = new RecentItemsService(() => storage)
    expect(() => service.getItems()).toThrow()
    service.clear()
    expect(service.getItems()).toEqual([])
})
