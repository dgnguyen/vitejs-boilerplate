import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ResponseBlob } from 'components/ExportExcel/helpers'
import { FORMAT_DATE } from 'constants/date'
import { API_BASE_URL } from 'constants/endpoint'
import { isTesterSelectOptions } from 'constants/filters'
import { format } from 'date-fns'
import { handleExportRequest } from 'helpers/exportExcel'
import {
  initialDateState,
  searchTypeOptions,
  TRStatusSelectOptions,
} from 'helpers/transaction'
import moment from 'moment'
import { AppDispatch, RootState } from 'redux/store'
import {
  DateRange,
  ISearchValuesTransactions,
  ITransactions,
  StatusTransaction,
  TRListType,
} from 'types/transaction'

export const SearchTypeValue = {
  bcTransaction: 1,
  betAmount: 5,
  roundId: 2,
  moaTransaction: 3,
  bcPlayerId: 4,
}

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
  selectedGameType: null,
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
  dashboard: undefined,
  searchValues: initialSearchValues,
  isExporting: false,
}

export const transactionReducer = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: builder => {
    builder
      .addCase('getTransactions/pending', state => {
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
        state.dashboard = action.payload?.dashboard
        state.loadingPage = false
        state.searchValues = {
          ...state.searchValues,
          ...action.payload.settings,
          page: action.payload.settings.hasMore
            ? state.searchValues.page + 1
            : state.searchValues.page,
        }
      })
      .addCase('getTransactions/rejected', state => {
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
    setMultipleSearchValues: (state, { payload }) => {
      const payLoadSearchState = payload.reduce((acc: any, cur: any) => {
        return {
          ...acc,
          ...cur,
        }
      }, {})
      state.searchValues = { ...state.searchValues, ...payLoadSearchState }
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
            ub.tickets[0].gameResult = updateData.gameResult
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
    resetSearchValues: state => {
      state.searchValues = initialSearchValues
    },

    resetTransactionState: () => {
      return initialState
    },
  },
})

export const getTransactions = createAsyncThunk(
  'getTransactions',
  async (dispatch, { rejectWithValue, getState }) => {
    const {
      searchValues: {
        id,
        date: { startDate, endDate },
        page,
        take,
        searchType,
        TransactionStatus,
        isTester,
        selectedGameType,
        agentSelected,
      },
      // eslint-disable-next-line no-unsafe-optional-chaining
    } = (getState() as RootState)?.transaction
    try {
      const dateObj = {
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(endDate), 'yyyy-MM-dd'),
      }

      const replacer = (key: string, value?: string) =>
        typeof value === 'undefined' ? null : value
      //if RunningBall Transaction ID passing value 1 to request
      let searchTypeValue = Number(searchType)
      searchTypeValue =
        searchTypeValue === SearchTypeValue.moaTransaction ? 1 : searchTypeValue
      const json = JSON.stringify(
        {
          page,
          take,
          ...dateObj,
          ...(TransactionStatus !== 'null' ? { TransactionStatus } : {}),
          ...(isTester !== 'null' ? { isTester } : {}),
          id: id || null,
          ...(id ? { searchType: searchTypeValue } : {}),
          gametypeID: selectedGameType,
          partnerId: agentSelected !== 'all' ? [agentSelected] : null,
        },
        replacer
      )

      const response2 = await axios.post(
        `${API_BASE_URL}/v3/AdminTransaction/gettransactions`,
        json,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const { transactionsList, ...rest } = response2?.data

      return {
        data: transactionsList,
        dashboard: rest,
        settings: {
          totalCount: response2.data.totalCount,
          hasMore: Math.ceil(response2.data.totalCount / take) > page,
        },
      }
    } catch (err: any) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err)
    }
  }
)

export const resetFilterAndLoadData = () => {
  return async (dispatch: AppDispatch) => {
    await dispatch(resetSearchValues())
    await dispatch(getTransactions())
  }
}

type ValProps = DateRange | number | string | number[]

export const setAndLoadData = (
  key: string,
  val: ValProps,
  fromStartOfThePage = false
) => {
  return async (dispatch: AppDispatch) => {
    if (fromStartOfThePage) {
      await dispatch(setSearchValue({ key: 'page', val: 1 }))
    }
    await dispatch(setSearchValue({ key, val }))
    await dispatch(getTransactions())
  }
}

export const setMultiSearchLoadTransaction = (
  updateSearchValues: any,
  fromStartOfThePage = false
) => {
  return async (dispatch: AppDispatch) => {
    if (fromStartOfThePage) {
      await dispatch(setSearchValue({ key: 'page', val: 1 }))
    }
    await dispatch(setMultipleSearchValues(updateSearchValues))
    await dispatch(getTransactions())
  }
}

export const exportTransactions =
  (cb: (res: ResponseBlob, name: string) => void) =>
  async (dispatch: AppDispatch, getState: Function) => {
    const { searchValues } = (getState() as RootState)?.transaction

    dispatch(setLoadingExport(true))
    const url = `${API_BASE_URL}/v3/AdminTransaction/exportTransactions`
    const {
      id,
      date: { startDate: startD, endDate: endD },
      searchType,
      selectedGameType,
      isTester,
      TransactionStatus,
      agentSelected,
    } = searchValues

    const startDate = startD && format(new Date(startD), 'yyyy-MM-dd')
    const endDate = endD && format(new Date(endD), 'yyyy-MM-dd')

    handleExportRequest({
      url,
      params: {
        startDate,
        isTester:
          isTester === 'true' ? true : isTester === 'false' ? false : null,
        endDate,
        id: id || null,
        searchType: id ? searchType : 0,
        gametypeID: selectedGameType,
        TransactionStatus,
        partnerId: agentSelected === 'all' ? null : [Number(agentSelected)],
      },
    })
      .then(async (response: any) => {
        const isTestAccountName = isTester ? 'RealAccount' : 'TestAccount'
        const status = TRStatusSelectOptions.find(
          item => item.value === TransactionStatus
        )?.label
        const exportTransactionName = id
          ? `ExportTransactionId-${id}`
          : 'ExportAllTransactions'
        const dateRange = `From-${moment(startDate).format(
          FORMAT_DATE
        )}To${moment(endDate).format(FORMAT_DATE)}`
        const fileName = `${exportTransactionName}_${dateRange}_${isTestAccountName}_${status}.xlsx`
        cb(response, fileName)
      })
      .catch(error => console.error(error))
      .finally(() => dispatch(setLoadingExport(false)))
  }

export const exportSpecificPlayersTransactions =
  (cb: (res: any, name: string) => void) =>
  async (dispatch: AppDispatch, getState: Function) => {
    const { searchValues } = (getState() as RootState)?.transaction
    const {
      date: { startDate: startD, endDate: endD },
      id,
      selectedGameType,
    } = searchValues
    const startDate = startD && format(new Date(startD), 'yyyy-MM-dd')
    const endDate = endD && format(new Date(endD), 'yyyy-MM-dd')

    dispatch(setLoadingExport(true))
    const url = `${API_BASE_URL}/v3/AdminTransaction/exportSpecificPlayerTransactions`
    handleExportRequest({
      url,
      params: {
        id,
        startDate,
        endDate,
        gameTypeID: selectedGameType,
        searchType: 4, // Search by Agent player id
      },
    })
      .then(async (response: any) => {
        const dateRange = `From${moment(startDate).format(
          FORMAT_DATE
        )}To${moment(endDate).format(FORMAT_DATE)}`
        const fileName = `ExportPlayersTransactionsId-${id}_${dateRange}.xlsx`
        cb(response, fileName)
      })
      .catch(error => console.error(error))
      .finally(() => dispatch(setLoadingExport(false)))
  }

export const transactionIsLoadingSelector = (state: RootState) =>
  state.transaction.loading
export const transactionIsPageLoadingSelector = (state: RootState) =>
  state.transaction.loadingPage
export const selectTransactions = (state: RootState) => state.transaction.data
export const transactionSearchValuesSelector = (state: RootState) =>
  state.transaction.searchValues

export const errorLoadTransactions = (state: RootState) =>
  state.transaction.errors

export const transactionDataSelector = (state: RootState) =>
  state.transaction.data

export const transactionDashboardSelector = (state: RootState) =>
  state.transaction.dashboard

export const getLoadingExportTransactionSelector = (state: RootState) => {
  return state.transaction.isExporting
}

export default transactionReducer.reducer

export const {
  updateTransactionThroughWS,
  setSearchValue,
  setMultipleSearchValues,
  resetSearchValues,
  resetTransactionState,
  setLoadingExport,
  setAgentTransaction,
} = transactionReducer.actions
