import path from 'node:path'

// Порядок слоёв из статьи: импортировать можно свой слой и нижележащие.
const layers = ['app', 'pages', 'features', 'infrastructure', 'shared']
const aliases = { app: 'app', pages: 'pages', features: 'features', infra: 'infrastructure', shared: 'shared' }
const normalize = value => value.replace(/\\/g, '/')

const getModule = sourcePath => {
    const [layer, moduleName, ...segments] = normalize(sourcePath).split('/').filter(Boolean)
    if (!layers.includes(layer)) return null
    return { layer, moduleName, isFeatureRoot: layer === 'features' && segments.length === 0 }
}

const insideSrc = filename => {
    const marker = '/src/'
    const normalized = normalize(filename)
    const index = normalized.lastIndexOf(marker)
    return index === -1 ? null : normalized.slice(index + marker.length)
}

const getTarget = (source, filename) => {
    if (source.startsWith('.')) {
        const relative = insideSrc(path.resolve(path.dirname(filename), source))
        return relative === null ? null : getModule(relative)
    }
    const [alias, ...rest] = source.split('/')
    const layer = aliases[alias.slice(1)]
    return alias.startsWith('@') && layer ? getModule([layer, ...rest].join('/')) : null
}

const isTypeOnly = node =>
    node.importKind === 'type' ||
    node.exportKind === 'type' ||
    (node.specifiers?.length > 0 && node.specifiers.every(specifier =>
        specifier.importKind === 'type' || specifier.exportKind === 'type',
    ))

export default {
    rules: {
        'import-direction': {
            meta: {
                type: 'problem',
                schema: [],
                messages: {
                    layer: "Слой '{{from}}' не может импортировать вышележащий слой '{{to}}'.",
                    feature: 'Между разными фичами разрешены только type-only импорты.',
                    page: 'Импорты между разными страницами запрещены.',
                    root: 'Импортируйте через публичный вход фичи: /model, /services, /di или /ui, а не через её корень.',
                },
            },
            create(context) {
                const relative = insideSrc(context.filename)
                const from = relative === null ? null : getModule(relative)
                if (!from) return {}

                const check = (node, source, typeOnly = false) => {
                    if (typeof source !== 'string') return
                    const to = getTarget(source, context.filename)
                    if (!to) return

                    let messageId
                    if (to.isFeatureRoot) messageId = 'root'
                    else if (layers.indexOf(to.layer) < layers.indexOf(from.layer)) messageId = 'layer'
                    else if (from.layer === to.layer && from.moduleName !== to.moduleName) {
                        if (from.layer === 'features' && !typeOnly) messageId = 'feature'
                        if (from.layer === 'pages') messageId = 'page'
                    }

                    if (messageId) {
                        context.report({ node, messageId, data: { from: from.layer, to: to.layer } })
                    }
                }

                return {
                    ImportDeclaration(node) {
                        check(node.source, node.source.value, isTypeOnly(node))
                    },
                    ExportNamedDeclaration(node) {
                        if (node.source) check(node.source, node.source.value, isTypeOnly(node))
                    },
                    ExportAllDeclaration(node) {
                        check(node.source, node.source.value, isTypeOnly(node))
                    },
                    ImportExpression(node) {
                        check(node.source, node.source.value)
                    },
                }
            },
        },
    },
}
