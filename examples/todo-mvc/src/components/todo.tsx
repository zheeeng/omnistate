import React from 'react'
import { todoHooks } from '../store/todo'
import type { TodoItem } from '../types/todo-item'

export type TodoProps = {
    todo: TodoItem,
}

export function Todo ({ todo }: TodoProps) {
    const toggleTodo = todoHooks.useToggleTodo()
    const removeTodo = todoHooks.useRemoveTodo()

    const handleClickItem = React.useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation()
            toggleTodo(todo.id)
        },
        [todo.id, toggleTodo]
    )

    const handleClickClear = React.useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation()
            removeTodo(todo.id)
        },
        [todo.id, removeTodo]
    )

    console.log('render Todo:', todo)

    return (
        <div
            className="todo-item"
            display="flex"
            flex="row"
            w="full"
            cursor="pointer"
            onClick={handleClickItem}
        >
            <button
                className="todo-ctrl"
                type="button"
                box="border"
                display="flex"
                justify="center"
                align="items-center"
                flex="shrink-0"
            >
                <div
                    text={todo.completed ? 'green-500' : 'transparent'}
                    border="~ rounded-full"
                    display="flex"
                    align="items-center"
                    justify="center"
                    w="28px" h="28px"
                >
                    ✓
                </div>
            </button>
            <p
                className="todo-content"
                text={todo.completed ? 'line-through gray-400 opacity-20' : ''}
                flex="grow"
            >{todo.content}</p>
            <button
                className="todo-ctrl todo-closer"
                type="button"
                p="x-8"
                text="opacity-50 purple-500"
                onClick={handleClickClear}
            >✗</button>
        </div>
    )
}