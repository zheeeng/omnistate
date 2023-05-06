export class CanvasKit {
    #ctx: CanvasRenderingContext2D
    #width = 200
    #height = 200
    #x = 100
    #y = 100

    constructor (canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d')
        if (!ctx) {
            throw new Error('Not support canvas context!')
        }
        canvas.width = this.#width
        canvas.height = this.#height
        this.#ctx = ctx
    }

    get x () {
        return this.#x
    }

    // range: [0, this.#width]
    set x (val: number) {
        this.#x = (val + this.#width) % this.#width
    }

    get y () {
        return this.#y
    }

    // range: [-this.#height, this.#height]
    set y (val: number) {
        this.#y = val % this.#height
    }

    drawCircle () {
        this.#ctx.clearRect(0, 0, this.#width, this.#height)
        this.#ctx.beginPath()
        this.#ctx.arc(this.#x, this.#y, 10, 0, 2 * Math.PI)
        this.#ctx.fillStyle = 'red'
        this.#ctx.fill()
    }
}
