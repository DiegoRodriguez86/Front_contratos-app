import { configureStore } from '@reduxjs/toolkit';
import { sidebarSlice } from './modules/sidebar';
import { userSlice } from './modules/user.module';
import { loadingSlice } from './modules/loading';
import { alertSlice } from './modules/alert';

export const store = configureStore({
    reducer:{
        sidebar: sidebarSlice.reducer,
        user: userSlice.reducer,
        loading: loadingSlice.reducer,
        alert: alertSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;