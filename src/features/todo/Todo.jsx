import { useDeleteTodoMutation, useUpdateTodoMutation, useGetTodoQuery } from './todosApiSlice';
import { useGetProjectsQuery } from '../project/ProjectsApiSlice';
import { useState } from 'react';
import EditTodo from './EditTodo';
import StyledPaper from '../../components/muiTemplate/StyledPaper';
import PatchTooltip from '../../components/PatchTooltip';
import { isOverdue } from '../util/isOverdue';
import CircularLoader from '../../components/CircularLoader';
import {
    CalendarIcon,
    ProjectIcon,
    EditIcon,
    DeleteIcon,
    RadioButtonUncheckedIcon,
    RadioButtonUncheckedThickerIcon,
    CheckCircleOutlineRoundedIcon,
    CheckCircleOutlineRoundedThickerIcon,
    CheckCircleFillIcon,
} from '../../components/asset/svgIcons';

import { Box, Checkbox, IconButton, Typography } from '@mui/material';

const Todo = ({ todoId }) => {
    const { data: todo, isLoading } = useGetTodoQuery(todoId);
    const { project } = useGetProjectsQuery('projectsList', {
        selectFromResult: ({ data }) => ({
            project: data?.find((project) => project._id === todo?.projectId),
        }),
    });

    const [deleteTodo] = useDeleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    if (isLoading) {
        return <CircularLoader {...{ message: 'Loading...' }} />;
    }

    const dueDate = todo?.dueDate ? new Date(todo.dueDate) : null;
    const overdue = isOverdue(dueDate);

    const onClickEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const onClickCheckbox = () => {
        updateTodo({ ...todo, id: todo._id, completed: !todo.completed });
    };
    const onClickDelete = () => {
        deleteTodo({ id: todoId });
    };

    if (todo) {
        return isEditing ? (
            <EditTodo setIsEditing={setIsEditing} todo={todo} />
        ) : (
            // <Fade in={true} timeout={{ appear: 500, enter: 1000 }}>
            <StyledPaper isTodo={true}>
                <Box id='todo-info' sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                        id='todo-info-box-checkbox'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        icon={
                            isHovered ? (
                                todo.priority ? (
                                    <CheckCircleOutlineRoundedThickerIcon color='error' />
                                ) : (
                                    <CheckCircleOutlineRoundedIcon color='secondary' />
                                )
                            ) : todo.priority ? (
                                <RadioButtonUncheckedThickerIcon color='error' />
                            ) : (
                                <RadioButtonUncheckedIcon color='secondary' />
                            )
                        }
                        checkedIcon={<CheckCircleFillIcon color={todo.priority ? 'error' : 'secondary'} />}
                        onChange={onClickCheckbox}
                        checked={todo?.completed}
                        sx={{ mr: 1 }}
                        size='small'
                    />
                    <Box
                        id='todo-info-box'
                        // sx={{ border: '1px solid red' }}
                    >
                        <Box
                            id='todo-info-box-title'
                            sx={{
                                // border: '1px solid yellow',
                                '& .MuiTypography-root': {
                                    textAlign: 'left',
                                    maxWidth: '40vw',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                },
                            }}
                        >
                            {todo?.completed ? (
                                <Typography>
                                    <s>{todo.title}</s>
                                </Typography>
                            ) : (
                                <Typography>{todo?.title}</Typography>
                            )}
                        </Box>
                        <Box
                            id='todo-info-box-subtitle'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                // border: '1px solid black',
                                columnGap: '1rem',
                                '& .MuiTypography-root': {
                                    fontSize: '0.8rem',
                                    textAlign: 'left',
                                    maxWidth: '15vw',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                },
                            }}
                        >
                            {dueDate ? (
                                <Box
                                    id='todo-info-box-subtitle-dueDate'
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        '& > *': {
                                            color: overdue ? 'error.dark' : 'inherit',
                                        },
                                    }}
                                >
                                    <CalendarIcon sx={{ height: '18px', width: '18px', mr: '0.2rem' }} />
                                    <Typography>
                                        {overdue
                                            ? 'Overdue ' + dueDate.toLocaleDateString('en-US')
                                            : dueDate.toLocaleDateString('en-US')}
                                    </Typography>
                                </Box>
                            ) : null}

                            {project ? (
                                <Box
                                    id='todo-info-box-subtitle-project'
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        // border: '1px solid black',
                                    }}
                                >
                                    <ProjectIcon sx={{ height: '18px', width: '18px', mr: '0.2rem' }} />
                                    <Typography> {project.title}</Typography>
                                </Box>
                            ) : null}
                        </Box>
                    </Box>
                </Box>
                <Box id='todo-actions' sx={{ display: 'flex' }}>
                    <PatchTooltip title='Edit task' arrow>
                        <IconButton title='Edit' onClick={onClickEdit} sx={{ borderRadius: '50%' }}>
                            <EditIcon sx={{ height: '20px', width: '20x', color: 'secondary.main' }} />
                        </IconButton>
                    </PatchTooltip>
                    <PatchTooltip title='Delete task' arrow>
                        <IconButton title='Delete' onClick={onClickDelete} sx={{ borderRadius: '50%' }}>
                            <DeleteIcon sx={{ height: '20px', width: '20x', color: 'secondary.main' }} />
                        </IconButton>
                    </PatchTooltip>
                </Box>
            </StyledPaper>
            // </Fade>
        );
    }
    // return content;
};

export default Todo;
