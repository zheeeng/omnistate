import React from 'react'
import { canvasKitHooks } from '../store/external-canvas'
import { toRaw } from '@omnistate/reactive'

export function App () {
    const kit = canvasKitHooks.useKit()

    const move = React.useCallback(
        () => {
            kit.x += Math.random() * 5
            kit.y += Math.random() * 5

            console.log(toRaw(kit))

            kit.drawCircle()
        },
        [kit],
    )

    console.log('render App, canvasKit:', console.log(toRaw(kit)))

    return (
        <>
            <h1 className="title">React</h1>
            <p className="text">x: {kit.x}</p>
            <p className="text">y: {kit.y}</p>
            <button className="btn" onClick={move}>Draw by React</button>
            <p className="tip">Button calls the hooks which Omnistate provided, DOM are driven by React reactively.</p>
        </>
    )
}
