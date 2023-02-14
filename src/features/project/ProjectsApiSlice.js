import { apiSlice } from '../../app/api/apiSlice';

// const projectsAdapter = createEntityAdapter({
//     selectId: (project) => (project._id ? project._id : null),
// });
// const initialState = projectsAdapter.getInitialState();

export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            // GET
            query: () => ({
                url: '/projects',
                // https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#handling-non-standard-response-status-codes
                //     validateStatus: (response, result) => response.status === 200 && !result.isError,
                // }),
                // transformResponse: (responseData) => {
                //     return projectsAdapter.setAll(initialState, responseData);
            }),
            providesTags: (result, error, arg) => {
                return result
                    ? [{ type: 'Project', id: 'LIST' }, ...result.map(({ _id }) => ({ type: 'Project', _id }))]
                    : [{ type: 'Project', id: 'LIST' }];
            },
        }),
        // GET
        getProject: builder.query({
            query: (id) => `/projects/${id}`,
            providesTags: (result, error, id) => [{ type: 'Project', id }],
        }),

        // POST
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
            // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
            //     const patchResult = dispatch(
            //         apiSlice.util.updateQueryData('getProject', id, (draft) => {
            //             // console.log('🚀 ~ file: todosApiSlice.jsx:58 ~ patchResult ~ draft', patch);
            //             Object.assign(draft, patch);
            //         })
            //     );

            //     try {
            //         await queryFulfilled;
            //     } catch (error) {
            //         patchResult.undo();
            //     }
            // },
            invalidatesTags: (result, error, arg) => [{ type: 'Project' }],
            // invalidatesTags: (result, error, arg) => [{ type: 'Project', id: arg.id }],
        }),

        deleteProject: builder.mutation({
            query: ({ id }) => ({
                url: `/projects/${id}`,
                method: 'DELETE',
                // body: _id,
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
