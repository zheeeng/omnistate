type FunctionKeys<T> = {
    [key in keyof T]: T[key] extends (...args: unknown[]) => unknown ? key : never
}[keyof T]

export type UseReactiveOptions<T> = {
    accessors?: (keyof T)[]
    methods?: FunctionKeys<T>[]
}

type Compute<T> =
  true extends true
    ? { [key in keyof T]: T[key] }
    : unknown

export type Reactive<T, O extends Required<UseReactiveOptions<T>>> = Compute<Pick<T, O['accessors' | 'methods'][number] & keyof T>>
