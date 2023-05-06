import { TodoInput } from './todo-input'
import { TodoList } from './todo-list'
import { TodoFooter } from './todo-footer'

export function App () {
    console.log('render App')

    return (
        <section
            className="todo-app"
            display="flex"
            flex="col"
            space="y-4"
            w="xl"
        >
            <header>
                <h1
                    text="opacity-15 8xl pink-900"
                    align="center"
                    font="sans 100"
                    m="b-2"
                >todos</h1>
            </header>
            <section
                className="todo-body"
                display="flex"
                flex="col"
                bg="light-50"
                text="xl break-words dark-50/50"
                font="300"
            >
                <TodoInput />
                <TodoList />
                <TodoFooter />
            </section>
        </section>
    )
}

