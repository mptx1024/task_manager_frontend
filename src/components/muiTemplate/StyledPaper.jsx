import { styled, Paper } from '@mui/material';

const StyledPaper = styled(Paper, { shouldForwardProp: (prop) => prop !== 'isEditing' })(({ theme, isEditing }) => ({
    outline: isEditing ? '0.5px solid grey' : '',
    height: isEditing ? '6.5rem' : '4rem',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    // marginTop: theme.spacing(1),
    margin: '0.3rem 0',
    boxShadow: '3',
    textAlign: 'center',
    padding: '0.5rem',
    display: isEditing ? null : 'flex',
    justifyContent: isEditing ? null : 'space-between',
    alignItems: 'center',
    ':hover': isEditing
        ? ''
        : {
              backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f5f5f5',
          },
    cursor: isEditing ? '' : 'pointer',
}));

export default StyledPaper;
