import { Button } from '@mui/material';

const LogoutButton = ({ onClickSignOut }) => {
    return (
        <Button color='inherit' onClick={onClickSignOut}>
            Logout
        </Button>
    );
};
export default LogoutButton;
