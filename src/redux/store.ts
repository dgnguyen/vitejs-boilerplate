import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import testReducer from './reducers/test'
import userReducer from './reducers/user'
import dashboardReducer from './reducers/dashboard'
import playerReducer from './reducers/player'
import transactionReducer from './reducers/transaction'
import filterReducer from './reducers/filter'

export const store = configureStore({
  reducer: {
    test: testReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    player: playerReducer,
    transaction: transactionReducer,
    filter: filterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
