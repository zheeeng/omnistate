import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/app'
import { TodoProvider } from './store/todo'
import { VisibilityFilterProvider } from './store/visibility-filter'

ReactDOM.render(
    <React.StrictMode>
        <TodoProvider>
            <VisibilityFilterProvider>
                <App />
            </VisibilityFilterProvider>
        </TodoProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
