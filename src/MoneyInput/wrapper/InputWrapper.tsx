import { forwardRef, useId, Ref } from 'react'
import _styles from './InputWrapper.module.css'
import { combineClassNames } from '../types'
import { useCurrencyFormatter } from './useCurrencyFormatter'
import { CustomWrapperFieldsProps } from './types'

const InputWrapper = forwardRef(
  (
    {
      label,
      name = 'input',
      id,
      isError,
      disabled,
      placeholder,
      showWithCurrency,
      className: userClassName,
      ...props
    }: CustomWrapperFieldsProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const generatedId = useId()
    const customId = `${generatedId}-${name ?? id ?? 'moneyinput'}`

    const formattedCurrency = useCurrencyFormatter(props.lang as string, props.value ?? 0)

    return (
      <>
        <div className={_styles['input--wrapper']}>
          <label htmlFor={id ?? customId} className={_styles['input--label']}>
            {label}
          </label>
          <input
            {...props}
            id={id ?? customId}
            name={name}
            type="number"
            inputMode="decimal"
            placeholder={placeholder}
            aria-describedby={customId}
            aria-invalid={!!isError}
            disabled={disabled}
            className={combineClassNames([_styles.input, isError && _styles['input--error'], userClassName])}
          />
        </div>
        {showWithCurrency && (
          <p className={_styles.description}>{!Number.isNaN(props.value) ? formattedCurrency : ''}</p>
        )}
      </>
    )
  }
) as React.FC<CustomWrapperFieldsProps>

export default InputWrapper
