import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DataReturnProps } from './types'
import { AppDispatch, RootState } from 'redux/store'
import axios from 'axios'
import { API_ENDPOINT } from 'api/endpoint'
import { handleExportRequest } from 'helpers/exportExcel'
import { IAgentData } from 'types/agent'

interface IAgentsStateProps extends DataReturnProps<IAgentData> {
  isExporting: boolean
  searchValues: {
    searchType: number
    value: string
  }
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
  searchValues: {
    searchType: 1,
    value: '',
  },
}

export const agentReducer = createSlice({
  name: 'Agent',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase('getAgents/pending', (state, action) => {
        state.loading = true
        state.errors = false
      })
      .addCase('getAgents/fulfilled', (state, action: any) => {
        const { data, totalCount } = action.payload
        state.loading = false
        state.errors = false
        state.totalCount = totalCount
        state.hasMore = action.payload.hasMore
        state.data = state.page === 1 ? data : [...state.data, ...data]
        state.isLoadingPage = false
      })
      .addCase('getAgents/rejected', (state, action) => {
        state.loading = false
        state.isLoadingPage = false
        state.data = []
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
    setSearchValuesAgent: (state, { payload }) => {
      state.searchValues = {
        ...state.searchValues,
        ...payload,
      }
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

export default agentReducer.reducer
