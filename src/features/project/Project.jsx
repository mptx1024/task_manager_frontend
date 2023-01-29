import { useUpdateProjectsMutation, useDeleteProjectsMutation } from './ProjectsApiSlice';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import ProjectEditIcon from './ProjectEditIcon';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { IconButton, Box, InputBase } from '@mui/material';

const Project = ({ project }) => {
    const [updateProject] = useUpdateProjectsMutation();
    const [deleteProject] = useDeleteProjectsMutation();

    const [title, setTitle] = useState(project.title);
    const [isEditing, setIsEditing] = useState(false);

    const onClickUpdateProject = () => {
        updateProject({ _id: project._id, title });
        setIsEditing(false);
    };
    const onClickDeleteProject = () => {
        deleteProject({ _id: project._id });
    };
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    // For title input field autoFocus
    const inputElement = useRef(null);
    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, [isEditing]);

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
                        <InputBase
                            onBlur={() => setIsEditing(false)}
                            inputRef={inputElement}
                            placeholder='Email address'
                            value={title}
                            onChange={onChangeTitle}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') onClickUpdateProject();
                            }}
                        />
                    ) : (
                        project.title
                    )}
                </Box>
            </IconButton>
            <ProjectEditIcon setIsEditing={setIsEditing} onClickDeleteProject={onClickDeleteProject} />
        </Box>
    );
};
export default Project;
