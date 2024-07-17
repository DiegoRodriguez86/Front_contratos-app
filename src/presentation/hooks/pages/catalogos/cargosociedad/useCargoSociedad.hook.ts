import { useDispatch, useSelector } from 'react-redux';
import { cargoSociedadCase } from '../../../../../domain/use-cases/app/catalogos/cargoSociedad.cases';
import { startLoading, stopLoading } from '../../../../store/modules/loading';
import { ICargoSociedadResponse } from '../../../../../domain/models/app/cargosociedad/cargoSociedad.model';
import { resetTable, saveElemet, setTable } from '../../../../store/modules/table.module';
import { CargoSociedadFormType } from '../../../../interfaces/pages/catalogos/cardosociedad/cargoSociedad.interface';
import { IAddCargoResponse } from '../../../../../domain/models/app/cargo/cargo.model';
import { hideAlert, showAlert } from '../../../../store/modules/alert';


export const useCargoSociedadStore = () => {
    const { name, info, rehydrated } = useSelector((state: any) => state.table);
    const { isLoading } = useSelector((state: any) => state.loading);

    const dispatch = useDispatch();
    const { getCargosSociedad, addCargoSociedad, deleteCargoSociedad } = cargoSociedadCase();

    const getCargosSociedadList = async () => {
        dispatch(startLoading());
        try {
            const response: ICargoSociedadResponse = await getCargosSociedad();
            dispatch(setTable({ name: 'Cargos Sociedad', info: response.resultado }));
            dispatch(stopLoading());
        } catch (error: unknown){
            dispatch(resetTable());
            dispatch(stopLoading());
        }
    };

    const addCargoSociedadList = async (request: CargoSociedadFormType) => {
        dispatch(startLoading());
        try {
            const response: IAddCargoResponse = await addCargoSociedad(request);
            if (response.estatus === 'Ok'){
                dispatch(showAlert({ type: 'success', message: response.mensaje }));
            }
            else {
                dispatch(showAlert({ type: 'warning', message: response.mensaje }));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        } catch (error: unknown){
            dispatch(showAlert({ type: 'error', message: 'Error al agregar cargo' }));
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        }
    };

    const deleteCargoSociedadList = async (cargoSociedadId: number) => {
        dispatch(startLoading());
        try {
            const response: IAddCargoResponse = await deleteCargoSociedad(cargoSociedadId);
            if (response.estatus === 'Ok'){
                dispatch(showAlert({ type: 'success', message: response.mensaje }));
            }
            else {
                dispatch(showAlert({ type: 'warning', message: response.mensaje }));
            }
            dispatch(saveElemet());
            dispatch(stopLoading());
            setTimeout(() => {dispatch(hideAlert());}, 1000);
        } catch (error: unknown){
            dispatch(showAlert({ type: 'error', message: 'Error al eliminar cargo' }));
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
        getCargosSociedadList,
        addCargoSociedadList,
        deleteCargoSociedadList
    };
};