import { configureStore } from '@reduxjs/toolkit';
import { callsReducer } from './calls/calls-slice';

export const store = configureStore({
    reducer: {
        calls: callsReducer,
    },
    devTools: true,
});
