export type Token<T> = {
    readonly key: symbol
    readonly name: string
    readonly _type?: T
}

export const createToken = <T>(name: string): Token<T> => ({
    key: Symbol(name),
    name,
})

// Учебный контейнер: хранит готовые экземпляры без автоматической сборки.
export class Container {
    private readonly instances = new Map<symbol, unknown>()

    register<T>(token: Token<T>, instance: NoInfer<T>): void {
        this.instances.set(token.key, instance)
    }

    get<T>(token: Token<T>): T {
        if (!this.instances.has(token.key)) {
            throw new Error(`Service "${token.name}" is not registered`)
        }

        return this.instances.get(token.key) as T
    }
}

export const diContainer = new Container()
