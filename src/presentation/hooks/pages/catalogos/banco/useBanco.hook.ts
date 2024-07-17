import { useDispatch, useSelector } from 'react-redux';
import { bancoCase } from '../../../../../domain/use-cases/app/catalogos/banco.use.cases';
import { startLoading, stopLoading } from '../../../../store/modules/loading';
import { resetTable, saveElemet, setTable } from '../../../../store/modules/table.module';
import { IAddBancoResponse } from '../../../../../domain/models/app/banco/banco.model';
import { BancoFormType } from '../../../../interfaces/pages/catalogos/banco/banco.interface';
import { hideAlert, showAlert } from '../../../../store/modules/alert';


export const useBancoStore = () => {

    const { name, info, rehydrated } = useSelector((state: any) => state.table);
    const { isLoading } = useSelector((state: any) => state.loading);

    const dispatch = useDispatch();

    const { getBancos, addBanco, deleteBanco } = bancoCase();

    const getBancoList = async () => {
        dispatch(startLoading());
        try {
            const response = await getBancos();
            dispatch(setTable({ name: 'Banco', info: response.resultado }));
            dispatch(stopLoading());
        } catch (error: unknown) {
            dispatch(resetTable());
            dispatch(stopLoading());
        }
    };

    const addBancoList = async (request: BancoFormType) => {
        dispatch(startLoading());
        try {
            const response: IAddBancoResponse = await addBanco(request);
            if (response.estatus === 'Ok') {
                dispatch(showAlert({ type: 'success', message: response.mensaje }));
            }
            else {
                dispatch(showAlert({ type: 'warning', message: response.mensaje }));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {
                dispatch(hideAlert());
            }, 1000);
        } catch (error: unknown) {
            dispatch(showAlert({ type: 'error', message: 'Error al agregar banco' }));
            dispatch(stopLoading());
            setTimeout(() => {
                dispatch(hideAlert());
            }, 1000);
        }
    };

    const deleteBancoList = async (bancoId: number) => {
        dispatch(startLoading());
        try {
            const response: IAddBancoResponse = await deleteBanco(bancoId);
            if (response.estatus === 'Ok') {
                dispatch(showAlert({ type: 'success', message: response.mensaje }));
            } else {
                dispatch(showAlert({ type: 'warning', message: response.mensaje }));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {
                dispatch(hideAlert());
            }, 1000);
        } catch (error: unknown) {
            dispatch(showAlert({ type: 'error', message: 'Error al eliminar banco' }));
            dispatch(stopLoading());
            setTimeout(() => {
                dispatch(hideAlert());
            }, 1000);
        }
    };

    return {
        //* Properties
        name,
        info,
        rehydrated,
        isLoading,

        //* Methods
        getBancoList,
        addBancoList,
        deleteBancoList
    };
};
