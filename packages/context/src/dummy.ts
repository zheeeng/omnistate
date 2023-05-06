import { dedent } from './utils/dedent'

export type Dummy<T extends Record<string, unknown>> = {
    store: T,
    fromEntries: (entries: [string, T[keyof T]][]) => void,
    clear: () => void,
}

export function createDummy <T extends Record<string, unknown>> (name?: string): Dummy<T> {
    const store = (() => {
        const record = <T>{}

        if (globalThis.Proxy && name) {
            return new Proxy(
                record,
                {
                    get: (target, key: string) => {
                        if (!Object.prototype.hasOwnProperty.call(target, key)) {
                            throw new Error(dedent(`

                            ------------------------------------------------------------
                            The property "${key}" does not exist on "${name}".
                                Read data which "${name}" provided fails.
                                Please make sure:
                                1. Your have rightly placed the provider of "${name}". See https://reactjs.org/docs/context.html#contextprovider for detail.".
                                2. Call the Omnistate hoo   ks after running React Application.
                            ------------------------------------------------------------

                            `))
                        } else {
                            return target[key]
                        }
                    },
                }
            )
        }

        return record
    })()

    const fromEntries = (entries: [keyof T, T[keyof T]][]) => {
        for (const [key, value] of entries) {
            store[key] = value
        }
    }

    const clear = () => {
        for (const key of Object.keys(store)) {
            delete store[key]
        }
    }

    return {
        store,
        fromEntries,
        clear,
    }
}
