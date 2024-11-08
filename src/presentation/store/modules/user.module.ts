import { createSlice } from '@reduxjs/toolkit';
import { defaultValueUser } from '../interfaces/user.interface';

export const userSlice = createSlice({
	name: 'user',
	initialState: defaultValueUser,
	reducers: {
		setUser: (state, action) => {
			state.email = action.payload.email;
			state.name = action.payload.nombre;
			state.token = action.payload.token;
			state.isLogged = true;
			localStorage.setItem('token', action.payload.token);
		},
		resetUser: (state) => {
			state.email = '';
			state.name = '';
			state.token = '';
			state.isLogged = false;
			localStorage.removeItem('token');
		}
	},
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;