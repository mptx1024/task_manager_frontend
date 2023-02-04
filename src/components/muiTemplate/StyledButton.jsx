import { styled, Button, ButtonBase } from '@mui/material';
const StyledButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isMajor' })(({ theme, isMajor }) => ({
    // color: isMajor ? theme.palette.grey[50] : theme.palette.grey[700],
    textTransform: 'capitalize',
    borderColor: theme.palette.grey[400],
    width: isMajor ? '5rem' : null,
    height: isMajor ? '2.5rem' : '2rem',
    borderRadius: '0.3rem',
    minHeight: 0,
    minWidth: 0,
    '& > .MuiSvgIcon-root': {
        color: theme.palette.action.active,
    },
    '& > .MuiTypography-root': {
        fontSize: '0.8rem',
        paddingLeft: '5px',
        color: isMajor ? null : theme.palette.text.primary,
    },
    ':hover': isMajor
        ? null
        : {
              color: theme.palette.grey[600],
              backgroundColor: theme.palette.grey[300],
              borderColor: theme.palette.grey[400],
          },
    '& > img': {
        filter: isMajor
            ? null
            : 'invert(73%) sepia(0%) saturate(927%) hue-rotate(195deg) brightness(87%) contrast(87%)',
        height: '1.3rem',
        weight: '1.3rem',
    },
}));

export default StyledButton;
