import React from 'react'
import { todoHooks } from '../store/todo'

export function TodoInput () {
    const isAllTodosCompleted = todoHooks.useIsAllTodosCompleted()
    const addTodo = todoHooks.useAddTodo()
    const toggleAllTodos = todoHooks.useToggleAllTodos()
    const [content, setContent] = React.useState('')

    const handleInputChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value),
        [setContent],
    )

    const handleSubmit = React.useCallback(
        (event: React.FormEvent<HTMLElement>) => {
            event.preventDefault()
            if (content) {
                addTodo(content)
                setContent('')
            }
        },
        [addTodo, content],
    )

    console.log('render TodoInput')

    return (
        <form
            onSubmit={handleSubmit}
            display="flex"
        >
            <button
                className="todo-ctrl"
                type="button"
                display="flex"
                justify="center"
                align="items-center"
                text={isAllTodosCompleted ? 'green-500' : 'gray-400'}
                title="Mark all as complete"
                onClick={toggleAllTodos}
            >
                ✓
            </button>
            <input
                className="todo-content input-placeholder-variant"
                type="text"
                p="r-8"
                border="none"
                outline="none"
                text="placeholder-light-800"
                value={content}
                onChange={handleInputChange}
                onBlur={handleSubmit}
                placeholder="what needs to be done?"
            />
        </form>
    )
}
