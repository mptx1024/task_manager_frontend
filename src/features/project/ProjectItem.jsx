import { useUpdateProjectsMutation } from './ProjectsApiSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProjectItemEditIcon from './ProjectItemEditIcon';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { IconButton, TextField, Box } from '@mui/material';

const ProjectItem = ({ project }) => {
    const [updateProject] = useUpdateProjectsMutation();

    const [title, setTitle] = useState(project.title);
    const [isEditing, setIsEditing] = useState(false);

    const onClickUpdateProject = () => {
        updateProject({ _id: project._id, title });
        setIsEditing(false);
    };
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    return (
        <Box
            sx={{
                px: '0.5rem',
                '&:hover': {
                    bgcolor: 'grey.100',
                    cursor: 'pointer',
                },
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <IconButton
                disableRipple={true}
                sx={{
                    '&:hover': {
                        background: 'transparent',
                    },
                    borderRadius: 0,
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'start',
                    textAlign: 'left',
                }}
            >
                <CircleOutlinedIcon sx={{ width: 20, height: 20 }} />
                <Box
                    fontSize='h6.fontSize'
                    sx={{
                        mx: '0.5rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {isEditing ? (
                        <TextField
                            autoFocus={true}
                            placeholder='Project name'
                            value={title}
                            // variant='outlined'
                            onChange={onChangeTitle}
                            size='small'
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') onClickUpdateProject();
                            }}
                        />
                    ) : (
                        project.title
                    )}
                </Box>
            </IconButton>
            <ProjectItemEditIcon setIsEditing={setIsEditing} />
        </Box>
    );
};
export default ProjectItem;
