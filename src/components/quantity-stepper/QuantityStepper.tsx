import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { IconButton, TextField } from '@mui/material'

import './QuantityStepper.scss'
import type { IQuantityStepperProps } from './types'

const QuantityStepper = ({
  value,
  onIncrement,
  onDecrement,
  onChange,
  onBlur,
  decrementDisabled,
  incrementDisabled,
}: IQuantityStepperProps) => (
  <div className="quantity-stepper">
    <IconButton
      aria-label="Decrease quantity"
      onClick={onDecrement}
      disabled={decrementDisabled}
    >
      <RemoveIcon />
    </IconButton>
    <TextField
      className="quantity-input"
      size="small"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      slotProps={{
        htmlInput: {
          inputMode: 'numeric',
          pattern: '[0-9]*',
          'aria-label': 'Quantity',
        },
      }}
    />
    <IconButton
      aria-label="Increase quantity"
      onClick={onIncrement}
      disabled={incrementDisabled}
    >
      <AddIcon />
    </IconButton>
  </div>
)

export default QuantityStepper
