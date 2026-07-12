import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { TCategory } from '@/data/types'

import { SORT_OPTIONS } from './constants'
import type { IFilterState, TSortOption } from './types'

const initialState: IFilterState = {
  searchTerm: '',
  category: 'all',
  sort: SORT_OPTIONS.DEFAULT,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setCategory: (state, action: PayloadAction<TCategory | 'all'>) => {
      state.category = action.payload
    },
    setSort: (state, action: PayloadAction<TSortOption>) => {
      state.sort = action.payload
    },
  },
})

export const { setSearchTerm, setCategory, setSort } = filterSlice.actions
export const reducer = filterSlice.reducer
