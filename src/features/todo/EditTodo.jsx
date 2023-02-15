import { useState } from 'react';
import { useUpdateTodoMutation } from './todosApiSlice';
import StyledButton from '../../components/muiTemplate/StyledButton';
import StyledPaper from '../../components/muiTemplate/StyledPaper';
import DatePickerButton from './DatePickerButton';
import PriorityButton from './PriorityButton';
import ProjectButton from './ProjectButton';
import { Stack, Box, Typography, InputBase } from '@mui/material';
const EditTodo = ({ setIsEditing, todo }) => {
    const [updateTodo] = useUpdateTodoMutation();

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

    return (
        <>
            <StyledPaper isEditing={true}>
                <InputBase
                    autoFocus={true}
                    fullWidth
                    id='title'
                    placeholder='title'
                    variant='standard'
                    inputProps={{ style: { fontSize: '1rem' }, maxLength: 70 }}
                    //     shrink: false,
                    //     style: { fontSize: '1rem', transformOrigin: 'center' },
                    value={title}
                    onChange={onTitleChange}
                    size='small'
                    // sx={{ border: '1px solid black' }}
                />
                <InputBase
                    fullWidth
                    id='description'
                    placeholder='Description'
                    variant='standard'
                    inputProps={{ style: { fontSize: '1rem' }, maxLength: 300 }}
                    value={description}
                    onChange={onDescriptionChange}
                    multiline={true}
                    maxRows={2}
                    minRows={1}
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
                </Stack>
            </Box>
        </>
    );
};
export default EditTodo;
