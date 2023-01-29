import { useState } from 'react';
import {
    IconButton,
    Popover,
    List,
    ListItem,
    ListItemText,
    Divider,
    ListItemButton,
    ListItemIcon,
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const ProjectEditIcon = ({ setIsEditing, onClickDeleteProject }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showPopover, setShowPopover] = useState(false);

    const onClickShowPopover = (e) => {
        setShowPopover(true);
        setAnchorEl(e.currentTarget);
    };
    const onClickClose = () => {
        setShowPopover(false);
    };

    const onClickEdit = () => {
        setIsEditing(true);
        setShowPopover(false);
    };

    const popoverContent = (
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
                <ListItemButton onClick={onClickDeleteProject}>
                    <ListItemIcon>
                        <DeleteOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Delete'} />
                </ListItemButton>
            </ListItem>
        </List>
    );

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
            <IconButton
                sx={{
                    '&:hover': {
                        background: 'transparent',
                    },
                    borderRadius: 0,
                    width: '10%',
                }}
                onClick={onClickShowPopover}
            >
                <MoreHorizOutlinedIcon sx={{ '&:hover': { color: 'blue' } }} />
            </IconButton>
            {popover}
        </>
    );
};
export default ProjectEditIcon;
