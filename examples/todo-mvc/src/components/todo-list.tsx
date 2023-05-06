import React from 'react'
import { Todo } from './todo'
import { todoHooks } from '../store/todo'
import { visibilityFilterHooks, VISIBILITY_FILTERS } from '../store/visibility-filter'

export function TodoList () {
    const todoList = todoHooks.useTodoList()
    const currentVisibilityFilter = visibilityFilterHooks.useCurrentVisibilityFilter()
    const filteredTodoList = React.useMemo(
        () => todoList.filter(
            todo =>
                currentVisibilityFilter === VISIBILITY_FILTERS.COMPLETED
                    ? todo.completed
                    : currentVisibilityFilter === VISIBILITY_FILTERS.ACTIVE
                        ? !todo.completed
                        : true
        ),
        [currentVisibilityFilter, todoList],
    )

    console.log('render TodoList')

    return (
        <ul display="flex" flex="col">
            {filteredTodoList?.map(todo =>
                (
                    <li key={`todo-${todo.id}`} display="flex" text="space-pre break-words">
                        <Todo todo={todo} />
                    </li>
                ))
            ?? 'No todos, yaPy!'}
        </ul>
    )
}
