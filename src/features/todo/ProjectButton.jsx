import { useGetProjectsQuery, useUpdateProjectsMutation } from '../project/ProjectsApiSlice';

import { useState } from 'react';

import StyledButton from '../../components/muiTemplate/StyledButton';
import FlagIcon from '../../components/asset/folder.svg';
import { List, ListItem, ListItemText, ListItemButton, Popover, Divider, Typography } from '@mui/material';

const ProjectButton = ({ text, variant, setProjectId }) => {
    const { data } = useGetProjectsQuery('projectsList');
    // const projects = data?.ids.map((id) => data.entities[id].title);

    const [anchorEl, setAnchorEl] = useState(null);
    const [showPopover, setShowPopover] = useState(false);
    const [projectName, setProjectName] = useState(null); // To be shown on button

    const onClickShowPopover = (e) => {
        setShowPopover(true);
        setAnchorEl(e.currentTarget);
    };
    const onClickClose = () => {
        setShowPopover(false);
    };
    const onClickProjectInPopover = (e) => {
        setProjectId(e.currentTarget.id);
        setProjectName(e.target.textContent);
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
                {data?.ids.map((id, index) => {
                    return (
                        <div key={id}>
                            <ListItem disablePadding>
                                <ListItemButton id={id} onClick={onClickProjectInPopover}>
                                    <ListItemText primary={data.entities[id].title} />
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
                <img src={FlagIcon} alt='event-img' />
                <Typography>{projectName ? projectName : text ? text : null}</Typography>
            </StyledButton>
            {popover}
        </>
    );
};
export default ProjectButton;
