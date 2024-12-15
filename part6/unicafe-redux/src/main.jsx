import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import { counterSlice } from './reducer'

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  }
})
  

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
  )


//renderApp()
//store.subscribe(renderApp)
