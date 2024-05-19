import { combineReducers } from 'redux';
import userReducer from './slices/userSlice'; // Import your slices

const rootReducer = combineReducers({
    user: userReducer,
    // Add other reducers here if needed
});

export default rootReducer;