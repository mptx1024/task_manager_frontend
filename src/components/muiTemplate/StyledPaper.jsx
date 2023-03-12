import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper, {
    shouldForwardProp: (prop) => !['isEditing', 'isAddTodo', 'isTodo'].includes(prop),
})(({ theme, isEditing, isAddTodo, isTodo }) => ({
    ...(isAddTodo === true
        ? {
              // AddTodo.jsx
          }
        : isEditing === true
        ? {
              // EditTodo.jsx
              maxHeight: '8rem',
              outline: '0.5px solid grey',
              padding: '0.5rem',
          }
        : isTodo === true
        ? {
              // Todo.jsx
              maxHeight: '3.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem',

              ':hover': {
                  backgroundColor: theme.palette.action.hover,
              },
          }
        : null),

    color: theme.palette.text.secondary,
    margin: '0.3rem 0',
    // Controls width of the todo / addTodo /editTodo bar
    minWidth: '15rem',
    maxWidth: '100%',
    alignItems: 'center',
}));

export default StyledPaper;
