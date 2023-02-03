import { useGetProjectsQuery, useUpdateProjectsMutation, useAddProjectMutation } from './ProjectsApiSlice';
import { useState } from 'react';
import Project from './Project';

import { Typography, List, ListItem, Input, IconButton } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const ProjectList = () => {
    const [title, setTitle] = useState('');

    const [updateProject] = useUpdateProjectsMutation();
    const [addProject] = useAddProjectMutation();

    const { data, isLoading, isSuccess, isError } = useGetProjectsQuery('projectsList');
    console.log('ProjectList.jsx');
    if (isLoading) {
        console.log('Project Loading...');
        return <p>Loading...</p>;
    }

    const onClickAddProject = () => {
        if (title) {
            addProject({ title });
        }
        setTitle('');
    };
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const projects = data?.ids?.map((id) => data.entities[id]);

    return (
        <>
            <Typography variant='subtitle1' sx={{ ml: 2, mt: 3, fontWeight: 'bold', color: 'grey' }}>
                Projects
            </Typography>
            <List sx={{ width: '100%' }}>
                {projects?.map((project) => (
                    <Project key={project._id} project={project} />
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
