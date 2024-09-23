import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import accountReducer from './reducers/account'
import agentReducer from './reducers/agent'
import dashboardReducer from './reducers/dashboard'
import marketReducer from './reducers/market'
import modalReducer from './reducers/modal'
import playerReducer from './reducers/player'
import playerTrackingReducer from './reducers/playerTracking'
import testReducer from './reducers/test'
import transactionReducer from './reducers/transaction'
import userReducer from './reducers/user'

export const store = configureStore({
  reducer: {
    test: testReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    player: playerReducer,
    transaction: transactionReducer,
    playerTracking: playerTrackingReducer,
    agent: agentReducer,
    market: marketReducer,
    modal: modalReducer,
    account: accountReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
