import tseslint from 'typescript-eslint'
import architecture from './eslint/architecture.js'

const browserApis = [
    'window', 'document', 'navigator', 'localStorage', 'sessionStorage',
    'performance', 'requestAnimationFrame', 'cancelAnimationFrame',
    'ResizeObserver', 'IntersectionObserver', 'BroadcastChannel',
    'Worker', 'FileReader', 'Image',
]
const message = 'Используйте accessor из @shared/platform с проверкой доступности API.'

export default [
    { ignores: ['dist/**', 'node_modules/**', '**/*.tsbuildinfo'] },
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.{ts,tsx}'],
        plugins: { architecture },
        rules: {
            'architecture/import-direction': 'error',
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            'no-restricted-globals': ['error', ...browserApis.map(name => ({ name, message }))],
            'no-restricted-properties': [
                'error',
                ...browserApis.map(property => ({ object: 'globalThis', property, message })),
            ],
        },
    },
    {
        files: ['src/shared/platform/**/*.{ts,tsx}'],
        rules: {
            // Только адаптеры могут читать globalThis.window и другие API.
            'no-restricted-properties': 'off',
        },
    },
]
