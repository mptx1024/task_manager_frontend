import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const { palette } = createTheme();
export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        customBgGrey: palette.augmentColor({ color: { main: '#bdbdbd' } }),

        ...(mode === 'light'
            ? {
                  // palette values for light mode
                  background: {
                      actionBar: grey[200],
                      minorButton: grey[300],
                  },
                  contrastThreshold: 4.5,
              }
            : {
                  // palette values for dark mode
                  background: {
                      actionBar: grey[800],
                      minorButton: grey[700],
                  },
              }),
    },
});
