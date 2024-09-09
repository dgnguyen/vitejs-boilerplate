import { createSlice } from '@reduxjs/toolkit'

export type IMarketData = {
  dependancy: Array<number>
  eventId: number
  eventName: string
  id: number
  marketId: number
  marketName: string
  maxRate: number | null
  minRate: number
  odds: number | null
}

export type IBetAllowed = {
  status: boolean
  betAllowedMsgEnglish: string
  betAllowedMsgKorean: string
}

export interface MarketState {
  loadingPage: boolean
  loading: boolean
  data?: IMarketData[]
  betAllowed: IBetAllowed | null
  reload: number
}

const initialState: MarketState = {
  loadingPage: false,
  loading: false,
  data: [],
  betAllowed: null,
  reload: 0,
}

export const MarketReducer = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action?.payload
    },
    setData: (state, action) => {
      const {
        betAllowed,
        betAllowedMsgEnglish,
        betAllowedMsgKorean,
        allEvents,
      } = action.payload
      state.data = allEvents ? Object.values(allEvents) : []
      state.betAllowed = {
        status: betAllowed,
        betAllowedMsgEnglish,
        betAllowedMsgKorean,
      }
    },

    updateBetAllowedState: (state, action) => {
      state.betAllowed = {
        status: action.payload.status,
        betAllowedMsgKorean:
          action.payload.betAllowedMsgKorean ||
          state?.betAllowed?.betAllowedMsgKorean,
        betAllowedMsgEnglish:
          action.payload.betAllowedMsgEnglish ||
          state?.betAllowed?.betAllowedMsgEnglish,
      }
    },
    handleReloadMarket: (state) => {
      state.reload += 1
    },
  },
})

export const {} = MarketReducer.actions

export default MarketReducer.reducer
