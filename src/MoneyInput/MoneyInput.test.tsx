/**
 * @jest-environment jsdom
 */

import MoneyInput from './MoneyInput'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

const INPUT_LABEL = 'Money Input'

describe('MoneyInput', () => {
  console.log = vi.fn()

  it('Should convert integer inputs in cents to decimal numbers', () => {
    render(<MoneyInput aria-label={INPUT_LABEL} value={256} />)
    expect(screen.getByLabelText(INPUT_LABEL)).toHaveValue(2.56)
  })

  it('should on change, allow the component convert the value to integer (in Cents) ', () => {
    const spy = vi.fn()
    render(<MoneyInput aria-label={INPUT_LABEL} onChange={spy} value={18} />)
    const input = screen.getByLabelText<HTMLInputElement>(INPUT_LABEL)
    fireEvent.change(input, { target: { value: 0.1 } })
    expect(spy).toHaveBeenCalledWith(10)
  })

  it('should on change, mkae the component log the new value in console ', () => {
    const spy = vi.fn()
    render(<MoneyInput aria-label={INPUT_LABEL} onChange={spy} value={256} />)
    const input = screen.getByLabelText<HTMLInputElement>(INPUT_LABEL)
    fireEvent.change(input, { target: { value: 12.34 } })
    expect(console.log).toHaveBeenCalledWith('The onClick value is: 1234 cents')
  })
  it('should call onBlur and log the value when the input loses focus and return the new value ', () => {
    console.log = vi.fn()
    const onClickspy = vi.fn()
    const blurSpy = vi.fn()
    render(<MoneyInput aria-label={INPUT_LABEL} onChange={onClickspy} value={256} onBlur={blurSpy} />)
    const input = screen.getByLabelText<HTMLInputElement>(INPUT_LABEL)

    fireEvent.blur(input)
    expect(blurSpy).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith('The onBlur value is: 256 cents')

    input.value = 7.69 as unknown as string
    fireEvent.blur(input)
    expect(blurSpy).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenCalledWith('The onBlur value is: 769 cents')
  })

  it('should return nothing for non-numeric value input ', () => {
    render(<MoneyInput aria-label={INPUT_LABEL} value={undefined} />)
    expect(screen.getByLabelText(INPUT_LABEL)).toHaveValue(null)
  })

  it('should be identical to the interface of the HTML input element with a different "as" prop Or Element type', () => {
    const spy = vi.fn()
    const CustomInput = ({ onChange, value, ...props }: JSX.IntrinsicElements['input'] & { newlyAdded?: string }) => (
      <input {...props} onChange={onChange} value={value} data-testid="custom-input" />
    )
    render(<MoneyInput as={CustomInput} title="test" onChange={spy} value={390} newlyAdded="string" />)
    const input = screen.getByTestId('custom-input')
    fireEvent.change(input, { target: { value: 1.89 } })
    expect(spy).toHaveBeenCalledWith(189)
  })

  it('should render with the provided locale', () => {
    render(<MoneyInput aria-label={INPUT_LABEL} value={256} locale="fr-FR" />)
    const input = screen.getByLabelText(INPUT_LABEL)
    expect(input).toHaveAttribute('lang', 'fr-FR')
  })

  it('should render with the default element type', () => {
    const onClickspy = vi.fn()
    const blurSpy = vi.fn()

    const { container } = render(
      <MoneyInput aria-label={INPUT_LABEL} onChange={onClickspy} value={256} onBlur={blurSpy} />
    )

    const input = container.querySelector('input[type="number"]')
    expect(input).toBeInTheDocument()
  })

  it('should handle out-of-range value on change', () => {
    const spy = vi.fn()
    render(<MoneyInput aria-label={INPUT_LABEL} onChange={spy} value={61} min={4} max={99} />)
    const input = screen.getByLabelText<HTMLInputElement>(INPUT_LABEL)
    fireEvent.change(input, { target: { value: 2.34 } })
    expect(spy).toHaveBeenCalledTimes(0)
    expect(input).toHaveValue(0.61)
  })
})
