import React from 'react'
import { Reactive, UseReactiveOptions } from './types'
import { createReactive } from './utils/create-reactive'
import { derive } from './utils/derive'

export { Reactive, UseReactiveOptions }

export function useReactive<T, O extends Required<UseReactiveOptions<T>>> (toReactive: T, { accessors = [], methods = [] }: O): Reactive<T, O> {
    type AccessorValue = T[O['accessors'][number]]
    type MethodValue = T[O['methods'][number]] & ((...args: unknown[]) => unknown)

    const [, forceUpdate] = React.useReducer((times: number) => times + 1, 0)

    const [staticToReactive] = React.useState(toReactive)
    const [staticAccessors] = React.useState(accessors)
    const [staticMethods] = React.useState(methods)

    // This code block could be expanded statically, and them are collected to accessorEntries:
    // useState
    // ...
    // useCallback(getter)
    // useCallback(setter)
    //  ...
    // useState
    // ...
    // useCallback(getter)
    // useCallback(setter)
    const accessorEntries = staticAccessors.map(accessor => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [accessorValue, setAccessorValue] = React.useState(() => staticToReactive[accessor])
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const accessorGetter = React.useCallback(
            () => staticToReactive[accessor],
            [accessor],
        )
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const accessorSetter = React.useCallback(
            (newValue: AccessorValue) => {
                staticToReactive[accessor] = newValue
                setAccessorValue(staticToReactive[accessor])
            },
            [accessor],
        )

        return [accessor, accessorValue, accessorGetter, accessorSetter] as
            [accessor: string, value: AccessorValue, getter: () => AccessorValue, setter: (newValue: AccessorValue) => void]
    })

    // This code block could be expanded statically, and them are collected to methodEntries:
    // useCallback
    // ...
    // useCallback
    //  ...
    // useCallback
    // ...
    // useCallback
    const methodEntries = staticMethods.map(method => {
        // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
        const methodAlternative = React.useCallback(
            ((...args) => {
                const ret = (staticToReactive[method] as MethodValue)(...args)
                forceUpdate()
                return ret
            }) as MethodValue,
            [method],
        )

        return [method, methodAlternative] as [method: string, methodAlternative: MethodValue]
    })

    const [reactivePrototype] = React.useState(() => createReactive<Reactive<T, O>>([...accessorEntries, ...methodEntries]))

    // This code block could be expanded statically, and them are collected to an array with fixed length:
    const staticReactiveDeps = accessorEntries.map(([, value]) => value)

    const reactive = React.useMemo<Reactive<T, O>>(
        () => derive(reactivePrototype),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        staticReactiveDeps,
    )

    return reactive
}
