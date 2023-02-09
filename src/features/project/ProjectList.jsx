import { useGetProjectsQuery, useUpdateProjectsMutation, useAddProjectMutation } from './ProjectsApiSlice';
import Project from './Project';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddProject from './AddProject';
import { Typography, List, ListItem, Input, IconButton } from '@mui/material';

const ProjectList = () => {
    const [addProject] = useAddProjectMutation();
    const [title, setTitle] = useState('');

    const { data, isLoading } = useGetProjectsQuery('projectsList');
    if (isLoading) {
        // console.log('Project Loading...');
        return <p>Loading...</p>;
    }
    const projects = data?.ids?.map((id) => data.entities[id]);

    const onClickAddProject = () => {
        if (title.trim().length !== 0) {
            addProject({ title });
        }
        setTitle('');
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    return (
        <>
            <Typography variant='subtitle1' sx={{ ml: 2, mt: 3, fontWeight: 'bold', color: 'grey' }}>
                Projects
            </Typography>
            <List
                sx={{
                    '.MuiListItemIcon-root': {
                        minWidth: '2rem',
                    },
                }}
            >
                {projects?.map((project) => (
                    <Project key={project._id} project={project} />
                ))}
                <AddProject onClickAddProject={onClickAddProject} title={title} onChangeTitle={onChangeTitle} />
            </List>
        </>
    );
};
export default ProjectList;
