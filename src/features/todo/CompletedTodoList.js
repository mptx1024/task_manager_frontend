import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { useRef, useEffect } from 'react';
import { useLazyGetTodosQuery } from './todosApiSlice';
import TodoItem from './TodoItem';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useCollapse from 'react-collapsed';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';

const CompletedTodoList = () => {
    const authUser = useFirebaseAuth();

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ duration: 100 });

    const [trigger, { data: todos, isLoading, isSuccess, isError, error }] = useLazyGetTodosQuery('todosCacheKey');

    const isFirstRun = useRef(true); // Used to prevent useEffect's first rending
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        trigger();
    }, [authUser]);

    const completedList = (content) => (
        // <>
        //     <div
        //         {...getToggleProps()}
        //         style={{
        //             // cursor: 'pointer',
        //             fontWeight: 'bolder',
        //             alignItems: 'center',
        //             display: 'flex',
        //         }}
        //     >
        //         <ArrowForwardIosIcon fontSize='small' sx={{ ...(isExpanded && { transform: 'rotate(90deg)' }) }} />
        //         <span>Completed</span>
        //     </div>
        //     <div {...getCollapseProps()}>{content}</div>
        // </>
        <Stack {...getToggleProps()} direction='row' alignItems='center' gap={1}>
            <ArrowForwardIosIcon fontSize='small' sx={{ ...(isExpanded && { transform: 'rotate(90deg)' }) }} />
            {/* <KeyboardArrowRightIcon fontSize='small' sx={{ ...(isExpanded && { transform: 'rotate(90deg)' }) }} /> */}
            <Typography variant='inherit'>Completed</Typography>
            <div {...getCollapseProps()}>{content}</div>
        </Stack>
    );

    let content = <p>testing</p>;
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
        content = <TransitionGroup>{completedTodos}</TransitionGroup>;
    } else if (isError) {
        // content = <p>{JSON.stringify(error)}</p>;
        // Expect:  {"status":400,"data":{"msg":"No todos found with uid PsijbkDmY0dELRHUJH8WQpl9UDjF"}}
        content = null;
    }

    return completedList(content);
};

export default CompletedTodoList;
