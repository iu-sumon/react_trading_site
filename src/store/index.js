
import userSlice from '../slices/userSlice';// Import your slices
import symbolsSlicer from '../slices/symbolsSlice';// Import your slices
import timeAndSalesSLicer from '../slices/timeAndSalesSlicer';// Import your slices
import indexSlicer from '../slices/indexSlicer';// Import your slices
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        user: userSlice ,
        symbols : symbolsSlicer,
        timesales : timeAndSalesSLicer,
        indexes : indexSlicer,
    }
    // Add other reducers here if needed
});

export default store;