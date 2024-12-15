//import { createStore } from 'redux'
//import { configureStore } from '@reduxjs/toolkit'
//import { legacy_createStore as createStore} from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { good, ok, bad, reset } from './reducer'

const App = () => {
    const dispatch = useDispatch()
    const counter = useSelector((state) => state.counter)

    const handleGood = () => {
    dispatch(good())
    }
    const handleOk = () => {
    dispatch(ok())
    }
    const handleBad = () => {
    dispatch(bad())
    }
    const handleReset = () => {
    dispatch(reset())
    }

  return (
    <div>
      <button onClick={handleGood}>good</button> 
      <button onClick={handleOk}>ok</button> 
      <button onClick={handleBad}>bad</button> 
      <button onClick={handleReset}>reset</button> 
      <div>good {counter.good}</div>
      <div>ok {counter.ok}</div>
      <div>bad{counter.bad}</div>
    </div>
  )
}

export default App