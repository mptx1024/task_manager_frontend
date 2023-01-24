import Navbar from './components/Navbar';
import TodoList from './features/todo/TodoList';
import AddTodo from './features/todo/AddTodo';
import CompletedTodoList from './features/todo/CompletedTodoList';
import Footer from './components/Footer';
import { lightTheme, darkTheme } from './features/theme/themes';
import { useSelector } from 'react-redux';

import { Box, ThemeProvider, CssBaseline, Stack } from '@mui/material';

function App() {
    const themeState = useSelector((state) => state.theme.theme);

    return (
        <ThemeProvider theme={themeState === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Box>
                <Navbar />
                <Stack sx={{ height: '95vh', maxHeight: '95vh', overflow: 'auto', margin: 'auto', width: '40%' }}>
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
