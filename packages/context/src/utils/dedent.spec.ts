import { dedent } from './dedent'

describe('basic example', () => {
    test('dedent indent word by `preservedIndent` param', () => {
        {
            // eslint-disable-next-line quotes
            const raw = `aaa`
            expect(dedent(raw)).toEqual('aaa')
            expect(dedent(raw, -1)).toEqual('aaa')
            expect(dedent(raw, 1)).toEqual(' aaa')
        }
    })

    test('dedent trim first line breaks', () => {
        {
            const raw = `
aaa`
            expect(dedent(raw)).toEqual('aaa')
            expect(dedent(raw, -1)).toEqual('aaa')
            expect(dedent(raw, 1)).toEqual(' aaa')
        }

        {
            const raw = `

aaa`
            expect(dedent(raw)).toEqual('\n' + 'aaa')
            expect(dedent(raw, -1)).toEqual('\n' + 'aaa')
            expect(dedent(raw, 1)).toEqual('\n' + ' aaa')
        }

        {
            // three spaces at the second line
            const raw = `
   
aaa`
            expect(dedent(raw)).toEqual('   \n' + 'aaa')
            expect(dedent(raw, -1)).toEqual('   \n' + 'aaa')
            expect(dedent(raw, 1)).toEqual('    \n' + ' aaa')
        }
        {
            // three spaces at first two lines
            const raw = `   
   
aaa`
            expect(dedent(raw)).toEqual('   \n' + '   \n' + 'aaa')
            expect(dedent(raw, -1)).toEqual('   \n' + '   \n' + 'aaa')
            expect(dedent(raw, 1)).toEqual('    \n' + '    \n' + ' aaa')
        }

    })

    test('dedent trim last line breaks', () => {
        {
            const raw = `aaa
`
            expect(dedent(raw)).toEqual('aaa')
            expect(dedent(raw, -1)).toEqual('aaa')
            expect(dedent(raw, 1)).toEqual(' aaa')
        }

        {
            const raw = `aaa

`
            expect(dedent(raw)).toEqual('aaa\n')
            expect(dedent(raw, -1)).toEqual('aaa\n')
            expect(dedent(raw, 1)).toEqual(' aaa\n')
        }

        {
            // three spaces at the last second line
            const raw = `aaa
   
`
            expect(dedent(raw)).toEqual('aaa\n' + '   ')
            expect(dedent(raw, -1)).toEqual('aaa\n' + '   ')
            expect(dedent(raw, 1)).toEqual(' aaa\n' + '    ')
        }

        {
            // three spaces at the last two lines
            const raw = `aaa
   

`
            expect(dedent(raw)).toEqual('aaa\n' + '   \n' )
            expect(dedent(raw, -1)).toEqual('aaa\n' + '   \n')
            expect(dedent(raw, 1)).toEqual(' aaa\n' + '    \n')
        }
    })

    test('dedent does not effect the middle lines', () => {
        {
            const raw = `
            aaa

            bbb
`
            expect(dedent(raw)).toEqual('aaa\n' + '\n' + 'bbb')
        }

        {
            // there 12 spaces at the third line, for align them
            const raw = `
            aaa
            
            bbb
`
            expect(dedent(raw)).toEqual('aaa\n' + '\n' + 'bbb')
        }
    
        {
            // there 8 spaces at the third line, for break aligning them
            const raw = `
            aaa
        
            bbb
`
            expect(dedent(raw)).toEqual('    aaa\n' + '\n' + '    bbb')
        }
    })

    test('dedent content', () => {
        {
            const raw = `
a
 b
  c
   d
`
            expect(dedent(raw)).toEqual('a\n' + ' b\n' + '  c\n' + '   d')
            expect(dedent(raw, -1)).toEqual('a\n' + ' b\n' + '  c\n' + '   d')
            expect(dedent(raw, 3)).toEqual('   a\n' + '    b\n' + '     c\n' + '      d')
        }

        {
            const raw = `
a
 b
  c
   d
  e
 f
g
`
            expect(dedent(raw)).toEqual('a\n' + ' b\n' + '  c\n' + '   d\n' + '  e\n' + ' f\n' + 'g')
            expect(dedent(raw, -1)).toEqual('a\n' + ' b\n' + '  c\n' + '   d\n' + '  e\n' + ' f\n' + 'g')
            expect(dedent(raw, 3)).toEqual('   a\n' + '    b\n' + '     c\n' + '      d\n' + '     e\n' + '    f\n' + '   g')
        }

        {
            const raw = `
   a
    b
     c
      d
     e
    f
   g
`
            expect(dedent(raw)).toEqual('a\n' + ' b\n' + '  c\n' + '   d\n' + '  e\n' + ' f\n' + 'g')
            expect(dedent(raw, -1)).toEqual('a\n' + ' b\n' + '  c\n' + '   d\n' + '  e\n' + ' f\n' + 'g')
            expect(dedent(raw, 3)).toEqual('   a\n' + '    b\n' + '     c\n' + '      d\n' + '     e\n' + '    f\n' + '   g')
        }
        {
            const raw = `
     a
      b
       c
        d
       e
      f
     g
`
            expect(dedent(raw)).toEqual('a\n' + ' b\n' + '  c\n' + '   d\n' + '  e\n' + ' f\n' + 'g')
            expect(dedent(raw, -1)).toEqual('a\n' + ' b\n' + '  c\n' + '   d\n' + '  e\n' + ' f\n' + 'g')
            expect(dedent(raw, 3)).toEqual('   a\n' + '    b\n' + '     c\n' + '      d\n' + '     e\n' + '    f\n' + '   g')
        }
    })
})

