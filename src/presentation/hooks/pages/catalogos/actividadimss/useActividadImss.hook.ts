import { useDispatch, useSelector } from 'react-redux';
import { actividadIMSSCase } from '../../../../../domain/use-cases/app/catalogos/actividadIMSS.cases';
import { startLoading, stopLoading } from '../../../../store/modules/loading';
import { resetTable, saveElemet, setTable } from '../../../../store/modules/table.module';
import { IAddActividadIMSSResponse } from '../../../../../domain/models/app/actividadimss/actividadImss.model';
import { hideAlert, showAlert } from '../../../../store/modules/alert';


export const useActividadImssStore = () => {
    
    const {name, info, rehydrated} = useSelector((state: any) => state.table);
    const {isLoading} = useSelector((state: any) => state.loading);

    const dispatch = useDispatch();

    const {getActividadesIMSS, addActividadIMSS, deleteActividadIMSS} = actividadIMSSCase();

    const getActividadImssList = async () => {
        dispatch(startLoading());
        try {
            const response = await getActividadesIMSS();
            dispatch(setTable({name: 'Actividad IMSS', info: response.resultado}));
            dispatch(stopLoading());
        } catch (error: unknown) {
            dispatch(resetTable());
            dispatch(stopLoading());
        }
    };

    const addActividadImssList = async (request: any) => {
        dispatch(startLoading());
        try {
            const response: IAddActividadIMSSResponse = await addActividadIMSS(request);
            if (response.estatus === 'Ok') {
                dispatch(showAlert({type: 'success', message: response.mensaje}));
            }
            else {
                dispatch(showAlert({type: 'warning', message: response.mensaje}));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {
                dispatch(hideAlert());
            }, 1000);
        } catch (error: unknown) {
            dispatch(showAlert({type: 'error', message: 'Error al agregar actividad IMSS'}));
            dispatch(stopLoading());
            setTimeout(() => {
                dispatch(hideAlert());
            }, 1000);
        }
    };

    const deleteActividadImssList = async (actividadImssId: number) => {
        dispatch(startLoading());
        try {
            const response: IAddActividadIMSSResponse = await deleteActividadIMSS(actividadImssId);
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
            dispatch(showAlert({type: 'error', message: 'Error al eliminar actividad IMSS'}));
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
        getActividadImssList,
        addActividadImssList,
        deleteActividadImssList
    };
};