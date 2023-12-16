import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchFlights = createAsyncThunk(
    'dataFetch/fetchFlights',
    async () => {
        const response = await fetch('/flights.json');
        const data = await response.json();
        return data
    }
)

export const fetchDataSlice = createSlice({
    name: 'dataFetch',
    initialState: {
        flights: null,
    },
    extraReducers: builder => {
        builder.addCase(fetchFlights.fulfilled, (state, action) => {
            state.flights = action.payload;
        })
    }
})

export const { fetchData } = fetchDataSlice.actions;
export default fetchDataSlice.reducer;