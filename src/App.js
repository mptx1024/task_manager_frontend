import './App.css';
import { Box, createTheme, ThemeProvider, Stack } from '@mui/material';
import Navbar from './components/mainbar/Navbar';
import TodoList from './components/mainbar/TodoList';
import AddTodo from './components/mainbar/AddTodo';
import CompletedPanel from './components/mainbar/CompletedPanel';

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
