import './App.css';
import { Box, createTheme, ThemeProvider, Stack } from '@mui/material';
import Navbar from './components/Navbar';
import TodoList from './features/todo/TodoList';
import AddTodo from './features/todo/AddTodo';
import CompletedPanel from './features/todo/CompletedPanel';

function App() {
    return (
        // <ThemeProvider theme={theme}>
        <div sx={{ height: '100vh' }}>
            <Box
                sx={{
                    bgcolor: 'background.default',
                    color: 'text.primary',
                }}
            >
                <Navbar />
                <Stack sx={{ height: '100vh', margin: 'auto', width: '40%' }}>
                    <AddTodo />
                    <TodoList />
                    <CompletedPanel />
                </Stack>
            </Box>
        </div>
        // </ThemeProvider>
    );
}

export default App;
