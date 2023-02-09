import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/util/themeSlice';
import sideBarReducer from '../features/util/sideBarSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        theme: themeReducer,
        sideBar: sideBarReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    // devTools: true,
    devTools: false,
});

/*
A utility used to enable refetchOnFocus and refetchOnReconnect behaviors. It requires the dispatch method from your store. Calling setupListeners(store.dispatch) will configure listeners with the recommended defaults, but you have the option of providing a callback for more granular control.
*/
setupListeners(store.dispatch);
