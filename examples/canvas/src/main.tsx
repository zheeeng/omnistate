import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { CanvasKit } from './external/canvas-kit'
import { App } from './components/app'
import { CanvasKitProvider, canvasKitStore } from './store/external-canvas'

const canvasNode = document.getElementById('canvas')

if (canvasNode instanceof HTMLCanvasElement) {
    const kit = new CanvasKit(canvasNode)

    {
        // Vanilla JS
        const $vanilla = document.querySelector('#vanilla')
        const $text1 = $vanilla?.querySelector('#text1')
        const $text2 = $vanilla?.querySelector('#text2')
        const $btn = $vanilla?.querySelector('#btn')

        if ($text1 && $text2 && $btn) {
            const renderText = () => {
                $text1.textContent = `x: ${kit.x}`
                $text2.textContent = `y: ${kit.y}`
            }
    
            $btn.addEventListener('click', () => {

                kit.x += Math.random() * 5
                kit.y += Math.random() * 5
    
                console.log(kit)
    
                kit.drawCircle()

                renderText()
            })

            renderText()
        }
    }


    {
        // React
        const $react = document.querySelector('#react')

        if ($react) {
            ReactDOM.render(
                <React.StrictMode>
                    <CanvasKitProvider canvasKit={kit}>
                        <App />
                    </CanvasKitProvider>
                </React.StrictMode>,
                $react,
            )
        }
    }

    {
        // Vanilla JS
        const $vanilla = document.querySelector('#bound')
        const $text1 = $vanilla?.querySelector('#text1')
        const $text2 = $vanilla?.querySelector('#text2')
        const $btn = $vanilla?.querySelector('#btn')

        if ($text1 && $text2 && $btn) {
            const renderText = () => {
                $text1.textContent = `x: ${kit.x}`
                $text2.textContent = `y: ${kit.y}`
            }
    
            $btn.addEventListener('click', () => {

                canvasKitStore.kit.x += Math.random() * 5
                canvasKitStore.kit.y += Math.random() * 5
    
                console.log(canvasKitStore.kit)
    
                canvasKitStore.kit.drawCircle()

                renderText()
            })

            renderText()
        }
    }
}
