import { styled, Button } from '@mui/material';
const StyledButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isMajor' && prop !== 'overdue' })(
    ({ theme, isMajor, overdue }) => ({
        textTransform: 'capitalize',
        borderColor: theme.palette.grey[400],
        width: isMajor ? '5rem' : null,
        height: isMajor ? '2.5rem' : '2rem',
        borderRadius: '0.3rem',
        minHeight: 0,
        minWidth: 0,
        '& .MuiSvgIcon-root': {
            color: overdue ? theme.palette.error.dark : theme.palette.action.active,
        },
        '& .MuiTypography-root': isMajor
            ? null
            : {
                  fontSize: '0.8rem',
                  paddingLeft: '5px',
                  color: overdue ? theme.palette.error.dark : theme.palette.text.secondary,
              },
        ':hover': isMajor
            ? null
            : {
                  backgroundColor: theme.palette.background.minorButton,
                  borderColor: theme.palette.grey[300],
              },
    })
);

export default StyledButton;
