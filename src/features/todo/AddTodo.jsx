import React, { useState, useRef, useEffect } from 'react';
import { useAddTodosMutation } from './todosApiSlice';
import DatePickerButton from './DatePickerButton';
import StyledButton from '../../components/muiTemplate/StyledButton';
import PriorityButton from './PriorityButton';
import ProjectButton from './ProjectButton';
import { Box, Paper, InputBase, Divider } from '@mui/material';
import { useCallback } from 'react';

const AddTodo = () => {
    const [addNewTodo, { isLoading }] = useAddTodosMutation();

    const AddTodoBar = useRef(null);
    const [showActionBar, setShowActionBar] = useState(true);
    const [isFocused, setIsFocused] = useState(true);

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [priority, setPriority] = useState(false);
    const [projectId, setProjectId] = useState(null);
    // Hide action bar when clicking outside of AddTodo
    // const handleClickOutside = useCallback((e) => {
    //     if (
    //         AddTodoBar.current &&
    //         showActionBar &&
    //         !AddTodoBar.current.contains(e.target) &&
    //         // Dont hide action bar when project-btn-popover-list is in the DOM, i.e., user is clicking a project on the project popover
    //         !document.getElementById('project-btn-popover-list')
    //     ) {
    //         console.log(`handleclickOutside executed`);
    //         setShowActionBar(false);
    //     }
    // }, []);
    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, []);

    const canSave = title.trim().length !== 0 && !isLoading;

    const onKeyPress = (e) => {
        if (e.key === 'Enter') onClickAddTodo(e);
    };
    const onClickAddTodo = async (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                console.log(`projectId: ${projectId}`);
                await addNewTodo({ title, isCompleted: false, projectId, priority, dueDate });
            } catch (err) {
                console.error('Failed to save the post', err);
            }
        }
        setTitle('');
        setDueDate(null);
        setPriority(false);
        setProjectId(null);
    };

    return (
        <Box ref={AddTodoBar} sx={{ mt: 10, mb: 3 }}>
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
                    onKeyPress={onKeyPress}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {showActionBar ? (
                    <>
                        <Divider />
                        {/* alignItems:center is for vertically aligning components in the middle */}
                        <Box
                            id='add-todo-action-bar'
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                py: '0.3rem',
                                px: '1rem',
                                backgroundColor: 'background.paper',
                            }}
                        >
                            <Box sx={{ display: 'flex', '&>*': { mr: '0.8rem' } }}>
                                <DatePickerButton setDueDate={setDueDate} dueDate={dueDate} variant={'text'} />
                                <ProjectButton variant={'text'} projectId={projectId} setProjectId={setProjectId} />
                                <PriorityButton variant={'text'} priority={priority} setPriority={setPriority} />
                            </Box>
                            <StyledButton
                                variant='outlined'
                                size='small'
                                disabled={canSave ? false : true}
                                sx={{ color: 'secondary.main', ':hover': { color: 'secondary.main' } }}
                                onClick={onClickAddTodo}
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
