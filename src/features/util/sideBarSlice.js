import { createSlice } from '@reduxjs/toolkit';

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState: { sideBar: false },
    reducers: {
        toggleSideBar: (state) => {
            console.log(`in toggleSlice: ${state.sideBar}`);
            state.sideBar = !state.sideBar;
        },
    },
});

export const { toggleSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
