import PageTitle from './PageTitle';
import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import TodoList from '../../features/todo/TodoList';
import { useEffect, useState } from 'react';
import { apiSlice } from '../../app/api/apiSlice';
import { useDispatch } from 'react-redux';

const All = () => {
    const dispatch = useDispatch();
    const { data: todos, isError, isSuccess, isLoading, error } = useGetTodosQuery('todosList');
    const [isUpserting, setIsUpserting] = useState(true);

    // useEffect(() => {
    //     console.log('in useEffect, isSuccess:', isSuccess, 'todos:', todos);
    //     const upsertGetTodoCache = (todos) => {
    //         const promises = [];
    //         let len = todos.length;
    //         while (len--) {
    //             promises.push(dispatch(apiSlice.util.upsertQueryData('getTodo', todos[len]._id, { ...todos[len] })));
    //         }
    //         Promise.all(promises).then(setIsUpserting(false));
    //     };
    //     if (isSuccess && todos) {
    //         upsertGetTodoCache(todos);
    //         console.log('finished upserting');
    //     }
    // }, [dispatch, isSuccess, todos]);

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (isError) {
        return <p>{error.message}</p>;
    } else if (isSuccess) {
        if (!todos) {
            return <p>no content</p>;
        }
        return (
            <>
                <PageTitle title={'All'} />
                <TodoList todos={todos} />
            </>
        );
    }
};
export default All;
