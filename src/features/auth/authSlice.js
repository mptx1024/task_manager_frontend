import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state = { user: null };
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

//selector
export const selectCurrentUser = (state) => state.auth.user;
// export const isUserLoggedIn = (state) => Boolean(state.auth.user);

export default authSlice.reducer;
