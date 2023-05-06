const rawPrototypeWeakMap = new WeakMap<Record<string, unknown>, unknown>()

export const derive = <T extends Record<string, unknown>>(
    toDerive: T,
): T => {
    const derived = Object.create(toDerive) as T

    rawPrototypeWeakMap.set(derived, toDerive)

    return derived
}

export const toRaw = <T extends Record<string, unknown>>(derived: T): T => {
    const prototype = (rawPrototypeWeakMap.get(derived) ?? derived) as T

    return Object.getOwnPropertyNames(prototype).reduce(
        (raw, propertyName: keyof T) => {
            raw[propertyName] = prototype[propertyName]
            return raw
        },
        {} as T,
    )
}