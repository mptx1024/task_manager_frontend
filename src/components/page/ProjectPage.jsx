import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import { useGetProjectsQuery } from '../../features/project/ProjectsApiSlice';
import TodoList from '../../features/todo/TodoList';
import { useLocation } from 'react-router-dom';
import PageTitle from './PageTitle';
const ProjectPage = () => {
    const { state } = useLocation();

    const { todos, isError, isLoading } = useGetTodosQuery('todosList', {
        selectFromResult: ({ data }) => ({
            todos: data ? Object.values(data.entities).filter((todo) => todo.projectId === state.projectId) : null,
        }),
    });
    const { project, isProjectLoading, isProjectError } = useGetProjectsQuery('projectsList', {
        selectFromResult: ({ data }) => ({
            project: data?.entities[state.projectId],
            // project: data?.ids.map((id) => data?.entities[id]).filter((project) => project._id === state.projectId),
        }),
    });

    if (isLoading || isProjectLoading) {
        return <p>Loading...</p>;
    }
    if (isError || isProjectError) {
        return <p>No Content</p>;
    }

    return (
        <>
            <PageTitle title={project?.title} />
            {todos?.length ? <TodoList todos={todos} /> : <p>No task yet</p>}
        </>
    );
};
export default ProjectPage;
