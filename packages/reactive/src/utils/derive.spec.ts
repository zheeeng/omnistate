import { derive, toRaw } from './derive'

describe('basic example', () => {
    test('derive fn receives a prototype returns its inheritor', () => {
        const proto = { foo: 42, bar: () => 42 }
        const inheritor = derive(proto)

        expect(proto).not.toBe(inheritor)
        // eslint-disable-next-line no-prototype-builtins
        expect(proto.isPrototypeOf(inheritor)).toBe(true)
        expect(Object.getPrototypeOf(inheritor)).toBe(proto)
        expect(proto.foo).toBe(inheritor.foo)
        expect(proto.bar).toBe(inheritor.bar)
        expect(Object.keys(inheritor)).toHaveLength(0)
        expect(Object.keys(toRaw(inheritor))).toEqual(['foo', 'bar'])
    })

    test('update inheritor doesn\'t effect prototype', () => {
        const proto = { foo: 42, bar: () => 42 }
        const inheritor = derive(proto)

        inheritor.foo = 43

        expect(proto.foo).not.toBe(inheritor.foo)
    })
})

