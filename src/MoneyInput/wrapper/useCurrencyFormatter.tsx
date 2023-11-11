import { useMemo } from 'react'

export const useCurrencyFormatter = (locale: string, value: number) => {
  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }, [locale])

  const formattedValue = currencyFormatter.format(value)

  return formattedValue
}
