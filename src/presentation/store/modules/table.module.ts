import { createSlice } from '@reduxjs/toolkit';
import { defaultValueTableCatalog } from '../interfaces/table.interface';


export const tableSlice = createSlice({
    name: 'table',
    initialState: defaultValueTableCatalog,
    reducers:{
        setTable: (state, action) => {
            state.name = action.payload.name;
            state.info = action.payload.info;
            state.rehydrated = false;
        },
        resetTable: (state) => {
            state.name = '';
            state.info = [];
            state.rehydrated = false;
        },
        saveElemet:(state) => {
            state.rehydrated = !state.rehydrated;
        }
    },
});

export const { setTable, resetTable, saveElemet } = tableSlice.actions;