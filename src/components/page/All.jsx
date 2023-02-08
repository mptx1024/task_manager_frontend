import PageTitle from './PageTitle';
import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import TodoList from '../../features/todo/TodoList';

const All = () => {
    const { data, isError, isLoading, error } = useGetTodosQuery('todosList');
    const todos = data?.ids.map((id) => data?.entities[id]);

    if (isLoading) {
        return <p>Loading</p>;
    }
    if (isError && error.status === 404) {
        return <p>No Content</p>;
    }
    return (
        <>
            <PageTitle title={'All'} />
            <TodoList todos={todos} />
        </>
    );
};
export default All;
