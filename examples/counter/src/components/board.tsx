import { countHooks } from '../store/count'

export function Board () {
    const count = countHooks.useCount()

    console.log('render Board')

    return (
        <p text="center 4xl blue-500">{count}</p>
    )
}
