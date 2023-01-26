import { styled, Paper } from '@mui/material';

const StyledPaper = styled(Paper, { shouldForwardProp: (prop) => prop !== 'isEditing' })(({ theme, isEditing }) => ({
    outline: isEditing ? '0.5px solid grey' : '',
    height: isEditing ? '8rem' : '4rem',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // marginTop: theme.spacing(1),
    margin: '3px',
    boxShadow: '3',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    display: 'flex',
    justifyContent: isEditing ? 'normal' : 'space-between',
    // justifyContent: 'space-between',
    alignItems: 'center',
    ':hover': isEditing
        ? ''
        : {
              backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f5f5f5',
          },
    cursor: isEditing ? '' : 'pointer',
}));

export default StyledPaper;
