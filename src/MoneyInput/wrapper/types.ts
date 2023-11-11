import { MoneyInputProps } from '..'

export type CustomWrapperProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  name?: string
  id?: string
  isError?: boolean
  showWithCurrency?: boolean
} & MoneyInputProps

export type CustomWrapperFieldsProps = Omit<JSX.IntrinsicElements['input'], keyof CustomWrapperProps> &
  CustomWrapperProps
