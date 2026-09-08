const getGlobalObject = <T extends object>(key: string): T | null => {
    const value = (globalThis as Record<string, unknown>)[key]

    return value !== null && typeof value === 'object' ? (value as T) : null
}

export const getBrowserDocument = (): Document | null => getGlobalObject<Document>('document')
