import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filterSlice',
  initialState: '',
  reducers: {
      filter: (state, action) => {
          //console.log(JSON.stringify(state))
          state = action.payload
          return state
          //console.log(action)
    },

  }
  
})

export const { filter } = filterSlice.actions