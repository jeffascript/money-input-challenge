/**
 * @jest-environment jsdom
 */

import { describe, expect, vi, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import InputWrapper from './InputWrapper'

describe('InputWrapper', () => {
  const mockProps = {
    'label': 'Money Input Box',
    'name': 'testName',
    'id': 'testId',
    'isError': false,
    'showWithCurrency': true,
    'disabled': false,
    'placeholder': 'Test Placeholder',
    'className': 'testClassName',
    'onChange': vi.fn(),
    'locale': 'en-US',
    'value': 100,
    'data-testid': 'money-input-box',
  }

  it('renders input element with correct props', () => {
    render(<InputWrapper {...mockProps} />)
    const inputElement = screen.getByTestId('money-input-box')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('id', 'testId')
    expect(inputElement).toHaveAttribute('name', 'testName')
    expect(inputElement).toHaveAttribute('placeholder', 'Test Placeholder')
    expect(inputElement).toHaveAttribute('aria-invalid', 'false')
    expect(inputElement).toHaveClass('testClassName')
  })

  it('renders label with correct text', () => {
    render(<InputWrapper {...mockProps} />)

    const labelElement = screen.getByLabelText('Money Input Box')
    expect(labelElement).toBeInTheDocument()
  })

  it('renders currency description with formatted currency if value is not NaN', () => {
    render(<InputWrapper {...mockProps} />)

    const descriptionElement = screen.getByText('€100.00')
    expect(descriptionElement).toBeInTheDocument()
  })

  it('does not render currency description if showWithCurrency prop is false', () => {
    render(<InputWrapper {...mockProps} showWithCurrency={false} />)

    const descriptionElement = screen.queryByText('€100.00')
    expect(descriptionElement).not.toBeInTheDocument()
  })

  it('does not render currency description if value is NaN', () => {
    render(<InputWrapper {...mockProps} value={NaN} />)

    const descriptionElement = screen.queryByText('€100.00')
    expect(descriptionElement).not.toBeInTheDocument()
  })
})
