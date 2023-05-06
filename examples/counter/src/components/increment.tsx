import { countHooks } from '../store/count'

export function Increment () {
    const increment = countHooks.useIncrement()

    console.log('render Increment')

    return (
        <button type="button" text="2xl red-500" onClick={increment}>
            +
        </button>
    )
}
