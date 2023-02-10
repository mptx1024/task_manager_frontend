import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:3500/api/v1',
    baseUrl: process.env.REACT_APP_API_END_POINT,

    prepareHeaders: (Headers, { getState }) => {
        const user = getState().auth.user; // Destruct user in state to get the token
        // console.log('🚀 ~ file: apiSlice.js:7 ~ firebaseIdToken', user?.firebaseIdToken);
        if (user) {
            Headers.set('authorization', `Bearer ${user.firebaseIdToken}`);
        }
        return Headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: ['Todo', 'Project'],
    endpoints: (builder) => ({}),
});
