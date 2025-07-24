
import userSlice from '../slices/userSlice';// Import your slices
import symbolsSlicer from '../slices/symbolsSlice';// Import your slices
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        user: userSlice ,
        symbols : symbolsSlicer
    }
    // Add other reducers here if needed
});

export default store;