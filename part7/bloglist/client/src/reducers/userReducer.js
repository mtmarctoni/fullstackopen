import {createSlice} from '@reduxjs/toolkit'

import userServices from '../services/users'

const initialState = [
    { id: 1, userName: 'John', blogs: [1, 2] },
    { id: 2, userName: 'Jane', blogs: [3] },
    { id: 3, userName: 'Peter', blogs: [4, 5, 6] },
]

//Thunk function to initialize users
export const initializeUsers = () => {
    return async (dispatch, getState) => { 
        const users = await userServices.getAll()
        dispatch(setUsers(users))
    }
}

export const createUser = (user, token) => {
    return async (dispatch, getState) => {
        const newUser = await userServices.create(user, token)
        dispatch(addUser(newUser))
    }
}

export const removeUser = (userId, token) => {
    return async (dispatch, getState) => {
        await userServices.remove(userId, token)
        dispatch(deleteUser(userId))
    }
}

export const modifyUser = (userId, newUser, token) => {
    return async (dispatch, getState) => {
        await userServices.update(userId, newUser, token)
        dispatch(updateUser(userId, newUser))
    }
}

export const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            return action.payload
        },
        addUser: (state, action) => {
            return [...state, action.payload]
        },
        deleteUser: (state, action) => {
            return state.filter(user => user.id !== action.payload)
        },
        updateUser: (state, action) => {
            const id = action.payload.id
            const newUser = action.payload
            return state.map(user => user.id === id ? newUser : user)
        }
    }
})

export const { setUsers, addUser, deleteUser, updateUser} = userSlice.actions