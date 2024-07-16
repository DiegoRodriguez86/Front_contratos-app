import { useDispatch, useSelector } from 'react-redux';
import { ITableCatalog } from '../../../../store/interfaces/table.interface';
import { usuarioCase } from '../../../../../domain/use-cases/app/catalogos/usuario.use.cases';
import { startLoading, stopLoading } from '../../../../store/modules/loading';
import { IAddUsuarioResponse, IUsuarioResponse } from '../../../../../domain/models/app/usuarios/usuario.model';
import { setTable, resetTable, saveElemet } from '../../../../store/modules/table.module';
import { UsuarioFormType } from '../../../../interfaces/pages/catalogos/usuarios/usuario.iterface';
import { hideAlert, showAlert } from '../../../../store/modules/alert';



export const useUsuariosStore = () => {

    const { name, info, rehydrated }: ITableCatalog = useSelector((state: any) => state.table);
    const { isLoading } = useSelector((state: any) => state.loading);

    const dispatch = useDispatch();
    const { getUsuarios, addUsuario, deleteUsuario } = usuarioCase();

    const getUsuariosList = async () => {
        dispatch(startLoading());
        try {
            const response: IUsuarioResponse = await getUsuarios();
            dispatch(setTable({ name: 'usuarios', info: response.resultado }));
            dispatch(stopLoading());
        } catch (error: unknown) {
            dispatch(resetTable());
            dispatch(stopLoading());
        }
    };

    const addUsuarioList = async (request: UsuarioFormType) => {
        dispatch(startLoading());
        try {
            const response: IAddUsuarioResponse = await addUsuario(request);
            if (response.estatus === 'Ok') {
                dispatch(showAlert({ type: 'success', message: response.mensaje }));
            }
            else {
                dispatch(showAlert({ type: 'warning', message: response.mensaje }));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
        catch (error: unknown) {
            dispatch(showAlert({ type: 'error', message: 'Error al agregar usuario' }));
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
    };

    const deleteUsuarioList = async (userId: number) => {
        dispatch(startLoading());
        try {
            const response: IAddUsuarioResponse = await deleteUsuario(userId);
            if (response.estatus === 'Ok') {
                dispatch(showAlert({ type: 'success', message: response.mensaje }));
            }
            else {
                dispatch(showAlert({ type: 'warning', message: response.mensaje }));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
        catch (error: unknown) {
            dispatch(showAlert({ type: 'error', message: 'Error al eliminar usuario' }));
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
    };


    return {
        //* Properties
        name,
        info,
        isLoading,
        rehydrated,

        //* Functions
        getUsuariosList,
        addUsuarioList,
        deleteUsuarioList,
    };
};