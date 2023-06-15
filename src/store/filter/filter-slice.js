import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    type: 'Все типы',
    calendar: '3 дня',
    date: {
        from: '',
        to: '',
    },
};

const filterSlice = createSlice({
    name: '@@filter',
    initialState,
    reducers: {
        selectType: (state, action) => {
            state.type = action.payload;
        },
        selectCalendar: (state, action) => {
            state.calendar = action.payload;
        },
        selectDate: (state, action) => {
            state.date.from = action.payload.from;
            state.date.to = action.payload.to;
        },
    },
});

export const { selectType, selectCalendar, selectDate } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
