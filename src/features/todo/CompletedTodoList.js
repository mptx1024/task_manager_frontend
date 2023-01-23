import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { useRef, useEffect, useState } from 'react';
import { useLazyGetTodosQuery } from './todosApiSlice';
import TodoItem from './TodoItem';
import { Collapse, List } from '@mui/material';

import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Box } from '@mui/material';

const CompletedTodoList = () => {
    const [isOpen, setIsOpen] = useState(false);
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

    // const isSuccess = true;
    // const todos = {
    //     ids: ['1'],
    //     entities: {
    //         1: { _id: '1', completed: true, title: 'test 1' },
    //         2: { _id: '2', completed: true, title: 'test 2-1' },
    //     },
    // };

    let content;
    if (isLoading) {
        // console.log(`isLoading: ${isLoading}`);
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        const { ids, entities } = todos;
        let completedTodos = [];
        for (let [id, todo] of Object.entries(entities)) {
            if (todo.completed) {
                completedTodos.push(<Collapse key={id}> {<TodoItem todo={todo} />} </Collapse>);
            }
        }
        // content = <TransitionGroup>{completedTodos}</TransitionGroup>;
        content = (
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'middle' }}>
                    <ArrowForwardIosIcon
                        fontSize='small'
                        onClick={() => setIsOpen((prev) => !prev)}
                        sx={{ transform: isOpen && 'rotate(90deg)', mr: 1 }}
                    />
                    <Typography variant='inherit'>Completed</Typography>
                </Box>
                <Collapse
                    in={isOpen}
                    easing={{
                        enter: 'cubic-bezier(0, 1.5, .8, 1)',
                        exit: 'cubic-bezier(0, 1.5, .8, 1)',
                    }}
                >
                    <List>
                        <TransitionGroup>{completedTodos}</TransitionGroup>
                    </List>
                </Collapse>
            </Box>
        );
    } else if (isError) {
        // content = <p>{JSON.stringify(error)}</p>;
        // Expect:  {"status":400,"data":{"msg":"No todos found with uid PsijbkDmY0dELRHUJH8WQpl9UDjF"}}
        content = null;
    }

    return content;
};

export default CompletedTodoList;
