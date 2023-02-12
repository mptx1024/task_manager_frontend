import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const projectsAdapter = createEntityAdapter({
    selectId: (project) => (project._id ? project._id : null),
});
const initialState = projectsAdapter.getInitialState();

export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            // GET
            query: () => ({
                url: '/projects',
                // https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#handling-non-standard-response-status-codes
                validateStatus: (response, result) => response.status === 200 && !result.isError,
            }),
            transformResponse: (responseData) => {
                return projectsAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{ type: 'Project', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Project', id }))];
                } else return [{ type: 'Project', id: 'LIST' }];
            },
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
            invalidatesTags: [{ type: 'Project', id: 'LIST' }],
        }),
        // PATCH
        updateProjects: builder.mutation({
            query: (initialProject) => ({
                url: '/projects',
                method: 'PATCH',
                body: {
                    ...initialProject,
                },
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Project', id: arg.id }],
        }),
        // DELETE
        deleteProjects: builder.mutation({
            query: (_id) => ({
                url: '/projects',
                method: 'DELETE',
                body: _id,
            }),
            invalidatesTags: (result, error, arg) => ['Project', 'Todo'], // also delete all related todos
            // [{ type: 'Project', id: arg.id }],
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useLazyGetProjectsQuery,
    useAddProjectMutation,
    useUpdateProjectsMutation,
    useDeleteProjectsMutation,
} = projectsApiSlice;
