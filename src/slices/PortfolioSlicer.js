import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    portfolio: {},

};

const PortfolioSlicer = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setPortfolio(state, action) {
            state.portfolio = action.payload; // assumes payload is an object
        },


        updatePortfolioLtp(state, action) {
            const { xc, s, g, p  } = action.payload;
            const symbolKey = s + '.' + g; // Construct the unique key for lookup
            if (xc === 'DSE'){
            if (state.portfolio[symbolKey]) {
                        // Immer handles these direct mutations safely by creating a new state object.
                        state.portfolio[symbolKey].ltp = p;
                    }
            }
       
        },


        updatePortfolioCp(state,action)
        {
            const { xc, s, g   } = action.payload;
            const symbolKey = s + '.' + g; // Construct the unique key for lookup
            if (xc === 'DSE'){
            if (state.portfolio[symbolKey]) {
                        // Immer handles these direct mutations safely by creating a new state object.
                        state.portfolio[symbolKey].ltp = c;
                    }
            }
          
        },

        clearPortfolio(state) {
            state.portfolio = {};  // ✅ reset to empty object
        }
    },
});

export const { setPortfolio, clearPortfolio, updatePortfolioLtp , updatePortfolioCp} = PortfolioSlicer.actions;
export default symbolsSlicer.reducer;
