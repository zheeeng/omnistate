declare type FunctionKeys<T> = {
    [key in keyof T]: T[key] extends (...args: unknown[]) => unknown ? key : never;
}[keyof T];
declare type UseReactiveOptions<T> = {
    accessors?: (keyof T)[];
    methods?: FunctionKeys<T>[];
};
declare type Compute<T> = true extends true ? {
    [key in keyof T]: T[key];
} : unknown;
declare type Reactive<T, O extends Required<UseReactiveOptions<T>>> = Compute<Pick<T, O['accessors' | 'methods'][number] & keyof T>>;

declare function useReactive<T, O extends Required<UseReactiveOptions<T>>>(toReactive: T, { accessors, methods }: O): Reactive<T, O>;

declare const toRaw: <T extends Record<string, unknown>>(derived: T) => T;

export { Reactive, UseReactiveOptions, toRaw, useReactive };
