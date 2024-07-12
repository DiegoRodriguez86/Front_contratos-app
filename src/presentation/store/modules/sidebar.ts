import { createSlice } from '@reduxjs/toolkit';
import { defaultValueSidebar } from '../interfaces/sidebar.interface';

export const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState: defaultValueSidebar,
	reducers: {
		handleHomeMenu: (state) => ({ ...state, homeMenu: true, catalogosMenu: false}),
		handleCatalogosMenu: (state) => ({ ...state, catalogosMenu: true, homeMenu: false}),
		handleLogin: (state) => ({ ...state, homeMenu: true, catalogosMenu: false}),
		handleLogOut: (state) => ({ ...state, homeMenu: true, catalogosMenu: false}),
	},
});

export const { handleHomeMenu, handleCatalogosMenu, handleLogin, handleLogOut } = sidebarSlice.actions;