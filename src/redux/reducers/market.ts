import { createSlice } from '@reduxjs/toolkit'
import { API_ENDPOINT } from 'api/endpoint'
import axios from 'axios'
import { langEnum } from 'constants/market'
import { AppDispatch } from 'redux/store'

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

type IMarketSearchValues = {
  gameType: number | null
  agent: number | string | null
  isTester: string
}

export type MarketState = {
  loadingPage: boolean
  loading: boolean
  data?: IMarketData[][]
  betAllowed: IBetAllowed
  reload: number
  searchValues: IMarketSearchValues
}

const initialSearchValues = {
  gameType: null,
  agent: null,
  isTester: 'false',
}

const initialState: MarketState = {
  loadingPage: false,
  loading: false,
  data: [],
  betAllowed: {
    status: true,
    betAllowedMsgEnglish: '',
    betAllowedMsgKorean: '',
  },
  reload: 0,
  searchValues: initialSearchValues,
}

export const MarketReducer = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action?.payload
    },
    setLoadingPage: (state, action) => {
      state.loadingPage = action?.payload
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
    setSearchValuesMarket: (state, { payload }) => {
      state.searchValues = {
        ...state.searchValues,
        ...payload,
      }
    },
    resetMarketFilter: (state) => {
      state.searchValues = initialSearchValues
    },
  },
})

export const {
  setLoading,
  setData,
  setLoadingPage,
  updateBetAllowedState,
  handleReloadMarket,
  resetMarketFilter,
  setSearchValuesMarket,
} = MarketReducer.actions

export const getTickets = () => {
  return async (dispatch: AppDispatch, getState: Function) => {
    try {
      const { gameType, agent } = getState()?.market?.searchValues
      dispatch(setLoadingPage(true))
      const json = JSON.stringify({
        partnerId: agent,
        gameTypeId: gameType,
      })

      const response = await axios.post(
        `${API_ENDPOINT.GET_EVENT_MARKET_SETTINGS}`,
        json
      )
      const data = response?.data?.data || null

      if (data) dispatch(setData(data))
      return response.data
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)

      throw e
    } finally {
      dispatch(setLoadingPage(false))
    }
  }
}

export const updateTicketEventOdd = (
  id: number,
  num: number,
  gameTypeId: number
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true))

      const json = JSON.stringify({
        oddId: id,
        coefficient: num,
        gameType: gameTypeId,
      })

      const response = await axios.post(
        API_ENDPOINT.UPDATE_EVENT_ODD_MARKET_SETTINGS,
        json,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const updateBetAllowStatus = (
  status: boolean,
  contents: { [langEnum.eng]: string; [langEnum.kor]: string },
  password?: string
) => {
  return async (
    dispatch: AppDispatch,
    getState: Function
  ): Promise<{ isSuccess: boolean }> => {
    const { agent, gameType } = getState().market.searchValues
    try {
      const response = await axios.post(
        API_ENDPOINT.UDATE_BET_OPEN_CLOSE_MARKET_SETTINGS,
        {
          status,
          contents,
          password,
          translationName: 'betClosed',
          partnerId: agent,
          gameTypeId: gameType,
        }
      )

      if (response.data.isSuccess) {
        dispatch(
          updateBetAllowedState({
            status,
            betAllowedMsgEnglish: contents[langEnum.eng],
            betAllowedMsgKorean: contents[langEnum.kor],
          })
        )
      }

      return response.data
    } catch (e) {
      return { isSuccess: false }
    }
  }
}

export default MarketReducer.reducer
