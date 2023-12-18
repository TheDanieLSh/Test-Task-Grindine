import { createSlice } from "@reduxjs/toolkit";

export const dataTransferSlice = createSlice({
    name: 'suitableFlights',
    initialState: {
        suitableFlights: [],
    },
    reducers: {
        setValue(state, action) {
            state.suitableFlights = action.payload;
        }
    }
})

export const { setValue } = dataTransferSlice.actions;
export default dataTransferSlice.reducer;