import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    symbols: {},  // ✅ stored as object for fast keyed updates
};

const symbolsSlicer = createSlice({
    name: 'symbols',
    initialState,
    reducers: {
        setSymbols(state, action) {
            state.symbols = action.payload; // assumes payload is an object
        },
        updateLtp(state, action) {
            const { s, g, p, eq ,  ch, chp, tvl , tq , o , h , l , cu , cd , vwap , dh , dl  } = action.payload;
            const symbolKey = s + '.' + g; // Construct the unique key for lookup
            if (state.symbols[symbolKey]) {
                // Immer handles these direct mutations safely by creating a new state object.
                state.symbols[symbolKey].ltp = p;
                state.symbols[symbolKey].change = ch;
                state.symbols[symbolKey].change_per = chp;
                state.symbols[symbolKey].last_vol = eq;
                state.symbols[symbolKey].volume = tq;
                state.symbols[symbolKey].value = tvl;
                state.symbols[symbolKey].oepn = o;
                state.symbols[symbolKey].high = h;
                state.symbols[symbolKey].l = l;
                state.symbols[symbolKey].cu = cu;
                state.symbols[symbolKey].cu = cd;
                state.symbols[symbolKey].dh = dh;
                state.symbols[symbolKey].dl = dl;
                state.symbols[symbolKey].vwap = vwap;
            }
        },

        upodateBBO(state,action)
        {
            const { s , g,  bp,bq , ap , aq  } = action.payload;
            const symbolKey = s + '.' + g; // Construct the unique key for lookup
            if (state.symbols[symbolKey]) {
                // Immer handles these direct mutations safely by creating a new state object.
                state.symbols[symbolKey].bid = bp;
                state.symbols[symbolKey].ask = ap;
                state.symbols[symbolKey].bidqty = aq;
                state.symbols[symbolKey].askqty = bq;
            }
          
        },

        clearSymbols(state) {
            state.symbols = {};  // ✅ reset to empty object
        }
    },
});

export const { setSymbols, clearSymbols, updateLtp , upodateBBO } = symbolsSlicer.actions;
export default symbolsSlicer.reducer;
