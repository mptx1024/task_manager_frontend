import { useGetTodosQuery } from './todosApiSlice';
import TodoList from '../../features/todo/TodoList';

const ProjectPage = ({ projectId }) => {
    console.log('🚀 ~ file: ProjectPage.jsx:5 ~ ProjectPage ~ projectId', projectId);
    const { todos, isError, isLoading, error } = useGetTodosQuery('todosList', {
        selectFromResult: ({ data }) => ({
            todos: data?.ids.map((id) => data?.entities[id]).filter((todo) => todos.projectId === projectId),
        }),
    });
    // const todos = data?.ids.map((id) => data?.entities[id]);

    if (isLoading) {
        return <p>Loading</p>;
    }
    if (isError && error.status === 404) {
        return <p>No Content</p>;
    }
    return (
        <div>
            <TodoList todos={todos} />
        </div>
    );
};
export default ProjectPage;
