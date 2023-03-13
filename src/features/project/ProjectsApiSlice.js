import { apiSlice } from '../../app/api/apiSlice';
export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => ({
                url: '/projects',
            }),
            providesTags: (result, error, arg) => {
                return result
                    ? [{ type: 'Project', id: 'LIST' }, ...result.map(({ _id }) => ({ type: 'Project', _id }))]
                    : [{ type: 'Project', id: 'LIST' }];
            },
        }),

        getProject: builder.query({
            query: (id) => `/projects/${id}`,
            providesTags: (result, error, id) => [{ type: 'Project', id }],
        }),

        addProject: builder.mutation({
            query: (initialProject) => ({
                url: '/projects',
                method: 'POST',
                body: {
                    ...initialProject, // Including title
                },
            }),
            invalidatesTags: [{ type: 'Project' }],
        }),

        updateProject: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/projects/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Project' }],
        }),

        deleteProject: builder.mutation({
            query: ({ id }) => ({
                url: `/projects/${id}`,
                method: 'DELETE',

            }),
            invalidatesTags: (result, error, arg) => ['Project', { type: 'Todo', id: 'LIST' }],
            // also delete all related todos
            // [{ type: 'Project', id: arg.id }],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useGetProjectQuery,
    useLazyGetProjectsQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectsApiSlice;
