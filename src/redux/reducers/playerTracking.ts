import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ENDPOINT } from 'api/endpoint'
import { CRUDAction } from 'api/helpers'
import axios from 'axios'
import { AppDispatch, RootState } from 'redux/store'

import { DataReturnProps } from './types'

const initialState: DataReturnProps<unknown> = {
  loading: false,
  isLoadingPage: false,
  errors: null,
  data: [],
  page: 1,
  take: 20,
  totalCount: 0,
  hasMore: false,
}

export const PlayerTrackingReducer = createSlice({
  name: 'PlayerTracking',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase('getPlayersTracking/pending', (state, action) => {
        if (state.page === 1) {
          state.isLoadingPage = true
        } else {
          state.loading = true
        }
      })
      .addCase('getPlayersTracking/fulfilled', (state, action: any) => {
        state.loading = false
        state.isLoadingPage = false
        state.data =
          state.page === 1
            ? action.payload.data
            : [...state.data, ...action.payload.data]
        state.page = action.payload.settings.hasMore
          ? state.page + 1
          : state.page
        state.totalCount = action.payload.settings.totalCount
        state.hasMore = action.payload.settings.hasMore
      })
      .addCase('getPlayersTracking/rejected', (state, action) => {
        state.loading = false
        state.isLoadingPage = false
        state.data = state.page === 1 ? [] : state.data
      })
  },
  reducers: {
    setLoadingPlayersTracking: (state, { payload }) => {
      state.loading = payload
    },
    updatePlayersTrackingData: (state, { payload }) => {
      const { isSuccess, message, ...rest } = payload
      state.data = [rest, ...state.data]
      state.totalCount++
    },
    setErrorPlayersTracking: (state, { payload }) => {
      state.errors = payload
    },
    deletePlayerTrackingData: (state, { payload }) => {
      state.data = state.data.filter((item: any) => item.id !== payload.data.id)
      state.totalCount--
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setErrorPlayersTracking,
  deletePlayerTrackingData,
  updatePlayersTrackingData,
  setLoadingPlayersTracking,
} = PlayerTrackingReducer.actions

export const getPlayersTracking = createAsyncThunk(
  'getPlayersTracking',
  async (dispatch, { rejectWithValue, getState }) => {
    const {
      page,
      take,
      // eslint-disable-next-line no-unsafe-optional-chaining
    } = (getState() as RootState)?.playerTracking
    try {
      const json = JSON.stringify({
        page,
        take,
      })

      const response = await axios.post(
        API_ENDPOINT.GET_PLAYER_TRACKING,
        json,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      return {
        data: response.data.data,
        settings: {
          totalCount: response.data.totalCount,
          hasMore: Math.ceil(response.data.totalCount / take) > page,
        },
      }
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export const addPlayerTracking =
  (
    { playerId, partnerId }: { playerId: string; partnerId: number | null },
    cb: () => void
  ) =>
  async (dispatch: AppDispatch, getState: Function) => {
    dispatch(setLoadingPlayersTracking(true))
    CRUDAction({
      data: { id: playerId, ...(partnerId ? { partnerId } : {}) },
      url: API_ENDPOINT.ADD_PLAYER_TRACKING,
    })
      .then(async (response: any) => {
        if (response.data.isSuccess) {
          dispatch(updatePlayersTrackingData(response.data))
          cb()
        } else {
          dispatch(setErrorPlayersTracking(response.data.message))
        }
      })
      .catch((error: any) => {
        console.error(error)
      })
      .finally(() => dispatch(setLoadingPlayersTracking(false)))
  }

export const deletePlayerTracking =
  (id: string, cb: () => void) =>
  async (dispatch: AppDispatch, getState: Function) => {
    dispatch(setLoadingPlayersTracking(true))
    CRUDAction({
      data: { id },
      url: API_ENDPOINT.DELETE_PLAYER_TRACKING,
    })
      .then(async (response: any) => {
        if (response.data.isSuccess) {
          dispatch(deletePlayerTrackingData(response))
          cb()
        } else {
          dispatch(setErrorPlayersTracking(response.message))
        }
      })
      .catch((error: any) => {
        console.error(error)
      })
      .finally(() => dispatch(setLoadingPlayersTracking(false)))
  }

export const loadPlayersTracking = () => {
  return async (dispatch: AppDispatch) => {
    await dispatch(getPlayersTracking())
  }
}

export default PlayerTrackingReducer.reducer
