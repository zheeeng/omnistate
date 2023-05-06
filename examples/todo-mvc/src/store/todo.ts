import React from 'react'
import { createContext } from '@omnistate/context'
import type { TodoItem } from '../types/todo-item'

export const [TodoProvider, todoHooks] = createContext(
    function useTodo () {
        const [todoList, setTodoList] = React.useState<TodoItem[]>([
            { completed: false, content: 'run', id: '0' },
            { completed: true, content: 'brush teeth', id: '1' },
            { completed: false, content: 'read a book', id: '2' },
        ])

        const isAllTodosCompleted = React.useMemo(
            () => todoList.every(todo => todo.completed),
            [todoList],
        )

        const addTodo = React.useCallback(
            (content: string) => setTodoList(todoList => [{ id: Math.random().toString(16).slice(2), content, completed: false }].concat(todoList)),
            [],
        )

        const removeTodo = React.useCallback(
            (id: string) => setTodoList(todoList => todoList.filter(todo => todo.id !== id)),
            [],
        )

        const toggleTodo = React.useCallback(
            (id: string) => setTodoList(todoList => todoList.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
            [],
        )

        const toggleAllTodos = React.useCallback(
            () => setTodoList(todoList => todoList.map(todo => ({ ...todo, completed: !isAllTodosCompleted }))),
            [isAllTodosCompleted],
        )

        const clearCompleted = React.useCallback(
            () => setTodoList(todoList => todoList.filter(todo => !todo.completed)),
            []
        )

        return {
            todoList,
            isAllTodosCompleted,
            addTodo,
            removeTodo,
            toggleTodo,
            toggleAllTodos,
            clearCompleted,
        }
    },
)
