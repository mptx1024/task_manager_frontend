import { styled, Button } from '@mui/material';
const StyledButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isMajor' })(({ theme, isMajor }) => ({
    color: isMajor ? theme.palette.grey[900] : theme.palette.grey[600],
    // fontSize: '0.8rem',
    textTransform: 'capitalize',
    borderColor: theme.palette.grey[400],
    backgroundColor: isMajor ? theme.palette.grey[300] : null,

    ':hover': isMajor
        ? null
        : {
              color: theme.palette.grey[800],
              backgroundColor: theme.palette.grey[300],
              borderColor: theme.palette.grey[400],
          },
}));

export default StyledButton;
