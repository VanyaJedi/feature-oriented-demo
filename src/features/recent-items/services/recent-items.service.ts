import { getLocalStorage } from '@shared/platform'

const STORAGE_KEY = 'feature-oriented-demo:recent-items'
const LIMIT = 5

export class RecentItemsService {
    constructor(private readonly getStorage: () => Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> | null = getLocalStorage) {}

    private storage() {
        const storage = this.getStorage()
        if (!storage) throw new Error('Хранилище недоступно')
        return storage
    }

    getItems(): number[] {
        const raw = this.storage().getItem(STORAGE_KEY)
        if (!raw) return []
        const value: unknown = JSON.parse(raw)
        if (!Array.isArray(value) || !value.every(id => typeof id === 'number' && Number.isSafeInteger(id) && id > 0)) {
            throw new Error('Некорректная история просмотров')
        }
        return [...new Set(value as number[])].slice(0, LIMIT)
    }

    add(id: number): number[] {
        const items = [id, ...this.getItems().filter(item => item !== id)].slice(0, LIMIT)
        this.storage().setItem(STORAGE_KEY, JSON.stringify(items))
        return items
    }

    clear(): void {
        this.storage().removeItem(STORAGE_KEY)
    }
}
