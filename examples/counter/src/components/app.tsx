import { Board } from './board'
import { Decrement } from './decrement'
import { Increment } from './increment'

export function App () {
    console.log('render App')

    return (
        <section display="flex" flex="col" space="y-2" m="t-4">
            <h1 text="center xl">Counter</h1>
            <Board />
            <div display="flex" justify="center" space="x-4">
                <Increment />
                <Decrement />
            </div>
        </section>
    )
}
