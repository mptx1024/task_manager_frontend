import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            // console.log(`In authSlice->login. state: ${JSON.stringify(state)}`);
        },
        logout: (state, action) => {
            state = null;
            // console.log(`In authSlice->logout. state: ${state}`);
        },
    },
});

export const { login, logout } = authSlice.actions;

//selector
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
