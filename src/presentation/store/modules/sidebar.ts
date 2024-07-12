import { createSlice } from '@reduxjs/toolkit';
import { defaultValueSidebar } from '../interfaces/sidebar.interface';

export const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState: defaultValueSidebar,
	reducers: {
		handleHomeMenu: (state) => ({ ...state, homeMenu: true, catalogosMenu: false}),
		handleCatalogosMenu: (state) => ({ ...state, catalogosMenu: true, homeMenu: false}),
	},
});

export const { handleHomeMenu, handleCatalogosMenu } = sidebarSlice.actions;