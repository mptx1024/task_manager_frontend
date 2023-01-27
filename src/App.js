import Navbar from './components/nav/Navbar';
import TodoList from './features/todo/TodoList';
import AddTodo from './features/todo/AddTodo';
import CompletedTodoList from './features/todo/CompletedTodoList';
import Footer from './components/Footer';
import SideBar from './components/nav/Sidebar';
import { lightTheme, darkTheme } from './features/visual/themes';
import { useSelector } from 'react-redux';

import { Box, CssBaseline, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function App() {
    const themeState = useSelector((state) => state.theme.theme);

    return (
        <ThemeProvider theme={themeState === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Box>
                <SideBar />
                <Navbar />
                <Stack
                    sx={{
                        boxSizing: 'border-box',
                        height: '95vh',
                        maxHeight: '95vh',
                        overflow: 'auto',
                        margin: 'auto',
                        width: '65%',
                    }}
                >
                    <AddTodo />
                    <TodoList />
                    <CompletedTodoList />
                </Stack>
                <Box display='flex' justifyContent='center' alignContent='center'>
                    <Footer />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
