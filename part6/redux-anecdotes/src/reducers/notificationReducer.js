import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    message: "",
    type: "",
}

let timer = null

export const setNotificationThunk = (notification, time) => {
    return async dispatch => {
        if (timer) clearTimeout(timer)
        dispatch(setNotification(notification))
        timer = setTimeout(() => {
            dispatch(clearNotification())
            timer = null
        }, time * 1000)
    }
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        setNotification(state, action) {
            state.message = action.payload.message
            state.type = action.payload.type
        },
        clearNotification(state) {
            state.message = ''
            state.type = ''
        }
    }
    
})

export const { setNotification, clearNotification } = notificationSlice.actions



