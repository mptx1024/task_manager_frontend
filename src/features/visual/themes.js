import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        // background: {
        //     paper: '#f2f2f2',
        // },
        // text: {
        //     primary: '#11111',
        // },
        overrides: {
            MuiPaper: {
                root: {
                    textTransform: 'lowercase',
                },
            },
            MuiBreadcrumbs: {
                root: {
                    textTransform: 'lowercase',
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: '#222',
        },
        text: {
            primary: '#fff',
        },
    },
});
