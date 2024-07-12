import { createSlice } from '@reduxjs/toolkit';
import { defaultAlertValue } from '../interfaces/snackbar.interface';

export const snackbarSlice = createSlice({
	name: 'utils',
	initialState: defaultAlertValue,
	reducers: {
		setAlert: (state, action) => ({ ...state, ...action.payload }),
	},
});

export const { setAlert } = snackbarSlice.actions;

export default snackbarSlice.reducer;