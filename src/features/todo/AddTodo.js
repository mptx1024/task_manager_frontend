import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAddTodosMutation } from './todosSlice';

const AddTodo = () => {
    const [addNewTodo, { isLoading }] = useAddTodosMutation();
    const [title, setTitle] = useState('');

    const canSave = title && !isLoading;

    const onAddPostClicked = async () => {
        console.log('in addTodo:', title);

        if (canSave) {
            if (canSave) {
                await addNewTodo({ title, userId: 1, isCompleted: false });
                setTitle('');
            }
            console.log('in addTodo:', title);
            try {
            } catch (err) {
                console.error('Faile to save the post', err);
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
                label='Add a new task111'
                variant='standard'
                value={title}
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
