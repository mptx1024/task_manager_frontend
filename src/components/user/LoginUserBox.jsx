import { useState } from 'react';
import AvatarPopoverContent from './AvatarPopoverContent';

import { Avatar, IconButton, Popover } from '@mui/material';

const LoginUserBox = ({ userInState }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showPopover, setShowPopover] = useState(false);

    const onAvatarClick = (e) => {
        setShowPopover(true);
        setAnchorEl(e.currentTarget);
    };
    const onCloseClick = () => {
        setShowPopover(false);
        // setAnchorEl(null);
    };

    const popover = (
        <Popover
            anchorEl={anchorEl}
            open={showPopover}
            onClose={onCloseClick}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <AvatarPopoverContent />
        </Popover>
    );

    return (
        <>
            <IconButton onClick={onAvatarClick} sx={{ height: 25, width: 25, ml: 2 }}>
                <Avatar
                    src={userInState?.photoUrl}
                    imgProps={{ referrerPolicy: 'no-referrer' }}
                    sx={{ width: 25, height: 25 }}
                />
                {/* <Typography sx={{ mr: 1, ml: 0.5 }}>{userInState?.firstName}</Typography> */}
            </IconButton>
            {popover}
        </>
    );
};
export default LoginUserBox;
