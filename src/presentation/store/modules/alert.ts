import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlertState {
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
	visible: boolean;
}

const initialState: AlertState = {
	type: 'success',
	message: '',
	visible: false,
};

export interface RootState {
	alert: AlertState;
}

export const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert: (
			state,
			action: PayloadAction<{
				type: 'success' | 'error' | 'warning' | 'info';
				message: string;
			}>
		) => ({
			...state,
			type: action.payload.type,
			message: action.payload.message,
			visible: true,
		}),
		hideAlert: (state) => ({
			...state,
			type: 'success',
			message: '',
			visible: false,
		}),
	},
});

export const { showAlert, hideAlert } = alertSlice.actions;
