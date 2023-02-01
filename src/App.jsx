import Navbar from './components/nav/Navbar';
import Footer from './components/Footer';
import BodyLayout from './components/BodyLayout';
import Login from './features/auth/Login';
import Layout from './components/Layout';

import All from './components/page/All';
import Today from './components/page/Today';
import Important from './components/page/Important';
import Prefetch from './features/auth/Prefetch';
import { lightTheme, darkTheme } from './features/visual/themes';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import TodoList from './features/todo/TodoList';

import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function App() {
    const userInState = useSelector((state) => state.auth.user);
    const themeState = useSelector((state) => state.theme.theme);

    return (
        <ThemeProvider theme={themeState === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            {userInState ? (
                <Routes>
                    <Route element={<Prefetch />}>
                        {/* <Route path='/all' element={<Layout />}> */}
                        <Route path='/' element={<Layout />}>
                            {/* <Route element={<BodyLayout />}> */}
                            <Route index element={<All />} />
                        </Route>
                    </Route>
                    {/* </Route> */}
                </Routes>
            ) : (
                <Routes>
                    <Route path='/' element={<Login />} />
                </Routes>
            )}
            <Box display='flex' justifyContent='center' alignContent='center'>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}
export default App;

// <Route path='bodylayout' element={<BodyLayout />}>
// <Route path='all' element={<All />} />
// <Route path='today' element={<Today />} />
// <Route path='important' element={<Important />} />
// {/* <Route index element={<Navigate to='all' replace />} /> */}
// </Route>
