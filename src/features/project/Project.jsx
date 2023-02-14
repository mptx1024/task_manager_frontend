import { useUpdateProjectMutation, useDeleteProjectMutation, useGetProjectQuery } from './ProjectsApiSlice';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import EditProjectButton from './EditProjectButton';

import { DotIcon } from '../../components/asset/svgIcons';
import { Typography, Box, InputBase, ListItemButton, ListItemIcon, ListItem } from '@mui/material';

const Project = ({ project }) => {
    // const { data: project } = useGetProjectQuery(projectId);
    // console.log('🚀 ~ file: Project.jsx:13 ~ Project ~ project', project);

    const [updateProject] = useUpdateProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();

    const [title, setTitle] = useState(project?.title);
    const [isEditing, setIsEditing] = useState(false);

    // const [disableProjectBtn, setDisableProjectBtn] = useState(false);
    const navigate = useNavigate();

    const onClickProject = () => {
        navigate(`/project/${project._id}`, { state: { projectId: project._id, projectTitle: project.title } });
    };

    const onClickUpdateProject = () => {
        updateProject({ id: project._id, title });
        setIsEditing(false);
    };
    const onClickDeleteProject = () => {
        deleteProject({ id: project._id });
        navigate('/all');
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

    if (!project) {
        return <p>Loading...</p>;
    }
    return (
        <ListItem
            sx={{
                py: 0,
                pl: 1,
                '&:hover': { backgroundColor: 'action.hover' },
            }}
        >
            <ListItemButton
                disableRipple
                onClick={onClickProject}
                sx={{
                    minHeight: '3rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:hover': { backgroundColor: 'transparent' },
                    '&.Mui-focusVisible': {
                        backgroundColor: 'transparent',
                    },
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
                            placeholder={'Type a name'}
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
