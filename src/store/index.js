
import userSlice from '../slices/userSlice';// Import your slices
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        user: userSlice
    }
    // Add other reducers here if needed
});

export default store;