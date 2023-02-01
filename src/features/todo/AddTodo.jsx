import React, { useState } from 'react';
import { useAddTodosMutation } from './todosApiSlice';
import DatePickerButton from '../../components/todo/DatePickerButton';
import StyledButton from '../../components/muiTemplate/StyledButton';
import PriorityButton from './PriorityButton';
import EventIcon from '../../components/asset/event_FILL0_wght400_GRAD0_opsz48.svg';
import { Box, Paper, InputBase, Divider, Avatar, IconButton } from '@mui/material';

const AddTodo = () => {
    const [addNewTodo, { isLoading }] = useAddTodosMutation();
    const [isInputFocused, setIsInputFocused] = useState(true);
    console.log('🚀 ~ file: AddTodo.jsx:12 ~ AddTodo ~ isInputFocused', isInputFocused);

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [Priority, setPriority] = useState(false);
    const canSave = title && !isLoading;
    const onClickAddTodo = async (e) => {
        e.preventDefault();
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
            <Paper>
                <InputBase
                    autoComplete='false'
                    fullWidth={true}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus={true}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='Add a new task'
                    inputProps={{ 'aria-label': 'Add a new task', style: { height: '40px' } }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') onClickAddTodo(e);
                    }}
                    onFocus={() => {
                        setIsInputFocused(true);
                    }}
                    onBlur={() => {
                        setIsInputFocused(false);
                    }}
                />
                {isInputFocused ? (
                    <>
                        <Divider />
                        {/* alignItems:center is for vertically aligning components in the middle */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                py: '0.3rem',
                                px: '1rem',
                            }}
                        >
                            <Box sx={{ display: 'flex', '&>*': { mr: '0.8rem' } }}>
                                <DatePickerButton setDueDate={setDueDate} dueDate={dueDate} variant={'text'} />
                                <PriorityButton variant={'text'} />
                            </Box>
                            <StyledButton
                                variant='outlined'
                                size='small'
                                disabled={title ? false : true}
                                sx={{ color: 'secondary.main', ':hover': { color: 'secondary.main' } }}
                            >
                                Add
                            </StyledButton>
                        </Box>
                    </>
                ) : null}
            </Paper>
        </Box>
    );
};

export default AddTodo;
