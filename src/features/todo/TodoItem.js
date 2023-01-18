import { CheckCircle, RadioButtonUnchecked, Delete } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Paper, Stack, styled } from '@mui/material';
import { useDeleteTodosMutation, useGetTodosQuery, useUpdateTodosMutation } from './todosSlice';

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
    const [deleteTodo] = useDeleteTodosMutation();
    const [updateTodos] = useUpdateTodosMutation();

    const onClickCheck = () => {
        updateTodos({ ...todo, isCompleted: !todo.isCompleted });
    };

    return (
        <Stack>
            <StyledPaper>
                <Box sx={{ display: 'flex' }}>
                    <Checkbox
                        icon={<RadioButtonUnchecked />}
                        checkedIcon={<CheckCircle sx={{ color: '#2564cf' }} />}
                        onChange={() => onClickCheck()}
                        checked={todo.isCompleted ? true : false}
                    />
                    {todo.isCompleted ? (
                        <p>
                            <s>{todo.title}</s>
                        </p>
                    ) : (
                        <p>{todo.title}</p>
                    )}
                </Box>
                <IconButton
                    edge='end'
                    aria-label='delete'
                    title='Delete'
                    onClick={() => deleteTodo(todo.id)}
                >
                    <Delete />
                </IconButton>
            </StyledPaper>
        </Stack>
    );
};

export default TodoItem;
