import { createSlice } from '@reduxjs/toolkit';

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState: { sideBar: false },
    reducers: {
        toggleSideBar: (state) => {
            state.sideBar = !state.sideBar;
        },
    },
});

export const { toggleSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
