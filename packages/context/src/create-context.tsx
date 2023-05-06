import React from 'react'
import { capitalize } from './utils/capitalize'
import { createDummy } from './dummy'

type UseHooks<T> = {
    [Key in keyof T as `use${Capitalize<Key & string>}`]: (() => T[Key])
}

const isDev = process.env.NODE_ENV !== 'production'
const BRAND_DISPLAY_NAME_PREFIX = 'Omnistate_'
const HOOK_MARK = 'Hook_'

export function createContext <Props extends Record<string, unknown>, Value extends Record<string, unknown>> (
    useValue: (props: Props) => Value,
): [React.FC<Props>, UseHooks<Value>, Value] {
    const storeName = isDev ? (capitalize(useValue.name.replace(/^use/, '')) || '[anonymous]') : undefined

    const dummyHooksStore = createDummy<UseHooks<Value>>(storeName)
    const dummyExternalStore = createDummy<Value>(storeName)

    const SyncExternalStore = React.memo(function SyncExternalStore (value: Value) {
        React.useEffect(
            () => dummyExternalStore.fromEntries(Object.entries<Value[keyof Value]>(value as Record<string, Value[keyof Value]>)),
            [value],
        )

        React.useEffect(
            () => () => {
                dummyHooksStore.clear()
                dummyExternalStore.clear()
            },
            [],
        )

        return null
    })

    const Provider: React.FC<Props> = ({ children, ...props }) => {
        const value = useValue(props as Props)

        const [contextWithKeyList] = React.useState(
            () => {

                const contextWithKeyList = Object.entries(value).map(([key, fieldValue]) => {
                    const context = React.createContext(fieldValue)
                    const useContext = () => React.useContext(context)
                    const hookName = `use${capitalize(key)}`

                    if (isDev) {
                        context.displayName = `${BRAND_DISPLAY_NAME_PREFIX}${HOOK_MARK}${capitalize(hookName)}`
                    }

                    return {
                        hookName,
                        key,
                        context,
                        useContext,
                    }
                })

                dummyHooksStore.fromEntries(contextWithKeyList.map(({ hookName, useContext }) => [hookName, useContext] as [string, UseHooks<Value>[keyof UseHooks<Value>]]))

                return contextWithKeyList
            }
        )

        return contextWithKeyList.reduce<React.ReactElement>(
            (accChildren, currContextWithKey) => (
                <currContextWithKey.context.Provider value={value[currContextWithKey.key]}>
                    {accChildren}
                </currContextWithKey.context.Provider>
            ),
            <>
                {children}
                <SyncExternalStore {...value}/>
            </>
        )
    }

    if (isDev && storeName) {
        Provider.displayName = `${BRAND_DISPLAY_NAME_PREFIX}${storeName}Provider`
    }

    return [Provider, dummyHooksStore.store, dummyExternalStore.store]
}
