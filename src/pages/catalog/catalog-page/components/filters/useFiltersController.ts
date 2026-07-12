import type { SelectChangeEvent } from '@mui/material'
import type { ChangeEvent } from 'react'

import type { TCategory } from '@/data/types'
import { setCategory, setSearchTerm, setSort } from '@/store/filter/reducer'
import {
  categorySelector,
  searchTermSelector,
  sortSelector,
} from '@/store/filter/selectors'
import type { TSortOption } from '@/store/filter/types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export const useFiltersController = () => {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(searchTermSelector)
  const category = useAppSelector(categorySelector)
  const sort = useAppSelector(sortSelector)

  const onSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value))
  }

  const onClearSearch = () => {
    dispatch(setSearchTerm(''))
  }

  const onCategoryChange = (event: SelectChangeEvent<TCategory | 'all'>) => {
    dispatch(setCategory(event.target.value))
  }

  const onSortChange = (event: SelectChangeEvent<TSortOption>) => {
    dispatch(setSort(event.target.value))
  }

  return {
    searchTerm,
    category,
    sort,
    onSearchTermChange,
    onClearSearch,
    onCategoryChange,
    onSortChange,
  }
}
