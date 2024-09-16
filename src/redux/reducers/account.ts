import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ENDPOINT } from 'api/endpoint'
import axios from 'axios'
import { AppDispatch, RootState } from 'redux/store'
import { IAccount, IAccounts } from 'types/account'

export const initialState = {
  loading: false,
  loadingPage: false,
  error: false,
  data: [],
  page: 1,
  take: 20,
  hasMore: true,
  totalCount: 0,
} as IAccounts

export const accountReducer = createSlice({
  name: 'account',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase('getAccounts/pending', (state) => {
        state.loading = true
        state.error = false
        if (state.page === 1) {
          state.data = []
          state.loadingPage = true
        }
      })
      .addCase('getAccounts/fulfilled', (state, { payload }: any) => {
        state.loading = false
        state.loadingPage = false
        state.error = false
        state.page = payload.settings.hasMore ? state.page + 1 : state.page
        state.totalCount = payload.settings.totalCount
        state.hasMore = payload.settings.hasMore
        state.data =
          state.page === 1 ? payload.data : [...state.data, ...payload.data]
      })
      .addCase('getAccounts/rejected', (state) => {
        state.loading = false
        state.loadingPage = false
        state.data = []
        state.error = true
      })
  },
  reducers: {
    setLoadingAccount: (state, { payload }) => {
      state.loading = payload
    },
    resetAccountsState: () => {
      return initialState
    },
    addNewAccount: (state, { payload }) => {
      state.data = [payload, ...state.data]
      state.totalCount++
    },
    updateAccount: (state, { payload }: any) => {
      state.data = state.data.reduce((acc: any, cur: any) => {
        if (cur?.userId === payload?.userId) {
          return [...acc, payload]
        }
        return [...acc, cur]
      }, [])
    },
    deleteAccount: (state, { payload }) => {
      state.data = state.data.filter((account) => account.userId !== payload)
      state.totalCount--
    },
    updateStatusAccount: (state, { payload }) => {
      state.data = state.data.map((account: IAccount) => {
        if (account.userId === payload.userId) {
          return {
            ...account,
            isBlock: !account.isBlock,
          }
        } else return account
      })
    },
  },
})

export const getAccountsAction = createAsyncThunk(
  'getAccounts',
  async (
    dispatch,
    {
      rejectWithValue,
      getState,
    }: {
      rejectWithValue: Function
      getState: Function
    }
  ) => {
    const { page, take } = getState().account
    try {
      const json = JSON.stringify({
        page,
        take,
      })
      const response = await axios.post(API_ENDPOINT.GET_LIST_ACCOUNT, json)
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

export const toggleStatusAccountAction =
  (id: number, isBlock: boolean, cb: (error?: string) => void) =>
  async (dispatch: AppDispatch, getState: Function) => {
    dispatch(setLoadingAccount(true))
    const json = JSON.stringify({
      userId: id,
    })
    try {
      const url = isBlock
        ? API_ENDPOINT.UNBLOCK_ACCOUNT
        : API_ENDPOINT.BLOCK_ACCOUNT
      const response = await axios.post(url, json, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response?.data?.isSuccess) {
        dispatch(updateStatusAccount(response?.data))
        cb()
      }
    } catch (error: any) {
      cb(error?.response?.data?.message)
      console.error(error)
    } finally {
      dispatch(setLoadingAccount(false))
    }
  }

export const handleDeleteUserAction =
  (userId: number, cb: (error?: string) => void) =>
  async (dispatch: AppDispatch, getState: Function) => {
    dispatch(setLoadingAccount(true))
    const url = API_ENDPOINT.DELETE_ACCOUNT
    const json = JSON.stringify({
      userId,
    })
    try {
      const response = await axios.post(url, json, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response?.data?.isSuccess) {
        dispatch(deleteAccount(response?.data?.userId))
        cb()
      } else {
        cb(response?.data?.message)
      }
    } catch (error: any) {
      console.error(error)
      cb(error?.response?.data?.message)
    } finally {
      dispatch(setLoadingAccount(false))
    }
  }

// Action creators are generated for each case reducer function
export const {
  setLoadingAccount,
  resetAccountsState,
  updateAccount,
  deleteAccount,
  addNewAccount,
  updateStatusAccount,
} = accountReducer.actions

export default accountReducer.reducer
