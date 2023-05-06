import 'virtual:windi.css'
import 'virtual:windi-devtools'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/app'
import { CountProvider } from './store/count'


ReactDOM.render(
    <React.StrictMode>
        <CountProvider>
            <App />
        </CountProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
