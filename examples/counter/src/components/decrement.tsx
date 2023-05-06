import { countHooks } from '../store/count'

export function Decrement () {
    const decrement = countHooks.useDecrement()

    console.log('render Decrement')

    return (
        <button type="button" text="2xl green-500" onClick={decrement}>
            -
        </button>
    )
}
