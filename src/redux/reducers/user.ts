import { createSlice, Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'

import { AppDispatch, RootState } from 'redux/store'
import { removeToken, setToken, setUser } from 'helpers/auth'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    errors: false,
    token: '',
  },
  reducers: {
    loginAttempt: (state) => {
      state.loading = true
      state.errors = false
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.errors = false
      state.token = action.payload.token
    },
    loginFailed: (state, action) => {
      state.loading = false
      state.errors = action.payload.errors
    },
    logoutSuccess: (state) => {
      state.loading = false
      state.errors = false
      state.token = ''
    },
  },
})

export const { loginAttempt, loginSuccess, loginFailed, logoutSuccess } =
  userSlice.actions

export const loginUser = (formValues: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(loginAttempt())

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/AdminUser/login`,
        formValues
      )

      const token = response.data.token
      setToken(token)
      setUser(response.data)

      // auth.setExpiresAt(response.data.loginExpirationDate)

      dispatch(loginSuccess({ token }))
      return response.data
    } catch (e: any) {
      dispatch(loginFailed(e.response.data.title))
      throw e
    }
  }
}

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MAIN_API}/AdminUser/logout`
      )

      removeToken()

      dispatch(logoutSuccess())

      return response
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}

export const loadingLogin = (state: RootState) => state.user.loading
export default userSlice.reducer
