import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { useRef, useEffect, useState } from 'react';
import { useLazyGetTodosQuery } from './todosApiSlice';
import TodoItem from './TodoItem';

import { Collapse, List, Typography, Box, IconButton, Divider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TransitionGroup } from 'react-transition-group';

const CompletedTodoList = () => {
    const [isCompletedPanelOpen, setIsCompletedPanelOpen] = useState(false);
    const authUser = useFirebaseAuth();

    let [trigger, { data: todos, isLoading, isSuccess, isError, error }] = useLazyGetTodosQuery();

    const isFirstRun = useRef(true); // Used to prevent useEffect's first rending
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        trigger();
    }, [authUser]);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        const { entities } = todos;
        let completedTodos = [];
        for (let [id, todo] of Object.entries(entities)) {
            if (todo.completed) {
                completedTodos.push(
                    <Collapse timeout={250} key={id}>
                        {<TodoItem todo={todo} />}
                    </Collapse>
                );
            }
        }
        content = (
            <List>
                <TransitionGroup>{completedTodos}</TransitionGroup>
            </List>
        );
    } else if (isError) {
        // content = <p>{JSON.stringify(error)}</p>;
        // Expect:  {"status":400,"data":{"msg":"No todos found with uid PsijbkDmY0dELRHUJH8WQpl9UDjF"}}
        content = null;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', my: '1rem' }}>
                <IconButton
                    size='small'
                    onClick={() => setIsCompletedPanelOpen((prev) => !prev)}
                    sx={{ transform: isCompletedPanelOpen && 'rotate(90deg)', mr: 2 }}
                >
                    <ArrowForwardIosIcon fontSize='small' />
                </IconButton>
                <Typography variant='inherit'>Completed</Typography>
            </Box>
            {isCompletedPanelOpen ? (
                <Collapse
                    in={isCompletedPanelOpen}
                    // timeout={50000}
                    // easing={{
                    //     enter: 'cubic-bezier(0, 1.5, .8, 1)',
                    //     exit: 'cubic-bezier(0, 1.5, .8, 1)',
                    // }}
                >
                    {content}
                </Collapse>
            ) : (
                <Divider />
            )}
        </Box>
    );
};

export default CompletedTodoList;
