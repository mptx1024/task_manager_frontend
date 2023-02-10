import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: { theme: localStorage.getItem('themeMode') ? localStorage.getItem('themeMode') : 'light' },
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', state.theme);
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
