import { createSlice } from '@reduxjs/toolkit'
import {getAll, createAnecdote, voteAnecdote} from '../service/anecdotes'

export const initializeAnecdotes = () => {
  return async (dispatch, getState) => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdoteThunk = (content) => {
  return async (dispatch, getState) => {
    const newAnecdote = await createAnecdote(content)
    dispatch(add(content))
  }
  
}

export const voteAnecdoteThunk = (id) => {
  return async (dispatch, getState) => {
    const votedAnecdote = await voteAnecdote(id)
    dispatch(vote(id))
  }
}

export const anecdoteSlice = createSlice({
  name: 'anecdoteSlide',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      if (anecdote) {
        anecdote.votes += 1
      }
      //console.log('state now: ', JSON.stringify(state))
      //console.log('action', action)

      //return state // with Immer of @reduxjs/toolkit it does not matter to return the state or not mutate it
    },
    add: (state, action) => {
      const content = action.payload
      const newAnecdote = {
        content: content,
        votes: 0
      }
      state.push(newAnecdote)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },

  }
  
})

export const {vote, add, setAnecdotes} = anecdoteSlice.actions