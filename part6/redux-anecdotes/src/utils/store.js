import { configureStore } from '@reduxjs/toolkit'

import { anecdoteSlice } from '../reducers/anecdoteReducer'
import { filterSlice } from '../reducers/filterReducer'
import { notificationSlice } from '../reducers/notificationReducer'

const store = configureStore({
    reducer: {
        anecdoteReducer: anecdoteSlice.reducer,
        filterReducer: filterSlice.reducer,
        notificationReducer: notificationSlice.reducer
    }
})
  
export default store