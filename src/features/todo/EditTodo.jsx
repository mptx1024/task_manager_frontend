import { useState } from 'react';
import { useUpdateTodosMutation } from './todosApiSlice';
import StyledButton from '../../components/muiTemplate/StyledButton';
import StyledPaper from '../../components/muiTemplate/StyledPaper';
import DatePickerButton from './DatePickerButton';
import PriorityButton from './PriorityButton';
import ProjectButton from './ProjectButton';
import { Stack, Box, TextField } from '@mui/material';
const EditTodo = ({ setIsEditing, todo }) => {
    const [updateTodo] = useUpdateTodosMutation();

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

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
        updateTodo({ ...todo, title: title?.trim(), description: description?.trim(), dueDate, priority, projectId });
        setIsEditing(false);
    };

    return (
        <>
            <StyledPaper isEditing={true}>
                <TextField
                    autoFocus={true}
                    fullWidth
                    id='title'
                    placeholder='title'
                    variant='standard'
                    InputProps={{ style: { fontSize: '1rem' }, disableUnderline: true }}
                    //     shrink: false,
                    //     style: { fontSize: '1rem', transformOrigin: 'center' },
                    value={title}
                    onChange={onTitleChange}
                    size='small'
                    // sx={{ border: '1px solid black' }}
                />
                <TextField
                    fullWidth
                    id='description'
                    placeholder='Description'
                    variant='standard'
                    InputProps={{ style: { fontSize: '1rem' }, disableUnderline: true }}
                    value={description}
                    onChange={onDescriptionChange}
                    multiline={true}
                    rows={1}
                    size='small'
                    // sx={{ border: '1px solid blue' }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        // select the second child
                        '&>*:nth-of-type(2)': {
                            mx: '0.5rem',
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
            <Box>
                <Stack
                    direction='row'
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mr: '2px',
                        my: '10px',
                    }}
                >
                    <StyledButton onClick={onClickCancel} isMajor={true} sx={{ bgcolor: 'grey.500' }}>
                        Cancel
                    </StyledButton>

                    <StyledButton
                        onClick={onClickSave}
                        isMajor={true}
                        // size='large'
                        sx={{ bgcolor: 'secondary.main', color: 'primary.contrastText', ml: 2 }}
                        disabled={title ? false : true}
                    >
                        Save
                    </StyledButton>
                </Stack>
            </Box>
        </>
    );
};
export default EditTodo;
