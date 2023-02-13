import { useGetProjectsQuery } from '../project/ProjectsApiSlice';

import { useState, useEffect } from 'react';
import { ProjectIcon } from '../../components/asset/svgIcons';
import StyledButton from '../../components/muiTemplate/StyledButton';
import { List, ListItem, ListItemText, ListItemButton, Popover, Divider, Typography } from '@mui/material';

const ProjectButton = ({ text, variant, projectId, setProjectId }) => {
    const { data: projects } = useGetProjectsQuery('projectsList');
    // const projects = data?.ids.map((id) => data.entities[id]);

    const title = projects
        ?.filter((project) => project._id && project._id === projectId)
        .map((project) => project.title);

    const [anchorEl, setAnchorEl] = useState(null);
    const [showPopover, setShowPopover] = useState(false);
    // Shown on the project button
    const [projectTitle, setProjectTitle] = useState(title);

    useEffect(() => {
        // console.log(`projectId in button: ${projectId}`);
        if (!projectId) {
            setProjectTitle(null);
        }
    }, [projectId]);

    const onClickShowPopover = (e) => {
        setShowPopover(true);
        setAnchorEl(e.currentTarget);
    };
    const onClickClose = () => {
        setShowPopover(false);
    };
    const onClickProjectInPopover = (e) => {
        setProjectId(e.currentTarget.id);
        setProjectTitle(e.target.textContent);
        setShowPopover(false);
    };
    const onClickRemoveProject = () => {
        setProjectId(null);
        setShowPopover(false);
    };
    let popoverContent;
    if (!projects) {
        popoverContent = (
            <ListItem>
                <ListItemText primary={`No project. Add a project from the sidebar`} />
            </ListItem>
        );
    } else {
        popoverContent = (
            <List
                id='project-btn-popover-list'
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                disablePadding
            >
                {projects?.map((project) => {
                    return (
                        <div key={project._id}>
                            <ListItem disablePadding>
                                <ListItemButton id={project._id} onClick={onClickProjectInPopover}>
                                    <ListItemText primary={project.title} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </div>
                    );
                })}
                <ListItem disablePadding>
                    <ListItemButton onClick={onClickRemoveProject}>
                        <ListItemText primary={'Remove Project'} sx={{ color: 'red' }} />
                    </ListItemButton>
                </ListItem>
            </List>
        );
    }

    const popover = (
        <Popover
            anchorEl={anchorEl}
            open={showPopover}
            onClose={onClickClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            {popoverContent}
        </Popover>
    );
    return (
        <>
            <StyledButton onClick={onClickShowPopover} variant={variant} size='small'>
                <ProjectIcon fontSize='small' />
                {projectTitle?.length ? (
                    <Typography>{projectTitle}</Typography>
                ) : text ? (
                    <Typography>{text}</Typography>
                ) : null}
            </StyledButton>
            {popover}
        </>
    );
};
export default ProjectButton;
