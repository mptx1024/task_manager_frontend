import { useDeleteTodosMutation, useUpdateTodosMutation, useGetTodosQuery } from './todosApiSlice';
import { useState } from 'react';
import EditTodo from './EditTodo';
import StyledPaper from '../../components/muiTemplate/StyledPaper';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Checkbox, IconButton, Typography, Zoom, Collapse } from '@mui/material';

const TodoItem = ({ todoId }) => {
    const { todo } = useGetTodosQuery(undefined, {
        selectFromResult: ({ data }) => ({
            // Select from cache
            todo: data?.entities[todoId],
        }),
    });

    const [deleteTodo] = useDeleteTodosMutation();
    const [updateTodo] = useUpdateTodosMutation();
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if (!todo) {
        return null;
    }
    const onClickEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const onClickCheckbox = () => {
        updateTodo({ ...todo, completed: !todo.completed });
    };
    const onClickDelete = () => {
        deleteTodo({ _id: todo._id });
    };

    return isEditing ? (
        <EditTodo setIsEditing={setIsEditing} todo={todo} />
    ) : (
        <Zoom in easing={{ enter: 'linear', exit: 'linear' }}>
            <StyledPaper>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        icon={
                            isHovered ? (
                                <CheckCircleOutlineRoundedIcon color='secondary' />
                            ) : (
                                <RadioButtonUncheckedIcon color='secondary' />
                            )
                        }
                        checkedIcon={<CheckCircleIcon color='secondary' />}
                        onChange={onClickCheckbox}
                        checked={todo?.completed}
                        sx={{ mr: 1 }}
                    />
                    {todo.completed ? (
                        <Typography>
                            <s>{todo.title}</s>
                        </Typography>
                    ) : (
                        <Typography>{todo.title}</Typography>
                    )}
                </Box>
                <Box>
                    <IconButton title='Edit' size='small' onClick={onClickEdit}>
                        <EditOutlinedIcon fontSize='small' />
                    </IconButton>
                    {/* <IconButton title='Important' size='small'>
                    <StarBorderIcon fontSize='small' />
                </IconButton> */}
                    <IconButton title='Delete' size='small' onClick={onClickDelete}>
                        <DeleteOutlinedIcon fontSize='small' />
                    </IconButton>
                </Box>
            </StyledPaper>
        </Zoom>
    );
};

export default TodoItem;
