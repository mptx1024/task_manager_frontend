import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAddTodosMutation } from './todosApiSlice';

const AddTodo = () => {
    const [addNewTodo, { isLoading }] = useAddTodosMutation();

    const [title, setTitle] = useState('');

    const canSave = title && !isLoading;

    const onClickAddTodo = async () => {
        if (canSave) {
            try {
                await addNewTodo({ title, isCompleted: false });
                setTitle('');
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
                    if (e.key === 'Enter') onClickAddTodo();
                }}
                sx={{
                    width: '100%',
                    '& .MuiInput-underline:before': { borderBottomColor: 'orange' },
                    '& .MuiInput-underline:after': { borderBottomColor: 'orange' },
                }}
            />
        </Box>
    );
};

export default AddTodo;
