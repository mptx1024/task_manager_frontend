import All from './components/page/All';
import BodyLayout from './components/BodyLayout';
import Login from './features/auth/Login';
import Layout from './components/Layout';
import { useMemo } from 'react';

import Today from './components/page/Today';
import Priority from './components/page/Priority';
import Prefetch from './features/auth/Prefetch';
import { getDesignTokens } from './features/util/themes';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import ProjectPage from './components/page/ProjectPage';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function App() {
    const mode = useSelector((state) => state.theme.theme);
    const theme = useMemo(() => getDesignTokens(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route element={<Login />}>
                        <Route element={<Prefetch />}>
                            <Route element={<BodyLayout />}>
                                <Route index element={<All />} />
                                <Route path='priority' element={<Priority />} />
                                <Route path='today' element={<Today />} />
                                <Route path='project'>
                                    <Route path=':id' element={<ProjectPage />} />
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </ThemeProvider>
    );
}
export default App;
