import SocialLogin from '../../features/auth/SocialLogin';

import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useState } from 'react';

const LoginButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showPopover, setShowPopover] = useState(false);

    const onLoginClick = (e) => {
        setShowPopover((prev) => !prev);
        setAnchorEl(e.currentTarget);
    };
    const onCloseClick = () => {
        setShowPopover((prev) => !prev);
        // setAnchorEl(null);
    };

    return (
        <div>
            <Button variant='contained' onClick={onLoginClick}>
                Login
            </Button>
            <Popover
                anchorEl={anchorEl}
                open={showPopover}
                onClose={onCloseClick}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <SocialLogin />
            </Popover>
        </div>
    );
};

export default LoginButton;
