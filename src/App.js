import Navbar from './components/nav/Navbar';
import Footer from './components/Footer';
import SideBar from './components/nav/Sidebar';
import { lightTheme, darkTheme } from './features/visual/themes';
import { useSelector } from 'react-redux';
import BodyLayout from './components/main/BodyLayout';

import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function App() {
    const themeState = useSelector((state) => state.theme.theme);

    return (
        <ThemeProvider theme={themeState === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Box>
                <SideBar />
                <Navbar />
                <BodyLayout />
                <Box display='flex' justifyContent='center' alignContent='center'>
                    <Footer />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
