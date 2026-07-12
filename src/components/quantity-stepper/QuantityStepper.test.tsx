import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import QuantityStepper from './QuantityStepper'

const renderQuantityStepper = (
  overrides: Partial<Parameters<typeof QuantityStepper>[0]> = {},
) => {
  const onIncrement = vi.fn()
  const onDecrement = vi.fn()
  const onChange = vi.fn()
  const onBlur = vi.fn()

  const utils = render(
    <QuantityStepper
      value="1"
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onChange={onChange}
      onBlur={onBlur}
      decrementDisabled={false}
      incrementDisabled={false}
      {...overrides}
    />,
  )

  return { ...utils, onIncrement, onDecrement, onChange, onBlur }
}

describe('QuantityStepper', () => {
  it('renders the current value', () => {
    renderQuantityStepper({ value: '3' })

    expect(screen.getByLabelText('Quantity')).toHaveValue('3')
  })

  it('calls onIncrement when the increase button is clicked', async () => {
    const user = userEvent.setup()
    const { onIncrement } = renderQuantityStepper()

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))

    expect(onIncrement).toHaveBeenCalledTimes(1)
  })

  it('calls onDecrement when the decrease button is clicked', async () => {
    const user = userEvent.setup()
    const { onDecrement } = renderQuantityStepper()

    await user.click(screen.getByRole('button', { name: 'Decrease quantity' }))

    expect(onDecrement).toHaveBeenCalledTimes(1)
  })

  it('calls onChange when typing and onBlur when leaving the field', async () => {
    const user = userEvent.setup()
    const { onChange, onBlur } = renderQuantityStepper()

    await user.type(screen.getByLabelText('Quantity'), '5')
    await user.tab()

    expect(onChange).toHaveBeenCalled()
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('disables the decrement button when decrementDisabled is true', () => {
    renderQuantityStepper({ decrementDisabled: true })

    expect(
      screen.getByRole('button', { name: 'Decrease quantity' }),
    ).toBeDisabled()
  })

  it('disables the increment button when incrementDisabled is true', () => {
    renderQuantityStepper({ incrementDisabled: true })

    expect(
      screen.getByRole('button', { name: 'Increase quantity' }),
    ).toBeDisabled()
  })
})
