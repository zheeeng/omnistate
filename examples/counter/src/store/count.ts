import React from 'react'
import { createContext } from '@omnistate/context'

export const [CountProvider, countHooks] = createContext(
    function useCounter () {
        const [count, setCount] = React.useState(0)
        const increment = React.useCallback(() => setCount(prevCount => prevCount + 1), [])
        const decrement = React.useCallback(() => setCount(prevCount => prevCount - 1), [])
        return { count, increment, decrement }
    }
)
