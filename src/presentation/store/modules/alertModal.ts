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
	alertModal: AlertState;
}

const alertSlice = createSlice({
	name: 'alertModal',
	initialState,
	reducers: {
		showAlertModal: (
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
		hideAlertModal: (state) => ({
			...state,
			visible: false,
		}),
	},
});

export const { showAlertModal, hideAlertModal } = alertSlice.actions;

export default alertSlice.reducer;