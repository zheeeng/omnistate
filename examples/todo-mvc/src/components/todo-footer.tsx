import { VisibilityFilters } from './visibility-filters'
import { todoHooks } from '../store/todo'

export function TodoFooter () {
    const todoList = todoHooks.useTodoList()
    const clearCompleted = todoHooks.useClearCompleted()

    console.log('render TodoFooter')

    return (
        <footer
            className="todo-footer"
            display="flex"
            justify="between"
            align="items-center"
            bg="light-400"
            p="x-12px y-8px"
            text="sm"
        >
            <div>{todoList.length} {todoList.length === 1 ? 'item' : 'items'} left</div>
            <VisibilityFilters />
            <div text="capitalize" onClick={clearCompleted}>Clear completed</div>
        </footer>
    )
}
