import { useGetProjectsQuery, useUpdateProjectsMutation, useAddProjectMutation } from './ProjectsApiSlice';
import Project from './Project';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, List, ListItem, Input, IconButton, ListItemButton } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const ProjectList = () => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const [addProject] = useAddProjectMutation();

    const { data, isLoading, isSuccess, isError } = useGetProjectsQuery('projectsList');
    if (isLoading) {
        // console.log('Project Loading...');
        return <p>Loading...</p>;
    }

    const onClickProject = (projectId) => {
        navigate(`/project/${projectId}`, { state: { projectId } });
    };

    const onClickAddProject = () => {
        if (title) {
            addProject({ title });
        }
        setTitle('');
    };

    const onChangeTitle = (key) => {
        setTitle(key);
    };
    const projects = data?.ids?.map((id) => data.entities[id]);

    return (
        <>
            <Typography variant='subtitle1' sx={{ ml: 2, mt: 3, fontWeight: 'bold', color: 'grey' }}>
                Projects
            </Typography>
            <List sx={{ width: '100%' }}>
                {projects?.map((project) => (
                    <ListItemButton key={project._id} onClick={() => onClickProject(project._id)}>
                        <Project project={project} />
                    </ListItemButton>
                ))}
                <ListItem>
                    {/* New project input */}
                    <Input
                        autoComplete='false'
                        type='text'
                        placeholder='New project'
                        onChange={onChangeTitle}
                        value={title}
                        disableUnderline={true}
                        required
                    />
                    <IconButton onClick={onClickAddProject}>
                        <AddOutlinedIcon />
                    </IconButton>
                </ListItem>
            </List>
        </>
    );
};
export default ProjectList;
