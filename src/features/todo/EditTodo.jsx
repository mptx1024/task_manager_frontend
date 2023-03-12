import { useState } from 'react';
import { useUpdateTodoMutation } from './todosApiSlice';
import StyledButton from '../../components/muiTemplate/StyledButton';
import StyledPaper from '../../components/muiTemplate/StyledPaper';
import DatePickerButton from './DatePickerButton';
import PriorityButton from './PriorityButton';
import ProjectButton from './ProjectButton';

import { Box, Typography, InputBase, useTheme } from '@mui/material';
const EditTodo = ({ setIsEditing, todo }) => {
    const [updateTodo] = useUpdateTodoMutation();

    const [title, setTitle] = useState(todo.title || '');
    const [description, setDescription] = useState(todo.description || '');

    const [dueDate, setDueDate] = useState(todo.dueDate ? new Date(todo.dueDate) : null);

    const [priority, setPriority] = useState(todo.priority);
    const [projectId, setProjectId] = useState(todo.projectId);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const onClickCancel = () => {
        setIsEditing(false);
    };

    const onClickSave = () => {
        updateTodo({
            id: todo._id,
            title: title?.trim(),
            description: description?.trim(),
            dueDate: dueDate?.toJSON(),
            priority,
            projectId,
        });
        setIsEditing(false);
    };
    const theme = useTheme();
    return (
        <div id='edit_todo'>
            <StyledPaper id='edit_todo_container' isEditing={true}>
                <InputBase
                    id='edit-todo-title'
                    autoFocus={true}
                    fullWidth
                    placeholder='title'
                    variant='standard'
                    inputProps={{ style: { fontSize: '1rem', color: theme.palette.text.primary }, maxLength: 70 }}
                    value={title}
                    onChange={onTitleChange}
                    size='small'
                />
                <InputBase
                    id='edit-todo-description'
                    fullWidth
                    placeholder='Description'
                    // variant='standard'
                    inputProps={{
                        style: { fontSize: '0.8rem', color: theme.palette.text.secondary },
                        maxLength: 300,
                    }}
                    value={description}
                    onChange={onDescriptionChange}
                    multiline={true}
                    maxRows={2}
                    minRows={1}
                    size='small'
                />
                <Box
                    id='edit-todo-action-btn-group'
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        // select the second child
                        '&>*:nth-of-type(2)': {
                            mx: '0.5rem',
                        },
                        '& .MuiTypography-root': {
                            textAlign: 'left',
                            maxWidth: '10vw',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <DatePickerButton
                        setDueDate={setDueDate}
                        dueDate={dueDate}
                        text={'Due Date'}
                        variant={'outlined'}
                    />
                    <PriorityButton
                        setPriority={setPriority}
                        priority={priority}
                        text={'Priority'}
                        variant={'outlined'}
                    />
                    <ProjectButton
                        projectId={projectId}
                        setProjectId={setProjectId}
                        text='Project'
                        variant={'outlined'}
                    />
                </Box>
            </StyledPaper>
            <Box
                id='edit_todo_btns'
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mr: '2px',
                    my: '10px',
                }}
            >
                <StyledButton
                    onClick={onClickCancel}
                    isMajor={true}
                    variant='contained'
                    sx={{
                        backgroundColor: 'customBgGrey.main',
                        ':hover': { backgroundColor: 'customBgGrey.dark' },
                    }}
                    // color='custom'
                >
                    <Typography>Cancel</Typography>
                </StyledButton>

                <StyledButton
                    onClick={onClickSave}
                    isMajor={true}
                    variant='contained'
                    sx={{
                        backgroundColor: 'secondary.main',
                        ml: 2,
                        ':hover': { backgroundColor: 'secondary.dark' },
                    }}
                    disabled={title ? false : true}
                >
                    <Typography>Save</Typography>
                </StyledButton>
            </Box>
        </div>
    );
};
export default EditTodo;
