import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

type TModalType = {
  type: string
  open: boolean
  id: number
  eventId: number
  marketId: number
  ticket: object
  coefficient: number
}

const initialState = {
  type: '',
  open: false,
  id: 0,
  eventId: 0,
  marketId: 0,
  ticket: {},
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
    },
  },
})

export const { openModal } = modalSlice.actions

export default modalSlice.reducer
export const selectModalInfo = (state: RootState) => state.modal
export const selectModalIsOpen = (state: RootState) => state.modal.open
