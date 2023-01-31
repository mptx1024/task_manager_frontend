import { useState } from 'react';
import { useUpdateTodosMutation } from './todosApiSlice';
import StyledButton from '../../components/muiTemplate/StyledButton';
import StyledPaper from '../../components/muiTemplate/StyledPaper';
import DatePickerButton from '../../components/todo/DatePickerButton';

import { Stack, Box, TextField } from '@mui/material';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
const EditTodo = ({ setIsEditing, todo }) => {
    const [updateTodo] = useUpdateTodosMutation();

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [dueDate, setDueDate] = useState(todo.dueDate ? new Date(todo.dueDate) : null);

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
        updateTodo({ ...todo, title: title?.trim(), description: description?.trim(), dueDate });
        setIsEditing(false);
    };

    return (
        <>
            <StyledPaper isEditing={true}>
                <Box
                    sx={{
                        '& > :not(style)': { m: 0.0 },
                        width: '100%',
                        align: 'left',
                    }}
                >
                    <TextField
                        autoFocus={true}
                        fullWidth
                        id='title'
                        placeholder='title'
                        variant='standard'
                        InputProps={{ style: { fontSize: '1rem' }, disableUnderline: true }} // font size of input text
                        // InputLabelProps={{
                        //     shrink: false,
                        //     style: { fontSize: '1rem', transformOrigin: 'center' },
                        // }}
                        value={title}
                        onChange={onTitleChange}
                        size='small'
                        // disableUnderline={true}
                        // sx={{ border: '1px solid black' }}
                    />
                    <TextField
                        fullWidth
                        id='description'
                        placeholder='Description'
                        variant='standard'
                        InputProps={{ style: { fontSize: '1rem' }, disableUnderline: true }} // font size of input text
                        // InputLabelProps={{
                        //     shrink: false,
                        //     style: { fontSize: '1rem', transformOrigin: 'center', paddingBottom: '5px' },
                        // }}
                        value={description}
                        onChange={onDescriptionChange}
                        multiline={true}
                        rows={1}
                        size='small'
                        // sx={{ border: '1px solid blue' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', py: '8px' }}>
                        <DatePickerButton setDueDate={setDueDate} dueDate={dueDate} />
                        <StyledButton variant='outlined' size='small' startIcon={<FlagOutlinedIcon />} sx={{ ml: 1 }}>
                            Priority
                        </StyledButton>
                    </Box>
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
