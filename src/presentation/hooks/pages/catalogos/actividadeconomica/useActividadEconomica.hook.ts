import { useDispatch, useSelector } from 'react-redux';
import { actividadEconomicaCase } from '../../../../../domain/use-cases/app/catalogos/actividadEconomica.cases';
import { startLoading, stopLoading } from '../../../../store/modules/loading';
import { IActividadEconomicaResponse } from '../../../../../domain/models/app/actividadeconomica/actividadEconomica.model';
import { resetTable, saveElemet, setTable } from '../../../../store/modules/table.module';
import { ActividadEconomicaFormType } from '../../../../interfaces/pages/catalogos/actividadeconomica/actividadeconomica.interface';
import { hideAlert, showAlert } from '../../../../store/modules/alert';


export const useActividadEconomicaStore = () => {

    const {name, info, rehydrated} = useSelector((state: any) => state.table);
    const {isLoading} = useSelector((state: any) => state.loading);

    const dispatch = useDispatch();
    const {getActividadesEconomicas, addActividadEconomica, deleteActividadEconomica} = actividadEconomicaCase();

    const getActividadEconomicaList = async () => {
        dispatch(startLoading());
        try {
            const response: IActividadEconomicaResponse = await getActividadesEconomicas();
            dispatch(setTable({name: 'Actividad Economica', info: response.resultado}));
            dispatch(stopLoading());
        } catch (error: unknown) {
            dispatch(resetTable());
            dispatch(stopLoading());
        }
    };

    const addActividadEconomicaList = async (request: ActividadEconomicaFormType) => {
        dispatch(startLoading());
        try {
            const response: IActividadEconomicaResponse = await addActividadEconomica(request);
            if (response.estatus === 'Ok') {
                dispatch(showAlert({type: 'success', message: response.mensaje}));
            } else {
                dispatch(showAlert({type: 'warning', message: response.mensaje}));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {
                dispatch(hideAlert());
            }, 1000);
        } catch (error: unknown) {
            dispatch(showAlert({type: 'error', message: 'Error al agregar actividad economica'}));
            dispatch(stopLoading());
            setTimeout(() => {
                dispatch(hideAlert());
            }, 1000);
        }
    };

    const deleteActividadEconomicaList = async (actividadEconomicaId: number) => {
        dispatch(startLoading());
        try {
            const response: IActividadEconomicaResponse = await deleteActividadEconomica(actividadEconomicaId);
            if (response.estatus === 'Ok') {
                dispatch(showAlert({type: 'success', message: response.mensaje}));
            } else {
                dispatch(showAlert({type: 'warning', message: response.mensaje}));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {
                dispatch(hideAlert());
            }, 1000);
        } catch (error: unknown) {
            dispatch(showAlert({type: 'error', message: 'Error al eliminar actividad economica'}));
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
        isLoading,
        rehydrated,

        //* Functions
        getActividadEconomicaList,
        addActividadEconomicaList,
        deleteActividadEconomicaList
    };
};
