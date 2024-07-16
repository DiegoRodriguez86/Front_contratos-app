import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FaUserPlus } from 'react-icons/fa';

interface LayoutState {
	buttonLabel: string;
	buttonIcon: JSX.Element;
}

const initialState: LayoutState = {
	buttonLabel: 'Agregar nuevo Nivel',
	buttonIcon: <FaUserPlus />,
};

const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		setButtonLabel: (state, action: PayloadAction<string>) => ({
			...state,
			buttonLabel: action.payload,
		}),
		setButtonIcon: (state, action: PayloadAction<JSX.Element>) => ({
			...state,
			buttonIcon: action.payload,
		}),
	},
});

export const { setButtonLabel, setButtonIcon } = layoutSlice.actions;

export default layoutSlice.reducer;