import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/reducers.js';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true, 
});

export default store;
