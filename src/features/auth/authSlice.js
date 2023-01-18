import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = null;
            console.log(`In authSlice->logout. state.user: ${state.user}`);
        },
    },
});

export const { login, logout } = authSlice.actions;

//selector
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
