import { AttributifyAttributes } from 'windicss/types/jsx'

type Prefix = 'w:'

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> extends AttributifyAttributes {}

}