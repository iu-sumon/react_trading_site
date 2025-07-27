import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    time_and_sales: [],  // ✅ stored as object for fast keyed updates
};

const timeAndSalesSlicer = createSlice({
    name: 'timesale',
    initialState,
    reducers: {
        updateTimeSales(state, action) {
            const msg = action.payload;
            const  latestLtp = {
            ltp: msg.p,
            symbol: msg.s,
            board: msg.g,
            exchange: msg.xc,
            qty: msg.eq,
            time: msg.t,
            change: msg.ch,
            change_per: msg.chp,
            side: msg.sd,
        }


        if (state.time_and_sales.length >= 50) {

            state.time_and_sales.pop(); // Remove the last entry to keep the array size at 50
        }

        state.time_and_sales.unshift(latestLtp); 

        },
    },
});

export const { updateTimeSales } = timeAndSalesSlicer.actions;
export default timeAndSalesSlicer.reducer;
