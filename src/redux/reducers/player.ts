import {
  Action,
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { isTesterSelectOptions } from 'constants/filters'

import { AppDispatch, RootState } from 'redux/store'
import { handleExportRequest } from 'helpers/exportExcel'
import { ISearchValuesPlayers } from 'types/player'
import { API_BASE_URL } from 'constants/endpoint'
import { resetSearchValues } from './transaction'

export type IPlayer = {
  agentName: string
  fistActivity: string
  avgBetAmount: number
  bcPlayerId: number
  firstActivity: string
  ggr: number
  isTester: boolean
  lastActivity: string
  playerId: number
  totalBetAmount: number
  totalWinAmount: number
  transactionCount: number
}

const initialSearchValues: ISearchValuesPlayers = {
  id: '',
  isTester: isTesterSelectOptions[0].value,
  page: 1,
  take: 20,
  totalCount: 0,
  agentSelected: null,
}

const initialState = {
  isLoadingData: false,
  isLoadingPage: false,
  errors: false,
  hasMore: false,
  data: [] as IPlayer[],
  searchValues: initialSearchValues,
  isExporting: false,
}

export const playerReducer = createSlice({
  name: 'Player',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase('getPlayers/pending', (state, action) => {
        state.isLoadingData = true
        state.errors = false
        if (state.searchValues.page === 1) {
          state.data = []
          state.isLoadingPage = true
        }
      })
      .addCase('getPlayers/fulfilled', (state, action: any) => {
        const { data, totalCount } = action.payload.data
        state.isLoadingData = false
        state.errors = false
        state.hasMore = action.payload.hasMore
        state.data =
          state.searchValues.page === 1 ? data : [...state.data, ...data]
        state.isLoadingPage = false
        state.searchValues = {
          ...state.searchValues,
          totalCount,
          page: state.hasMore
            ? state.searchValues.page + 1
            : state.searchValues.page,
        }
      })
      .addCase('getPlayers/rejected', (state, action) => {
        state.isLoadingData = false
        state.isLoadingPage = false
        state.data = []
      })
  },
  reducers: {
    setLoadingExport: (state, { payload }) => {
      state.isExporting = payload
    },
    setSearchValuesPlayer: (state, { payload: { key, val } }) => {
      state.searchValues = { ...state.searchValues, [key]: val }
    },
    setIsTesterPlayer: (state, { payload }) => {
      state.searchValues.isTester = payload
    },
    setSelectAgent: (state, { payload }) => {
      state.searchValues.agentSelected = payload
    },
    setPreviousSearchValues: (state, { payload }) => {
      state.searchValues = payload
    },
    resetSearchValuesPlayer: (state) => {
      state.searchValues = initialSearchValues
    },
    resetPlayersState: () => {
      return initialState
    },
  },
})

export const getPlayersAction = createAsyncThunk(
  'getPlayers',
  async (dispatch, { rejectWithValue, getState }) => {
    const {
      searchValues: { id, page, agentSelected, take, isTester },
    } = (getState() as RootState)?.player
    try {
      const json = JSON.stringify({
        page,
        take,
        ...(isTester !== 'null' ? { isTester } : {}),
        ...(agentSelected === 'all' || agentSelected === null
          ? { partnerId: null }
          : { partnerId: [agentSelected] }),
        playerId: id ? Number(id) : null,
      })
      const res = await axios.post(
        `${API_BASE_URL}/AdminPlayer/getPlayerTransactions`,
        json,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      return {
        data: res?.data,
        hasMore: Math.ceil(res?.data?.totalCount / take) > page,
      }
    } catch (err: any) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err)
    }
  }
)

export const setAndLoadPlayersData = (
  key: string,
  val: any,
  fromStartOfThePage = false
) => {
  return async (dispatch: AppDispatch) => {
    if (fromStartOfThePage) {
      await dispatch(setSearchValuesPlayer({ key: 'page', val: 1 }))
    }
    await dispatch(setSearchValuesPlayer({ key, val }))
    await dispatch(getPlayersAction())
  }
}

export const exportPlayers =
  (cb: (res: any, name: string) => void) =>
  async (dispatch: AppDispatch, getState: Function) => {
    const { searchValues } = (getState() as RootState)?.player
    const { id, isTester } = searchValues
    dispatch(setLoadingExport(true))
    const url = `${API_BASE_URL}/AdminPlayer/exportPlayersTransactions`
    handleExportRequest({
      url,
      params: {
        playerId: id || null,
        isTester:
          isTester === 'true' ? true : isTester === 'false' ? false : null,
      },
    })
      .then(async (response: any) => {
        const isTestAccountName = isTester ? 'realAccount' : 'testAccount'
        const exportPlayerName = id
          ? `ExportPlayerId-${id}`
          : 'ExportAllPlayers'
        const fileName = `${exportPlayerName}_${isTestAccountName}.xlsx`
        cb(response, fileName)
      })
      .catch((error) => console.error(error))
      .finally(() => dispatch(setLoadingExport(false)))
  }

export const {
  setSearchValuesPlayer,
  setSelectAgent,
  setIsTesterPlayer,
  setLoadingExport,
  resetPlayersState,
  setPreviousSearchValues,
  resetSearchValuesPlayer,
} = playerReducer.actions

export const getLoadingExportSelector = (state: RootState) => {
  return state?.player?.isExporting
}

export const loadingPagePlayerSelector = (state: RootState) => {
  return state?.player?.isLoadingPage
}
export const loadingPlayerSelector = (state: RootState) => {
  return state?.player?.isLoadingData
}
export const errorPlayerSelector = (state: RootState) => {
  return state?.player?.errors
}

export const playerDataSelector = (state: RootState) => state?.player?.data

export default playerReducer.reducer
