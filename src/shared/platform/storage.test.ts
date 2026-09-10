import { afterEach, expect, it, vi } from 'vitest'
import { getLocalStorage } from './storage'

afterEach(() => vi.unstubAllGlobals())

it('возвращает null вне браузера', () => {
    vi.stubGlobal('localStorage', undefined)
    expect(getLocalStorage()).toBeNull()
})

it('обрабатывает запрет доступа к storage', () => {
    const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
    Object.defineProperty(globalThis, 'localStorage', {
        configurable: true,
        get: () => { throw new Error('SecurityError') },
    })
    try {
        expect(getLocalStorage()).toBeNull()
    } finally {
        if (original) Object.defineProperty(globalThis, 'localStorage', original)
        else Reflect.deleteProperty(globalThis, 'localStorage')
    }
})
