import {
  ChangeEvent,
  ElementType,
  Ref,
  forwardRef,
  useCallback,
  useMemo,
  FocusEvent,
  ComponentPropsWithoutRef,
} from 'react'
import { MoneyInputProps, MoneyInputReturnType } from './types'

const MoneyInput = forwardRef(
  <T extends ElementType = 'input'>(
    {
      onChange,
      onBlur,
      min = -Number.MAX_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      value,
      as,
      locale,
      ...props
    }: MoneyInputProps<T>,
    ref: Ref<HTMLInputElement>
  ) => {
    const Input = as || 'input'

    const boundValueInRange = useCallback(
      (value: number) => (value > (min as number) && value < (max as number) ? value : null),
      [min, max]
    )

    const parseCent = useCallback((value: number) => Math.round(value * 100), [])

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        // Remove any non-digit or decimal characters from the input value
        // leave only the last comma or dot as decimal separator
        const plainEvtValue = String(event.target.value.replace(/[^\d.,]/g, '').replace(/([.,])(?=.*[.,])/g, ''))

        if (!plainEvtValue) {
          return onChange?.(NaN)
        }

        if (Number.isNaN(parseFloat(plainEvtValue))) {
          return
        }

        // check if value is in range of all possible numbers
        const valueIsInRange = boundValueInRange(parseFloat(plainEvtValue))
        if (!valueIsInRange) {
          return null
        }

        // sanitize value to integer and ~ 2 decimal places
        const [integerPart = '0', decimalPart = '00'] = plainEvtValue.split(/\.|,/)
        const WholeValue = parseInt(integerPart, 10)
        const decimalValue = parseInt(decimalPart.padEnd(2, '0'), 10)
        const finalValue = parseFloat(WholeValue + '.' + decimalValue)

        // conver to cents
        const valueInCents = parseCent(finalValue)

        console.log(valueInCents ? `The onClick value is: ${valueInCents} cents` : 'No onClick value')
        return onChange?.(valueInCents)
      },
      [onChange, boundValueInRange]
    )

    const inputValue = useMemo(() => {
      return typeof value === 'number' ? Math.floor(value) / 100 : ''
    }, [value, onChange])

    const handleBlurr = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        onBlur?.()
        console.log(
          inputValue ? `The onBlur value is: ${parseCent(parseFloat(e.target.value))} cents` : 'No onBlur value'
        )
      },
      [inputValue]
    )

    return (
      <>
        <Input
          {...(props as ComponentPropsWithoutRef<T>)}
          type="number"
          step="0.01"
          onChange={handleChange}
          onBlur={handleBlurr}
          value={inputValue}
          max={max}
          min={min}
          ref={ref}
          lang={locale ?? navigator.language}
        />
      </>
    )
  }
) as MoneyInputReturnType

export default MoneyInput
