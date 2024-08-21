import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'

export type IBetLog = {
  betAmount: number
  createDate: string
  endDate: string
  gameId: number
  playerId: number
  winAmount: number
}

export type IDashboardData = {
  grossRevenue: number
  playerNumber: number
  profitPercentage: number
  totalBetAmount: number
  totalTransactions: number
  totalWinAmount: number
  winTransactions: number
  averageBetAmount: number
  betLogs: IBetLog[]
}

export interface DateRange {
  startDate: Date
  endDate: Date
}

export interface DahsboardState {
  dateRange: DateRange
  agentSelected: number | null
  loading: boolean
  loadingPage: boolean
  errorMsg: string
  data: IDashboardData | null
}

const initialStateDateRange = {
  startDate: new Date(),
  endDate: new Date(),
}

const initialState: DahsboardState = {
  dateRange: initialStateDateRange,
  agentSelected: null,
  loading: false,
  loadingPage: false,
  errorMsg: '',
  data: null,
}

export const dashboardReducer = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
    setAgent: (state, action) => {
      state.agentSelected = action.payload
    },
    setDate: (state, action) => {
      state.dateRange = action.payload
    },
    resetDate: (state) => {
      state.dateRange = initialStateDateRange
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setLoadingPage: (state, action) => {
      state.loadingPage = action.payload
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload
    },
  },
})

export const {
  setData,
  setAgent,
  setDate,
  resetDate,
  setLoading,
  setLoadingPage,
  setErrorMsg,
} = dashboardReducer.actions

export const dashboardDateRangeSelector = (state: RootState) => {
  return state?.dashboard?.dateRange
}

export const dashboardLoadingSelector = (state: RootState) => {
  return state?.dashboard?.loading
}

export const dashboardLoadingPageSelector = (state: RootState) => {
  return state?.dashboard?.loadingPage
}

export const dashboardDataSelector = (state: RootState) => {
  return state?.dashboard?.data
}

export default dashboardReducer.reducer
