import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';

import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    Typography,
    Avatar,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const AvatarPopoverContent = () => {
    const userInState = useSelector(selectCurrentUser); // The user in redux state

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems='flex-start'>
                <ListItemAvatar sx={{ width: 50, height: 50 }}>
                    <Avatar src={userInState.photoUrl} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography sx={{ fontWeight: 'medium' }} component='div' variant='body1' color='text.primary'>
                            {userInState.firstName + ' ' + userInState.lastName[0]}
                        </Typography>
                    }
                    secondary={
                        <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.secondary'>
                            {userInState.email}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Log out'} />
                </ListItemButton>
            </ListItem>
        </List>
    );
};
export default AvatarPopoverContent;
