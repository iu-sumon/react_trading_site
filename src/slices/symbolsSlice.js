import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    symbols: {},  // ✅ stored as object for fast keyed updates
    bbo_symbols : {}, // ✅ stored as object for fast keyed updates
};

const symbolsSlicer = createSlice({
    name: 'symbols',
    initialState,
    reducers: {
        setSymbols(state, action) {
            state.symbols = action.payload; // assumes payload is an object
        },

        setGlobalBBO(state, action) {
            const bboData = action.payload; // expects payload to be an object with symbol keys
            state.bbo_symbols = bboData; // assumes payload is an object
        },
        updateLtp(state, action) {
            const { xc, s, g, p, eq ,  ch, chp, tvl , tq , o , h , l , cu , cd , vwap , dh , dl  } = action.payload;
            const symbolKey = s + '.' + g; // Construct the unique key for lookup
            if (xc === 'DSE'){
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
                        state.symbols[symbolKey].low = l;
                        state.symbols[symbolKey].cu = cu;
                        state.symbols[symbolKey].cu = cd;
                        state.symbols[symbolKey].dh = dh;
                        state.symbols[symbolKey].dl = dl;
                        state.symbols[symbolKey].vwap = vwap;
                    }
            }
       
        },

        upodateBBO(state,action)
        {
            const { s , g,  bp,bq , ap , aq  } = action.payload;
            const symbolKey = s + '.' + g; // Construct the unique key for lookup
            if (state.bbo_symbols[symbolKey]) {
                // Immer handles these direct mutations safely by creating a new state object.
                state.bbo_symbols[symbolKey].bid = bp;
                state.bbo_symbols[symbolKey].bidqty = bq;
                state.bbo_symbols[symbolKey].ask = ap;
                state.bbo_symbols[symbolKey].askqty = aq;
            }
          
        },
        updateCp(state,action)
        {
            const { xc, s, g , ch, chp, o , h , l , c  } = action.payload;
            const symbolKey = s + '.' + g; // Construct the unique key for lookup
            if (xc === 'DSE'){
            if (state.symbols[symbolKey]) {
                        // Immer handles these direct mutations safely by creating a new state object.
                        state.symbols[symbolKey].change = ch;
                        state.symbols[symbolKey].change_per = chp;
                        state.symbols[symbolKey].oepn = o;
                        state.symbols[symbolKey].high = h;
                        state.symbols[symbolKey].low = l;
                        state.symbols[symbolKey].close = c;

                    }
            }
          
        },

        clearSymbols(state) {
            state.symbols = {};  // ✅ reset to empty object
        }
    },
});

export const { setSymbols, clearSymbols, updateLtp , upodateBBO , updateCp , setGlobalBBO} = symbolsSlicer.actions;
export default symbolsSlicer.reducer;
