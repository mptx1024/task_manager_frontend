import { CheckCircle, RadioButtonUnchecked, Delete } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Paper, styled, Collapse, ListItem } from '@mui/material';
import { useDeleteTodosMutation, useGetTodosQuery, useUpdateTodosMutation } from './todosApiSlice';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // padding: '0 1rem',
    ':hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f5f5f5',
    },
    cursor: 'pointer',
}));

const TodoItem = ({ todo }) => {
    // console.log('🚀 ~ file: TodoItem.js:23 ~ TodoItem ~ todo', todo);

    const [deleteTodo] = useDeleteTodosMutation();
    const [updateTodo] = useUpdateTodosMutation();

    const onClickCheck = () => {
        updateTodo({ ...todo, completed: !todo.completed });
    };
    const onClickDelete = () => {
        deleteTodo({ _id: todo._id });
    };
    return (
        <StyledPaper>
            <Box sx={{ display: 'flex' }}>
                <Checkbox
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<CheckCircle sx={{ color: '#2564cf' }} />}
                    onChange={onClickCheck}
                    checked={todo.isCompleted ? true : false}
                />
                {todo.completed ? (
                    <p>
                        <s>{todo.title}</s>
                    </p>
                ) : (
                    <p>{todo.title}</p>
                )}
            </Box>
            <IconButton edge='end' aria-label='delete' title='Delete' onClick={onClickDelete}>
                <Delete />
            </IconButton>
        </StyledPaper>
    );
};

export default TodoItem;
