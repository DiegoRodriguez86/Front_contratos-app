import { useDispatch, useSelector } from 'react-redux';
import { cargoCase } from '../../../../../domain/use-cases/app/catalogos/cargo.use.cases';
import { startLoading, stopLoading } from '../../../../store/modules/loading';
import { IAddCargoResponse, ICargoResponse } from '../../../../../domain/models/app/cargo/cargo.model';
import { resetTable, saveElemet, setTable } from '../../../../store/modules/table.module';
import { CargoFormType } from '../../../../interfaces/pages/catalogos/cargo/cargo.interface';
import { hideAlert, showAlert } from '../../../../store/modules/alert';



export const useCargoStore = () => {
    const { name, info, rehydrated } = useSelector((state: any) => state.table);
    const { isLoading } = useSelector((state: any) => state.loading);

    const dispatch = useDispatch();
    const { getCargos, addCargo, deleteCargo } = cargoCase();

    const getCargosList = async () => {
        dispatch(startLoading());
        try {
            const response: ICargoResponse = await getCargos();
            dispatch(setTable({ name: 'cargos', info: response.resultado }));
            dispatch(stopLoading());
        } catch (error: unknown) {
            dispatch(resetTable());
            dispatch(stopLoading());
        }
    };

    const addCargoList = async (request: CargoFormType) => {
        dispatch(startLoading());
        try {
            const response: IAddCargoResponse = await addCargo(request);
            if (response.estatus === 'Ok'){
                dispatch(showAlert({type: 'success', message: response.mensaje}));
            }
            else {
                dispatch(showAlert({type: 'warning', message: response.mensaje}));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
        catch (error: unknown){
            dispatch(showAlert({type: 'error', message: 'Error al agregar cargo'}));
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
    };

    const deleteCargoList = async (cargoId: number) => {
        dispatch(startLoading());
        try {
            const response: IAddCargoResponse = await deleteCargo(cargoId);
            if (response.estatus === 'Ok'){
                dispatch(showAlert({type: 'success', message: response.mensaje}));
            }
            else {
                dispatch(showAlert({type: 'warning', message: response.mensaje}));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
        catch (error: unknown){
            dispatch(showAlert({type: 'error', message: 'Error al eliminar cargo'}));
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
        getCargosList,
        addCargoList,
        deleteCargoList
    };
};