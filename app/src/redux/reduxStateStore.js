import { configureStore } from "@reduxjs/toolkit"
import fetchDataReducer from "./fetchDataReducer"

export const store = configureStore({
    reducer: {
        fetchDataReducer
    }
})