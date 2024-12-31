import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'

export const loginUser = (credentials) => {
  return async (dispatch, getState) => {
    const user = await loginService.login(credentials)
    dispatch(setUser(user))
    return user
  }
}

export const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    removeUser: (state) => {
      return null
    },
  },
})

export const { setUser, removeUser } = loginUserSlice.actions
