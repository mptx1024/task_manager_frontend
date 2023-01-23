import './App.css';
import { Box, createTheme, ThemeProvider, Stack } from '@mui/material';
import Navbar from './components/Navbar';
import TodoList from './features/todo/TodoList';
import AddTodo from './features/todo/AddTodo';
import CompletedTodoList from './features/todo/CompletedTodoList';
import Footer from './components/Footer';
function App() {
    return (
        // <ThemeProvider theme={theme}>
        <Box>
            <Navbar />
            <Stack sx={{ height: '80vh', margin: 'auto', width: '40%' }}>
                <AddTodo />
                <TodoList />
                <CompletedTodoList />
            </Stack>
            <Box display='flex' justifyContent='center' alignContent='center'>
                <Footer />
            </Box>
        </Box>
        // </ThemeProvider>
    );
}

export default App;
