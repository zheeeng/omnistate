export const createReactive = <T extends Record<string, unknown>>(
    descriptorEntries: [property: string, value: unknown, getter?: () => unknown, setter?: (value: never) => void][]
): T => {
    const reactive = {} as T

    descriptorEntries.forEach(([property, value, getter, setter]) => {
        const propertyDescriptor = getter ? { get: getter, set: setter } : { value }
        Object.defineProperty(reactive, property, propertyDescriptor)
    })

    return reactive
}
