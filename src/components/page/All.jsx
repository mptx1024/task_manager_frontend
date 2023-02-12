import PageTitle from './PageTitle';
import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import TodoList from '../../features/todo/TodoList';

const All = () => {
    const { data, isError, isSuccess, isLoading, error } = useGetTodosQuery('todosList');
    const todos = data?.ids.map((id) => data?.entities[id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (isError) {
        return <p>{error.message}</p>;
    }
    if (isSuccess) {
        if (todos.length === 0) {
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
