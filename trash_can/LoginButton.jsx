import SocialLogin from '../src/features/auth/SocialLogin';

import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useState } from 'react';

const LoginButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showPopover, setShowPopover] = useState(false);

    const onClickLogin = (e) => {
        setShowPopover((prev) => !prev);
        setAnchorEl(e.currentTarget);
    };
    const onClickClose = () => {
        setShowPopover((prev) => !prev);
        // setAnchorEl(null);
    };

    return (
        <div>
            <Button variant='contained' onClick={onClickLogin}>
                Login
            </Button>
            <Popover
                anchorEl={anchorEl}
                open={showPopover}
                onClose={onClickClose}
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
