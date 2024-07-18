import { useDispatch, useSelector } from 'react-redux';
import { estadoEmpresaCase } from '../../../../../domain/use-cases/app/catalogos/estadoEmpresa.use.cases';
import { startLoading, stopLoading } from '../../../../store/modules/loading';
import { resetTable, saveElemet, setTable } from '../../../../store/modules/table.module';
import { IAddEstadoEmpresaResponse, IEstadoEmpresaResponse } from '../../../../../domain/models/app/estadoempresa/estadoEmpresa.model';
import { EstadoEmpresaFormType } from '../../../../interfaces/pages/catalogos/estadoempresa/estadoEmpresa.interface';
import { hideAlert, showAlert } from '../../../../store/modules/alert';


export const useEstadoEmpresaState = () => {
    const { name, info, rehydrated } = useSelector((state: any) => state.table);
    const { isLoading } = useSelector((state: any) => state.loading);

    const dispatch = useDispatch();
    const { getEstadosEmpresa, addEstadoEmpresa, deleteEstadoEmpresa } = estadoEmpresaCase();

    const getEstadosEmpresaList = async () => {
        dispatch(startLoading());
        try {
            const response: IEstadoEmpresaResponse = await getEstadosEmpresa();
            dispatch(setTable({ name: 'Estados Empresa', info: response.resultado }));
            dispatch(stopLoading());
        } catch (error: unknown) {
            dispatch(resetTable());
            dispatch(stopLoading());
        }
    };

    const addEstadoEmpresaList = async (request: EstadoEmpresaFormType) => {
        dispatch(startLoading());
        try {
            const response: IAddEstadoEmpresaResponse = await addEstadoEmpresa(request);
            if (response.estatus === 'Ok'){
                dispatch(showAlert({ type: 'success', message: response.mensaje }));
            }
            else {
                dispatch(showAlert({ type: 'warning', message: response.mensaje }));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
        catch (error: unknown){
            dispatch(showAlert({ type: 'error', message: 'Error al agregar estado empresa' }));
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
    };

    const deleteEstadoEmpresaList = async (estadoEmpresaId: number) => {
        dispatch(startLoading());
        try {
            const response: IAddEstadoEmpresaResponse = await deleteEstadoEmpresa(estadoEmpresaId);
            if (response.estatus === 'Ok'){
                dispatch(showAlert({ type: 'success', message: response.mensaje }));
            }
            else {
                dispatch(showAlert({ type: 'warning', message: response.mensaje }));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
        catch (error: unknown){
            dispatch(showAlert({ type: 'error', message: 'Error al eliminar estado empresa' }));
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
    };

    return {
        //* Properties
        name,
        info,
        rehydrated,
        isLoading,

        //* Functions
        getEstadosEmpresaList,
        addEstadoEmpresaList,
        deleteEstadoEmpresaList
    };
};