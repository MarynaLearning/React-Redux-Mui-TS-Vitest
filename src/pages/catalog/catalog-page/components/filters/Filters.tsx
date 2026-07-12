import ClearIcon from '@mui/icons-material/Clear'
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

import './Filters.scss'
import { CATEGORY_OPTIONS, SORT_SELECT_OPTIONS } from './constants'
import { useFiltersController } from './useFiltersController'

const Filters = () => {
  const {
    searchTerm,
    category,
    sort,
    onSearchTermChange,
    onClearSearch,
    onCategoryChange,
    onSortChange,
  } = useFiltersController()

  return (
    <div className="filters">
      <TextField
        label="Search"
        value={searchTerm}
        onChange={onSearchTermChange}
        className="search-field"
        slotProps={{
          input: {
            endAdornment: searchTerm ? (
              <IconButton
                aria-label="Clear search"
                size="small"
                edge="end"
                onClick={onClearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ) : undefined,
          },
        }}
      />
      <FormControl className="category-field">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          label="Category"
          value={category}
          onChange={onCategoryChange}
        >
          {CATEGORY_OPTIONS.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="sort-field">
        <InputLabel id="sort-label">Sort</InputLabel>
        <Select
          labelId="sort-label"
          label="Sort"
          value={sort}
          onChange={onSortChange}
        >
          {SORT_SELECT_OPTIONS.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Filters
