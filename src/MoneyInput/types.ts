// export declare function customClassNames(args: unknown[]): string

export const combineClassNames = (args: unknown[]) => args.filter(Boolean).join(' ')

export type MoneyMainProps<T extends React.ElementType> = {
  as?: T
  onChange?: (value: number | null) => void
  onBlur?: () => void
  value?: number | null
  min?: number
  max?: number
  locale?: string
}

export type MoneyInputProps<T extends React.ElementType = 'input'> = MoneyMainProps<T> &
  Omit<React.ComponentPropsWithRef<T>, keyof MoneyMainProps<T>>

export type MoneyInputReturnType = <T extends React.ElementType = 'input'>(props: MoneyInputProps<T>) => JSX.Element
