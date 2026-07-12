import type { ChangeEvent } from 'react'

export interface IQuantityStepperProps {
  value: string
  onIncrement: () => void
  onDecrement: () => void
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  decrementDisabled: boolean
  incrementDisabled: boolean
}
