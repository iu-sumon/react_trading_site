import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    indexes: {},  // ✅ stored as object for fast keyed updates
    cse_indexes : {}, // Assuming you might want to store CSE indexes separately
};

const indexSlicer = createSlice({
    name: 'indexes',
    initialState,
    reducers: {
        setIndex(state, action) {
            state.indexes = action.payload; // assumes payload is an object
        },
        setCseIndex(state, action) {
            state.cse_indexes = action.payload; // assumes payload is an object
        },
        updateIndex(state, action) {
            let key = action.payload.in; // Assuming 'in' is the index name
            if(action.payload.xc === 'DSE') {
            if (state.indexes[key]) {
                state.indexes[key].index_value = action.payload.v;
                state.indexes[key].index_change = action.payload.ch;
                state.indexes[key].index_changeper = action.payload.chp;
            }
            }
            else if(action.payload.xc === 'CSE') {
                if (state.cse_indexes[key]) {
                    state.cse_indexes[key].index_value = action.payload.v;
                    state.cse_indexes[key].index_change = action.payload.ch;
                    state.cse_indexes[key].index_changeper = action.payload.chp;
                }
            }
        
           
        },
    },
});

export const { setIndex, updateIndex , setCseIndex} = indexSlicer.actions;
export default indexSlicer.reducer;
