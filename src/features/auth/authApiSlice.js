import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.query({
            query: () => ({
                url: '/auth',
            }),
        }),
    }),
});

export const { useLoginQuery, useLazyLoginQuery } = authApiSlice;
