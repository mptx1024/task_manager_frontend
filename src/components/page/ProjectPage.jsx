import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import { useGetProjectsQuery, useGetProjectQuery } from '../../features/project/ProjectsApiSlice';
import TodoList from '../../features/todo/TodoList';
import { useLocation } from 'react-router-dom';
import PageTitle from './PageTitle';
const ProjectPage = () => {
    const { state } = useLocation();
    const { todos, isError, isLoading } = useGetTodosQuery('todosList', {
        selectFromResult: ({ data }) => ({
            // Using filter() to return a array
            todos: data ? data.filter((todo) => todo.projectId === state.projectId) : null,
        }),
    });

    const { project, isProjectLoading, isProjectError } = useGetProjectsQuery('projectsList', {
        selectFromResult: ({ data }) => ({
            // Using find() since looking for one project only
            project: data?.find((project) => project._id === state.projectId),
        }),
    });

    if (isLoading || isProjectLoading) {
        return <p>Loading...</p>;
    }
    if (isError || isProjectError) {
        return <p>No Content</p>;
    }
    if (project) {
        return (
            <>
                <PageTitle title={project?.title} />
                {todos?.length ? <TodoList todos={todos} /> : <p>No task yet</p>}
            </>
        );
    }
};
export default ProjectPage;
