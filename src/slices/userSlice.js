import { createSlice } from '@reduxjs/toolkit';

// userSlice.js
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === true,
    userData: JSON.parse(localStorage.getItem('userData')),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.userData = action.payload;
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('userData', JSON.stringify(action.payload));
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userData = null;
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
        }
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;