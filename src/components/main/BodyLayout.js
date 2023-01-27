import { Stack } from '@mui/material';
import AddTodo from '../../features/todo/AddTodo';
import TodoList from '../../features/todo/TodoList';
import CompletedTodoList from '../../features/todo/CompletedTodoList';

const BodyLayout = () => {
    return (
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
    );
};
export default BodyLayout;
