import { configureStore } from "@reduxjs/toolkit";
import dataTransferReducer from "./dataTransferReducer";

export const store = configureStore({
    reducer: {
        dataTransferReducer
    }
})