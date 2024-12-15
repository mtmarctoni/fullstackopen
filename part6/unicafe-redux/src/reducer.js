import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    good: (state) => {
      state.good += 1
    },
    ok: (state) => {
      state.ok += 1
    },
    bad: (state) => {
      state.bad += 1
    },
    reset: (state) => {
      state.good = 0
      state.ok = 0
      state.bad = 0
    }
  }
})

export const { good, ok, bad, reset } = counterSlice.actions

/*
export const allReducers = {
  reducer: {
    counter: counterSlice.reducer
  }
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      state = { ...state, good: state.good + 1 }
      return state
      case 'OK':
        return state
        case 'BAD':
          return state
          case 'ZERO':
            return state
            default: return state
    }
          
}
*/