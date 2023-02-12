import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            // console.log(`In authSlice->login. state.auth: ${JSON.stringify(state)}`);
        },
        logout: (state, action) => {
            state = { user: null };
            // console.log(`In authSlice->logout. state.auth: ${JSON.stringify(state)}`);
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

//selector
export const selectCurrentUser = (state) => state.auth.user;
// export const isUserLoggedIn = (state) => Boolean(state.auth.user);

export default authSlice.reducer;
