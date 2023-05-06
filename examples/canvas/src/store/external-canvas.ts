import { createContext } from '@omnistate/context'
// import { useReactive } from 'omnistate/useReactive'
import { CanvasKit } from '../external/canvas-kit'
import { useReactive } from '@omnistate/reactive'


function useExternalCanvas ({ canvasKit }: { canvasKit: CanvasKit }) {
    const kit = useReactive(canvasKit, {
        accessors: ['x', 'y'],
        methods: ['drawCircle'],
    })

    return { kit }
}

export const [CanvasKitProvider, canvasKitHooks, canvasKitStore] = createContext(useExternalCanvas)

