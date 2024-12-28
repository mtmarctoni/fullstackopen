import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import { blogSlice } from "./blogReducer"
import { notificationSlice } from "./notificationReducer"
import { loginUserSlice } from "./loginReducer"
import { userSlice } from "./userReducer"

const store = configureStore({
    reducer: {
        blogs: blogSlice.reducer,
        notification: notificationSlice.reducer,
        loginUser: loginUserSlice.reducer,
        users: userSlice.reducer
    }
})

const StoreProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default StoreProvider