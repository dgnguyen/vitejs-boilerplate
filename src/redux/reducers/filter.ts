import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { isTesterSelectOptions } from 'constants/filters'
import {
  initialDateState,
  searchTypeOptions,
  TRStatusSelectOptions,
} from 'helpers/transaction'
import { RootState } from 'redux/store'
import { IFilter } from 'types/filter'
import { ISearchValuesTransactions } from 'types/transaction'

const initialStateFilter: IFilter = {
  id: '',
  searchType: searchTypeOptions[0].value,
  TransactionStatus: TRStatusSelectOptions[0].value,
  isTester: isTesterSelectOptions[0].value,
  date: initialDateState,
  page: 1,
  take: 20,
  totalCount: 0,
  hasMore: false,
  selectedGameType: [],
  selectedAllGames: true,
  agentSelected: 'all',
  playerId: null,
}

export interface FilterState {
  data: ISearchValuesTransactions
}

const initialState = {
  data: initialStateFilter,
}

export const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, { payload: { key, val } }) => {
      state.data = { ...state.data, [key]: val }
    },
    resetFilter: (state) => {
      return initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const { resetFilter, setFilter } = filterReducer.actions

export const filterDataSelector = (state: RootState) => state.filter.data

export default filterReducer.reducer
