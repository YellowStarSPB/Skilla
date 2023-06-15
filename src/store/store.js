import { configureStore } from '@reduxjs/toolkit';
import { callsReducer } from './calls/calls-slice';
import { filterReducer } from './filter/filter-slice';

export const store = configureStore({
    reducer: {
        calls: callsReducer,
        filter: filterReducer,
    },
    devTools: true,
});
