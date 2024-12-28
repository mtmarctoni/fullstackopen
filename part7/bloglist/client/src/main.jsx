import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App'
import StoreProvider  from './reducers/store'


ReactDOM.createRoot(document.getElementById('root')).render(
    <StoreProvider>
        <Router >
            <App />
        </Router>
    </StoreProvider>
)
