import { useState } from 'react';
import { useDeleteProjectsMutation } from './ProjectsApiSlice';
import { List, ListItem, ListItemText, Divider, ListItemButton, ListItemIcon } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const ProjectEditPopoverContent = ({ setIsEditing }) => {
    const onClickEdit = () => {};
    const onClickDelete = () => {};
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} disablePadding>
            <ListItem disablePadding>
                <ListItemButton onClick={onClickEdit}>
                    <ListItemIcon>
                        <EditOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Edit'} />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton onClick={onClickDelete}>
                    <ListItemIcon>
                        <DeleteOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Delete'} />
                </ListItemButton>
            </ListItem>
        </List>
    );
};
export default ProjectEditPopoverContent;
