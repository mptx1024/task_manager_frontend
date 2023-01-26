import { useState } from 'react';
import StyledButton from '../../components/muiTemplate/StyledButton';
import StyledPaper from '../../components/muiTemplate/StyledPaper';
import DatePickerButton from '../../components/todo/DatePickerButton';

import { Stack, Box, TextField } from '@mui/material';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
const EditTodo = ({ setIsEditing }) => {
    const [title, setTitle] = useState('test 3');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
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
                        label={title === '' ? 'Title' : ' '}
                        variant='standard'
                        InputProps={{ style: { fontSize: '1rem' }, disableUnderline: true }} // font size of input text
                        InputLabelProps={{
                            shrink: false,
                            style: { fontSize: '1rem', transformOrigin: 'center' },
                        }}
                        value={title}
                        onChange={onTitleChange}
                        size='small'
                        // disableUnderline={true}
                        // sx={{ border: '1px solid black' }}
                    />
                    <TextField
                        fullWidth
                        id='description'
                        label={description === '' ? 'Description' : ' '}
                        variant='standard'
                        InputProps={{ style: { fontSize: '0.8rem' }, disableUnderline: true }} // font size of input text
                        InputLabelProps={{ shrink: false, style: { fontSize: '0.8rem', paddingBottom: '5px' } }}
                        value={description}
                        onChange={onDescriptionChange}
                        multiline={true}
                        rows={1}
                        size='small'
                        // sx={{ border: '1px solid blue' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', py: '8px' }}>
                        {/* <StyledButton variant='outlined' size='small' startIcon={<EventIcon />}>
                            Due Date
                        </StyledButton> */}
                        <DatePickerButton />
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
                    <StyledButton isMajor={true} size='large'>
                        Cancel
                    </StyledButton>
                    <StyledButton isMajor={true} size='large' sx={{ bgcolor: 'green', color: 'white', ml: 2 }}>
                        Save
                    </StyledButton>
                </Stack>
            </Box>
        </>
    );
};
export default EditTodo;
