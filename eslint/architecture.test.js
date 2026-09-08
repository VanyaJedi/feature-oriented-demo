import assert from 'node:assert/strict'
import path from 'node:path'
import { test } from 'node:test'
import { ESLint } from 'eslint'

const eslint = new ESLint()
const checkedRules = new Set([
    'architecture/import-direction', 'no-restricted-globals', 'no-restricted-properties',
])

const cases = [
    ['app собирает фичи', 'app/di/example.ts', "import { Service } from '@features/checkout/services'", null],
    ['страница использует фичу', 'pages/catalog/example.ts', "import { Service } from '@features/catalog/services'", null],
    ['своя фича', 'features/checkout/hooks/example.ts', "import { Service } from '../services'", null],
    ['type-only между фичами', 'features/checkout/model/example.ts', "import type { Product } from '@features/catalog/model'", null],
    ['inline type-only', 'features/checkout/model/example.ts', "import { type Product } from '@features/catalog/model'", null],
    ['type-only реэкспорт', 'features/checkout/model/example.ts', "export type { Product } from '@features/catalog/model'", null],
    ['внутренние зависимости infrastructure', 'infrastructure/http/example.ts', "import { session } from '../session'", null],
    ['runtime cross-import', 'features/checkout/services/example.ts', "import { Service } from '@features/catalog/services'", 'feature'],
    ['относительный cross-import', 'features/checkout/services/example.ts', "import { Service } from '../../catalog/services'", 'feature'],
    ['смешанный импорт', 'features/checkout/services/example.ts', "import { type Product, Service } from '@features/catalog/services'", 'feature'],
    ['динамический импорт', 'features/checkout/services/example.ts', "import('@features/catalog/services')", 'feature'],
    ['реэкспорт реализации', 'features/checkout/services/example.ts', "export { Service } from '@features/catalog/services'", 'feature'],
    ['реэкспорт всего модуля', 'features/checkout/services/example.ts', "export * from '@features/catalog/services'", 'feature'],
    ['feature не использует app', 'features/checkout/services/example.ts', "import type { App } from '@app/App'", 'layer'],
    ['infrastructure не использует app', 'infrastructure/di/example.ts', "import { app } from '@app/di'", 'layer'],
    ['shared не использует infrastructure', 'shared/utils/example.ts', "import { di } from '@infra/di'", 'layer'],
    ['страница не использует app', 'pages/catalog/example.ts', "import { App } from '@app/App'", 'layer'],
    ['разные страницы', 'pages/catalog/example.ts', "import { Checkout } from '@pages/checkout/ui'", 'page'],
    ['корень фичи', 'app/example.ts', "import { Service } from '@features/catalog'", 'root'],
    ['браузерный глобальный объект', 'features/catalog/services/example.ts', 'window.location', 'no-restricted-globals'],
    ['globalThis', 'features/catalog/services/example.ts', 'globalThis.window', 'no-restricted-properties'],
    ['строковый ключ', 'features/catalog/services/example.ts', "globalThis['localStorage']", 'no-restricted-properties'],
    ['деструктуризация', 'features/catalog/services/example.ts', 'const { window } = globalThis', 'no-restricted-properties'],
    ['платформенный адаптер', 'shared/platform/example.ts', 'globalThis.window?.localStorage', null],
]

for (const [name, file, code, expected] of cases) {
    test(name, async () => {
        const [result] = await eslint.lintText(code, { filePath: path.resolve('src', file) })
        assert.equal(result.fatalErrorCount, 0)
        const messages = result.messages.filter(item => checkedRules.has(item.ruleId))
        if (expected === null) assert.deepEqual(messages, [])
        else {
            assert.equal(messages.length, 1, JSON.stringify(messages))
            assert.equal(messages[0].ruleId === 'architecture/import-direction' ? messages[0].messageId : messages[0].ruleId, expected)
        }
    })
}
