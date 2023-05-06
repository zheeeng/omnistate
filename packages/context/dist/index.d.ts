import React from 'react';

declare type UseHooks<T> = {
    [Key in keyof T as `use${Capitalize<Key & string>}`]: (() => T[Key]);
};
declare function createContext<Props extends Record<string, unknown>, Value extends Record<string, unknown>>(useValue: (props: Props) => Value): [React.FC<Props>, UseHooks<Value>, Value];

export { createContext };
