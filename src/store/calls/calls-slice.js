import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCalls = createAsyncThunk('@@call/fetchCallsStatus', async () => {
    const response = await fetch(`https://api.skilla.ru/mango/getList`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: 'Bearer testtoken',
        },
    });
    const data = await response.json();
    return data.results;
});
const initialState = {
    calls: [],
    status: 'loading', //loading | success | error
};

const callsSlice = createSlice({
    name: '@@call',
    initialState,
    reducers: {
        addCalls: (state, action) => {
            state.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalls.pending, (state) => {
                state.status = 'loading';
                state.calls = [];
            })
            .addCase(fetchCalls.fulfilled, (state, action) => {
                state.calls = action.payload;
                state.status = 'success';
            })
            .addCase(fetchCalls.rejected, (state) => {
                state.status = 'error';
                state.calls = [];
            });
    },
});

export const { addCalls } = callsSlice.actions;
export const callsReducer = callsSlice.reducer;
