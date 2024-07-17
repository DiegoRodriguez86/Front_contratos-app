import instance from '../../../../data/api/api-requests';
import { URL } from '../../../../data/libs/url.libs';
import { CargoSociedadFormType } from '../../../../presentation/interfaces/pages/catalogos/cardosociedad/cargoSociedad.interface';
import { IAddCargoSociedadRequest, IAddCargoSociedadResponse, ICargoSociedadResponse } from '../../../models/app/cargosociedad/cargoSociedad.model';


export const cargoSociedadCase = () => {
    const { GET, POST, DELETE } = URL.CARGO_SOCIEDAD;

    const getCargosSociedad = async (): Promise<ICargoSociedadResponse> => {
        const { data } = await instance.get<ICargoSociedadResponse>(GET);
        return data;
    };

    const addCargoSociedad = async (request: CargoSociedadFormType): Promise<IAddCargoSociedadResponse> => {
        const newCargo: IAddCargoSociedadRequest = {
            cargoSociedad: request.cargoSociedad,
        };
        const { data } = await instance.post<IAddCargoSociedadResponse>(POST, newCargo);
        return data;
    };

    const deleteCargoSociedad = async (cargoSociedadId: number): Promise<IAddCargoSociedadResponse> => {
        const { data } = await instance.delete<IAddCargoSociedadResponse>(`${DELETE}/${cargoSociedadId}`, {data: {cargoSociedadId}});
        return data;
    };

    return {
        getCargosSociedad,
        addCargoSociedad,
        deleteCargoSociedad,
    };
};