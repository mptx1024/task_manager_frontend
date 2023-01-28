import { useLazyGetProjectsQuery, useUpdateProjectsMutation, useAddProjectMutation } from './ProjectsApiSlice';
import { useEffect, useState, useRef } from 'react';
import { selectCurrentUser } from '../auth/authSlice';
import { useSelector } from 'react-redux';
import ProjectItem from './ProjectItem';



import { Typography, List, ListItem, Input, IconButton } from '@mui/material';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const ProjectList = () => {
    const userInState = useSelector(selectCurrentUser); // The user in redux state
    const isFirstRun = useRef(true); // Used to prevent useEffect's first rending

    const [title, setTitle] = useState('');

    let [trigger, { data, isLoading, isSuccess, isError }] = useLazyGetProjectsQuery();
    const [updateProject] = useUpdateProjectsMutation();
    const [addProject] = useAddProjectMutation();

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        trigger({}, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInState]);

    if (isLoading) {
        console.log('Loading...');
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
                    <ProjectItem key={project._id} project={project} />
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
