import { useGetProjectsQuery, useAddProjectMutation } from './ProjectsApiSlice';
import Project from './Project';
import { useState } from 'react';
import CircularLoader from '../../components/CircularLoader';
import AddProject from './AddProject';
import { Typography, List } from '@mui/material';

const ProjectList = () => {
    const [addProject, { isLoading: isAdding }] = useAddProjectMutation();
    const [title, setTitle] = useState('');
    const { data: projects, isLoading } = useGetProjectsQuery('projectsList');

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
            {isAdding || isLoading ? (
                <CircularLoader {...{ message: 'Loading...' }} />
            ) : (
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
            )}
        </>
    );
};
export default ProjectList;
