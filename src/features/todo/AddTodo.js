import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAddTodosMutation } from './todosApiSlice';

const AddTodo = () => {
    const [addNewTodo, { isLoading }] = useAddTodosMutation();

    const [title, setTitle] = useState('');

    const canSave = title && !isLoading;

    const onAddPostClicked = async () => {
        if (canSave) {
            if (canSave) {
                await addNewTodo({ title, isCompleted: false });
                setTitle('');
            }
            try {
            } catch (err) {
                console.error('Failed to save the post', err);
            }
        }
    };
    return (
        <Box
            sx={{
                mt: 10,
                mb: 3,
            }}
        >
            <TextField
                id='standard-basic'
                label='Add a new task'
                variant='standard'
                value={title}
                autoComplete='false'
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') onAddPostClicked();
                }}
                sx={{ width: '100%' }}
            />
        </Box>
    );
};

export default AddTodo;
