import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import TodoList from '../../features/todo/TodoList';
import PageTitle from './PageTitle';
const Today = () => {
    const { todos, isError, isLoading, error } = useGetTodosQuery('todosList', {
        selectFromResult: ({ data }) => ({
            todos: data?.filter(
                (todo) => new Date(todo.dueDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
            ),
        }),
    });

    return (
        <>
            <PageTitle title={'Today'} />
            {isLoading ? <p>Loading..</p> : todos?.length === 0 ? <p>No Task</p> : <TodoList todos={todos} />}
        </>
    );
};
export default Today;
