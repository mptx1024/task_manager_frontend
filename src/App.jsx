import Navbar from './components/nav/Navbar';
import Footer from './components/Footer';
import BodyLayout from './components/BodyLayout';

import All from './components/page/All';
import Today from './components/page/Today';
import Important from './components/page/Important';
import { lightTheme, darkTheme } from './features/visual/themes';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function App() {
    const themeState = useSelector((state) => state.theme.theme);

    return (
        <ThemeProvider theme={themeState === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Box>
                <Navbar />
                <Routes>
                    <Route element={<BodyLayout />}>
                        <Route path='all' element={<All />} />
                        <Route path='today' element={<Today />} />
                        <Route path='important' element={<Important />} />
                        <Route index element={<Navigate to='all' replace />} />
                    </Route>
                </Routes>
                <Box display='flex' justifyContent='center' alignContent='center'>
                    <Footer />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
