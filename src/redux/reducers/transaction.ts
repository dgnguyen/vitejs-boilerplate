import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { isTesterSelectOptions } from 'constants/filters'
import {
  initialDateState,
  searchTypeOptions,
  TRStatusSelectOptions,
} from 'helpers/transaction'
import { RootState } from 'redux/store'
import {
  ISearchValuesTransactions,
  ITransactions,
  StatusTransaction,
  TRListType,
} from 'types/transaction'

const initialSearchValues: ISearchValuesTransactions = {
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
}

const initialState: ITransactions = {
  loading: false,
  loadingPage: false,
  errors: false,
  settings: {
    length: 0,
    hasMore: true,
  },
  data: [] as TRListType[],
  searchValues: initialSearchValues,
  isExporting: false,
}

export const transactionReducer = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase('getTransactions/pending', (state) => {
        state.loading = true
        state.errors = false
        if (state.searchValues.page === 1) {
          state.data = []
          state.loadingPage = true
        }
      })
      .addCase('getTransactions/fulfilled', (state, action: any) => {
        state.loading = false
        state.errors = false
        state.settings = action.payload.settings
        state.data =
          state.searchValues.page === 1
            ? action.payload.data
            : [...state.data, ...action.payload.data]
        state.loadingPage = false
        state.searchValues = {
          ...state.searchValues,
          ...action.payload.settings,
          page: action.payload.settings.hasMore
            ? state.searchValues.page + 1
            : state.searchValues.page,
        }
      })
      .addCase('getTransactions/rejected', (state) => {
        state.loading = false
        state.loadingPage = false
        state.data = []
        state.errors = true
      })
  },
  reducers: {
    setLoadingExport: (state, { payload }) => {
      state.isExporting = payload
    },
    setSearchValue: (state, { payload: { key, val } }) => {
      state.searchValues = { ...state.searchValues, [key]: val }
    },
    updateTransactionThroughWS: (state, { payload }) => {
      for (const ub of state.data) {
        if (ub.status === 0) {
          const updateData = payload.find(
            (i: any) => i.betLogId === ub.betLogId
          )
          if (updateData) {
            ub.status = (updateData.winAmount ? 2 : 1) as StatusTransaction
            ub.winAmount = updateData.winAmount || 0
          } else {
            continue
          }
        } else {
          continue
        }
      }
    },
    setAgentTransaction: (state, action) => {
      state.searchValues.agentSelected = action.payload
    },
    resetSearchValues: (state) => {
      state.searchValues = initialSearchValues
    },

    resetTransactionState: () => {
      return initialState
    },
  },
})

export const transactionIsLoadingSelector = (state: RootState) =>
  state.transaction.loading
export const transactionIsPageLoadingSelector = (state: RootState) =>
  state.transaction.loadingPage
export const selectTransactions = (state: RootState) => state.transaction.data
export const transactionSearchValuesSelector = (state: RootState) =>
  state.transaction.searchValues
export default transactionReducer.reducer

export const {
  updateTransactionThroughWS,
  setSearchValue,
  resetSearchValues,
  resetTransactionState,
  setLoadingExport,
  setAgentTransaction,
} = transactionReducer.actions
