import { useGetProjectsQuery } from '../project/ProjectsApiSlice';

import { useState } from 'react';
import { ProjectIcon } from '../../components/asset/svgIcons';
import StyledButton from '../../components/muiTemplate/StyledButton';
import { List, ListItem, ListItemText, ListItemButton, Popover, Divider, Typography } from '@mui/material';

const ProjectButton = ({ text, variant, projectId, setProjectId }) => {
    const { data } = useGetProjectsQuery('projectsList');
    const projects = data?.ids.map((id) => data.entities[id]);

    const title = projects
        ?.filter((project) => project._id && project._id === projectId)
        .map((project) => project.title);

    const [anchorEl, setAnchorEl] = useState(null);
    const [showPopover, setShowPopover] = useState(false);
    const [projectTitle, setProjectTitle] = useState(title); // To be shown on button

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
    let popoverContent;
    if (!data) {
        popoverContent = (
            <ListItem>
                <ListItemText primary={`No project. Add a project from the sidebar`} />
            </ListItem>
        );
    } else {
        popoverContent = (
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} disablePadding>
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
