import React, { useState, useRef } from 'react';
import { useAddTodoMutation } from './todosApiSlice';
import DatePickerButton from './DatePickerButton';
import StyledButton from '../../components/muiTemplate/StyledButton';
import PriorityButton from './PriorityButton';
import ProjectButton from './ProjectButton';
import PatchTooltip from '../../components/PatchTooltip';
import { RadioButtonUncheckedIcon } from '../../components/asset/svgIcons';
import StyledPaper from '../../components/muiTemplate/StyledPaper';
import { Box, Paper, InputBase, Divider } from '@mui/material';

const AddTodo = () => {
    const [addNewTodo, { isLoading }] = useAddTodoMutation();

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [priority, setPriority] = useState(false);
    const [projectId, setProjectId] = useState(null);

    const canSave = title.trim().length !== 0 && !isLoading;

    const onKeyPress = (e) => {
        if (e.key === 'Enter') onClickAddTodo(e);
    };
    const onClickAddTodo = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewTodo({ title, isCompleted: false, projectId, priority, dueDate: dueDate?.toJSON() });
        }
        setTitle('');
        setDueDate(null);
        setPriority(false);
        setProjectId(null);
    };

    return (
        // <Box id='add_todo_box' ref={AddTodoBar} sx={{ mt: '5rem', mb: '1rem' }}>
        <StyledPaper isAddTodo={true}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <RadioButtonUncheckedIcon color='secondary' sx={{ mx: '1rem' }} fontSize='small' />
                <InputBase
                    autoComplete='false'
                    fullWidth={true}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus={true}
                    sx={{
                        ml: 1,
                        flex: 1,
                        input: {
                            height: '40px',
                            '&::placeholder': {
                                opacity: 0.7,
                                color: 'secondary.main',
                            },
                        },
                    }}
                    placeholder='Add a task'
                    onKeyPress={onKeyPress}
                    inputProps={{ maxLength: 70 }}
                />
            </Box>

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
                    backgroundColor: 'background.actionBar',
                }}
            >
                <Box sx={{ display: 'flex', '&>*': { mr: '0.8rem' } }}>
                    <PatchTooltip title='Add due date' arrow>
                        <DatePickerButton setDueDate={setDueDate} dueDate={dueDate} variant={'text'} />
                    </PatchTooltip>
                    <PatchTooltip title='Add to project' arrow>
                        <ProjectButton variant={'text'} projectId={projectId} setProjectId={setProjectId} />
                    </PatchTooltip>
                    <PatchTooltip title='Flag as priority' arrow>
                        <PriorityButton variant={'text'} priority={priority} setPriority={setPriority} />
                    </PatchTooltip>
                </Box>
                <PatchTooltip title='Add a task' arrow>
                    <StyledButton
                        variant='outlined'
                        size='small'
                        disabled={canSave ? false : true}
                        sx={{ color: 'secondary.main', ':hover': { color: 'secondary.main' } }}
                        onClick={onClickAddTodo}
                    >
                        Add
                    </StyledButton>
                </PatchTooltip>
            </Box>
        </StyledPaper>
        // </Box>
    );
};

export default AddTodo;
