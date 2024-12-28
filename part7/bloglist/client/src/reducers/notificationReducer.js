import { createSlice } from '@reduxjs/toolkit'

let timer = null

export const createNotification = (message, type, time) => {
    return async (dispatch, getState) => {
        if (timer) clearTimeout(timer)
        dispatch(setNotification({ message, type }))
        timer = setTimeout(() => {
            dispatch(removeNotification())
            timer = null
        }, time * 1000)
    }
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        type: ''
    },
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state) {
            return {
                message: '',
                type: ''
            }
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions