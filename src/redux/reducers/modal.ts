import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

type Ticket = {
  id: number
  marketId: number
  marketName: string
  eventName: string
  eventId: number
  odds: number
  minRate: number
  maxRate?: any
  dependancy?: any
  gameType: number
  total: number
  minBet: number
  maxBet: number
}

type TModalType = {
  type: string
  open: boolean
  id: number
  eventId: number
  marketId: number
  ticket: Ticket
  coefficient: number
  reset: boolean
}

const initialState = {
  type: '',
  open: false,
  id: 0,
  eventId: 0,
  marketId: 0,
  ticket: {},
  reset: false,
} as TModalType

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload.type
      state.open = action.payload.open
      state.id = action.payload.id
      state.eventId = action.payload.eventId
      state.marketId = action.payload.marketId
      state.ticket = action.payload.ticket
      state.coefficient = action.payload.coefficient
      state.reset = false
    },
    closeModal: (_, { payload }) => {
      if (payload) {
        return {
          ...initialState,
          reset: true,
        }
      } else return initialState
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
export const selectModalInfo = (state: RootState) => state.modal
export const selectModalIsOpen = (state: RootState) => state.modal.open
