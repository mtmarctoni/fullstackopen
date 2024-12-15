import deepFreeze from 'deep-freeze'
import { counterSlice} from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  const counterReducer = counterSlice.reducer
  const {good, ok, bad, reset} = counterSlice.actions

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const action = good()
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const action = ok()
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const action = bad()
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset sets values to 0', () => {
    const state = {
      good: 1,
      ok: 2,
      bad: 3
    }
    deepFreeze(state)
    const action = reset()
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
  
})