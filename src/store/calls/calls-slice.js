import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCalls = createAsyncThunk('@@call/fetchCallsStatus', async () => {
    const response = await fetch(`https://api.skilla.ru/mango/getList?imit=25`, {
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

// export const selectFilterType = (state, filter, date) => {
//     switch (filter) {
//         case 'Все типы': {
//             return state.calls;
//         }
//         case 'Входящие': {
//             if (date) {
//                 return state.calls.filter((item) => item.date.slice(0, 10) === date.from);
//             }
//             return state.calls.filter((item) => item.in_out === 1);
//         }
//         case 'Исходящие': {
//             return state.calls.filter((item) => item.in_out === 0);
//         }

//         default: {
//             return state.calls;
//         }
//     }
// };
export const selectVisibleCall = (state, filter = '', date = {}) => {
    let inOut = '';
    switch (filter) {
        case 'Все типы': {
            inOut = '';
            break;
        }
        case 'Входящие': {
            inOut = 1;
            break;
        }
        case 'Исходящие': {
            inOut = 0;
            break;
        }
    }

    return state.calls.calls.filter((call) => call.in_out.toString().includes(inOut) && (call.date.includes(date.from) && call.date.includes(date.to)));
};
