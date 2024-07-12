import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { sidebarSlice } from './modules/sidebar';
import { userSlice } from './modules/user.module';
import { loadingSlice } from './modules/loading';
import { alertSlice } from './modules/alert';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','sidebar'],
    version: 1,
};

const rootReducer = combineReducers({
    sidebar: sidebarSlice.reducer,
    user: userSlice.reducer,
    loading: loadingSlice.reducer,
    alert: alertSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
