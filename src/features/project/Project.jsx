import { useUpdateProjectsMutation, useDeleteProjectsMutation } from './ProjectsApiSlice';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import EditProjectButton from './EditProjectButton';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { DotIcon } from '../../components/asset/svgIcons';
import { Typography, Box, InputBase, ListItemButton, ListItemIcon, ListItem } from '@mui/material';

const Project = ({ project, onClickProject }) => {
    const [updateProject] = useUpdateProjectsMutation();
    const [deleteProject] = useDeleteProjectsMutation();

    const [title, setTitle] = useState(project.title);
    const [isEditing, setIsEditing] = useState(false);
    // const [disableProjectBtn, setDisableProjectBtn] = useState(false);

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
        <ListItem sx={{ py: 0, '&:hover': { backgroundColor: 'action.hover' } }}>
            <ListItemButton
                disableRipple
                onClick={() => onClickProject(project._id)}
                sx={{
                    minHeight: '3rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:hover': { backgroundColor: 'transparent' },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemIcon>
                        <DotIcon sx={{ width: 15, height: 15, color: 'secondary.main' }} />
                    </ListItemIcon>
                    {isEditing ? (
                        <InputBase
                            onBlur={() => setIsEditing(false)}
                            inputRef={inputElement}
                            placeholder='Type a name'
                            value={title}
                            onChange={onChangeTitle}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') onClickUpdateProject();
                            }}
                        />
                    ) : (
                        <Typography sx={{ maxWidth: '7rem' }} noWrap={true}>
                            {project.title}
                        </Typography>
                    )}
                </Box>
            </ListItemButton>
            <EditProjectButton setIsEditing={setIsEditing} onClickDeleteProject={onClickDeleteProject} />
        </ListItem>
    );
};
export default Project;
