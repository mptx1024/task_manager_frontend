import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper, { shouldForwardProp: (prop) => prop !== 'isEditing' })(({ theme, isEditing }) => ({
    ...(isEditing === true
        ? {
              // EditTodo.jsx
              maxHeight: '8rem',
              outline: '0.5px solid grey',
          }
        : {
              // Todo.jsx
              maxHeight: '3.5rem',
              display: 'flex',
              justifyContent: 'space-between',
          }),
    color: theme.palette.text.secondary,
    margin: '0.3rem 0',
    boxShadow: '3',
    textAlign: 'center',
    padding: '0.5rem',
    alignItems: 'center',
    ':hover': {
        backgroundColor: theme.palette.action.hover,
    },
    // cursor: isEditing ? '' : 'pointer',
}));

export default StyledPaper;
