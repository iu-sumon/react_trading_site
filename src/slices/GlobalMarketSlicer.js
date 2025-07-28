import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dse_mkt_health: {},  // ✅ stored as object for fast keyed updates
    cse_mkt_health : {}, // Assuming you might want to store CSE indexes separately
};

const GlobalMarketSlicer = createSlice({
    name: 'mktHealth',
    initialState,
    reducers: {
        setDseMktHealth(state, action) {
            state.dse_mkt_health = action.payload;
        },
        setCseMktHealth(state, action) {
            state.cse_mkt_health = action.payload;
        },
        updateDseMktHealth(state, action) {
            state.dse_mkt_health.total_turnover = action.payload.mtvr;
            state.dse_mkt_health.total_trade = action.payload.mt;
            state.dse_mkt_health.total_volume = action.payload.mv;

        },
        updateCseMktHealth(state, action) {
            state.cse_mkt_health.total_turnover = action.payload.mtvr;
            state.cse_mkt_health.total_trade = action.payload.mt;
            state.cse_mkt_health.total_volume = action.payload.mv;
        },
    },
});

export const { setDseMktHealth, setCseMktHealth , updateDseMktHealth ,  updateCseMktHealth} = GlobalMarketSlicer.actions;
export default GlobalMarketSlicer.reducer;
