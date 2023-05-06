import { capitalize } from './capitalize'

describe('basic example', () => {
    test('capitalize the first letter', () => {
        expect(capitalize('abc')).toEqual('Abc')
        expect(capitalize('foo bar')).toEqual('Foo bar')
        expect(capitalize('s_n_a_k_e')).toEqual('S_n_a_k_e')
    })

    test('don\'t change the first letter when it\'s uppercase', () => {
        expect(capitalize('Abc')).toEqual('Abc')
        expect(capitalize('Foo bar')).toEqual('Foo bar')
        expect(capitalize('S_n_a_k_e')).toEqual('S_n_a_k_e')
    })

    test('don\'t change the first letter when it\'s not an alphabet', () => {
        expect(capitalize('@foo')).toEqual('@foo')
        expect(capitalize('_bar')).toEqual('_bar')
        expect(capitalize('$baz')).toEqual('$baz')
        expect(capitalize('#42')).toEqual('#42')
        expect(capitalize('123')).toEqual('123')
        expect(capitalize('123abc')).toEqual('123abc')
    })
})

