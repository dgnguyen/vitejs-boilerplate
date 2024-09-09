import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DataReturnProps } from './types'
import { AppDispatch, RootState } from 'redux/store'
import axios from 'axios'
import { API_ENDPOINT } from 'api/endpoint'
import { handleExportRequest } from 'helpers/exportExcel'
import { IAgentBetLimit, IAgentData } from 'types/agent'

interface IAgentsStateProps extends DataReturnProps<IAgentData> {
  isExporting: boolean
  searchValues: {
    searchType: number
    value: string
  }
  currency: string
  betLimitData: IAgentBetLimit[]
}

const initialState: IAgentsStateProps = {
  loading: false,
  isLoadingPage: false,
  errors: null,
  data: [],
  page: 1,
  take: 20,
  totalCount: 0,
  hasMore: false,
  isExporting: false,
  currency: '',
  searchValues: {
    searchType: 1,
    value: '',
  },
  betLimitData: [],
}

export const agentReducer = createSlice({
  name: 'Agent',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase('getAgents/pending', (state, action) => {
        state.loading = true
        state.errors = false
        if (state.page === 1) {
          state.data = []
          state.isLoadingPage = true
        }
      })
      .addCase('getAgents/fulfilled', (state, action: any) => {
        const { data, settings } = action.payload
        state.loading = false
        state.errors = false
        state.totalCount = settings?.totalCount
        state.hasMore = settings.hasMore
        state.data = state.page === 1 ? data : [...state.data, ...data]
        state.isLoadingPage = false
        state.page = settings.hasMore ? state.page + 1 : state.page
      })
      .addCase('getAgents/rejected', (state) => {
        state.loading = false
        state.isLoadingPage = false
        state.data = []
      })
      .addCase('getAgentsBetLimit/pending', (state, action) => {
        state.loading = true
        state.errors = false
        if (state.page === 1) {
          state.betLimitData = []
          state.isLoadingPage = true
        }
      })
      .addCase('getAgentsBetLimit/fulfilled', (state, action: any) => {
        const { data, settings } = action.payload
        state.loading = false
        state.errors = false
        state.totalCount = settings?.totalCount
        state.hasMore = settings.hasMore
        state.currency = settings?.currency
        state.betLimitData =
          state.page === 1 ? data : [...state.betLimitData, ...data]
        state.isLoadingPage = false
        state.page = settings.hasMore ? state.page + 1 : state.page
      })
      .addCase('getAgentsBetLimit/rejected', (state) => {
        state.loading = false
        state.isLoadingPage = false
        state.betLimitData = []
      })
  },
  reducers: {
    setLoadingExport: (state, { payload }) => {
      state.isExporting = payload
    },
    setLoadingAgent: (state, { payload }) => {
      state.loading = payload
    },
    deleteAgent: (state, { payload }) => {
      state.data = state.data.filter((agent: any) => agent.id !== payload)
      state.totalCount--
    },
    unblockAgent: (state, { payload }) => {
      state.data = state.data.map((agent: any) => {
        if (agent.id === payload) {
          return { ...agent, isBlock: false }
        }
        return agent
      })
    },
    blockAgent: (state, { payload }) => {
      state.data = state.data.map((agent: any) => {
        if (agent.id === payload) {
          return { ...agent, isBlock: true }
        }
      })
    },
    updateAgentData: (state, { payload }) => {
      state.data = state.data.map((agent: any) => {
        if (agent.id === payload.id) {
          return payload
        } else return agent
      })
    },
    addNewAgentBetLimit: (state, { payload }) => {
      state.betLimitData.unshift(payload)
    },
    setSearchValuesAgent: (state, { payload }) => {
      state.searchValues = {
        ...state.searchValues,
        ...payload,
      }
    },
    resetAgentState: () => {
      return initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setSearchValuesAgent,
  setLoadingAgent,
  deleteAgent,
  unblockAgent,
  blockAgent,
  updateAgentData,
  setLoadingExport,
  resetAgentState,
  addNewAgentBetLimit,
} = agentReducer.actions

export const getAgentsListAction = createAsyncThunk(
  'getAgents',
  async (dispatch, { rejectWithValue, getState }) => {
    const {
      page,
      take,
      searchValues: { value, searchType },
      // eslint-disable-next-line no-unsafe-optional-chaining
    } = (getState() as RootState)?.agent
    try {
      const json = JSON.stringify({
        page,
        take,
        searchValue: value,
        searchType,
      })

      const response = await axios.post(API_ENDPOINT.GET_AGENT, json, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return {
        data: response.data.data,
        settings: {
          totalCount: response.data?.totalCount,
          hasMore: Math.ceil(response.data?.totalCount / take) > page,
        },
      }
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export const deleteAgentAction =
  (id: number, cb: () => void) =>
  async (dispatch: AppDispatch, getState: Function) => {
    dispatch(setLoadingAgent(true))
    const json = JSON.stringify({
      id,
    })
    try {
      const response = await axios.post(API_ENDPOINT.REMOVE_AGENT, json, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response?.data?.isSuccess) {
        dispatch(deleteAgent(response?.data?.id))
        cb()
      }
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoadingAgent(false))
    }
  }

export const updateAgentAction =
  (updateAgent: IAgentData, key: keyof IAgentData, cb: () => void) =>
  async (dispatch: AppDispatch, getState: Function) => {
    dispatch(setLoadingAgent(true))
    const json = JSON.stringify({
      id: updateAgent.id,
      [key]: updateAgent[key],
    })
    try {
      const response = await axios.post(API_ENDPOINT.UPDATE_AGENT, json, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response?.data?.isSuccess) {
        dispatch(updateAgentData(response?.data?.data))
        cb()
      }
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoadingAgent(false))
    }
  }

export const toggleStatusAgentAction =
  (id: number, isBlock: boolean, cb: () => void) =>
  async (dispatch: AppDispatch, getState: Function) => {
    dispatch(setLoadingAgent(true))
    const json = JSON.stringify({
      id,
    })
    try {
      const url = isBlock
        ? API_ENDPOINT.UNBLOCK_AGENT
        : API_ENDPOINT.BLOCK_AGENT
      const response = await axios.post(url, json, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response?.data?.isSuccess) {
        if (isBlock) {
          dispatch(unblockAgent(response?.data?.data?.id))
        } else {
          dispatch(blockAgent(response?.data?.data?.id))
        }
        cb()
      }
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoadingAgent(false))
    }
  }

export const exportAgentsAction =
  (cb: (res: any, name: string) => void) =>
  async (dispatch: AppDispatch, getState: Function) => {
    const { searchValues } = (getState() as RootState)?.agent
    const { value, searchType } = searchValues
    dispatch(setLoadingExport(true))
    const url = API_ENDPOINT.EXPORT_AGENT
    handleExportRequest({
      url,
      params: {
        searchValue: value,
        searchType,
      },
    })
      .then(async (response: any) => {
        const fileName = `ExportAgent.xlsx`
        cb(response, fileName)
      })
      .catch((error) => console.error(error))
      .finally(() => dispatch(setLoadingExport(false)))
  }

export const exportAgentsBetLimitAction =
  (cb: (res: any, name: string) => void) =>
  async (dispatch: AppDispatch, getState: Function) => {
    const { searchValues } = (getState() as RootState)?.agent
    const { value } = searchValues
    dispatch(setLoadingExport(true))
    const url = API_ENDPOINT.EXPORT_AGENT_BET_LIMIT_CHANGE
    handleExportRequest({
      url,
      params: {
        searchValue: value,
      },
    })
      .then(async (response: any) => {
        const fileName = `ExportAgent.xlsx`
        cb(response, fileName)
      })
      .catch((error) => console.error(error))
      .finally(() => dispatch(setLoadingExport(false)))
  }

export const getHistoryChangeBetLimitAction = createAsyncThunk(
  'getAgentsBetLimit',
  async (dispatch, { rejectWithValue, getState }) => {
    const {
      page,
      take,
      searchValues: { value },
      // eslint-disable-next-line no-unsafe-optional-chaining
    } = (getState() as RootState)?.agent
    try {
      const json = JSON.stringify({
        page,
        take,
        searchValue: value,
      })

      const response = await axios.post(
        API_ENDPOINT.GET_AGENT_BET_LIMIT_CHANGE,
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
          currency: response?.data?.currency,
          totalCount: response.data?.totalCount,
          hasMore: Math.ceil(response.data?.totalCount / take) > page,
        },
      }
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export default agentReducer.reducer
