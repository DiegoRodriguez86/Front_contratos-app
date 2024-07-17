import instance from '../../../../data/api/api-requests';
import { URL } from '../../../../data/libs/url.libs';
import { CargoFormType } from '../../../../presentation/interfaces/pages/catalogos/cargo/cargo.interface';
import { IAddCargoRequest, IAddCargoResponse, ICargoResponse } from '../../../models/app/cargo/cargo.model';


export const cargoCase = () => {
    const { GET, POST, DELETE } = URL.CARGO;

    const getCargos = async ():Promise<ICargoResponse> => {
        const { data } = await instance.get<ICargoResponse>(GET);
        return data;
    };

    const addCargo = async (request: CargoFormType): Promise<IAddCargoResponse> => {
        const cargo: IAddCargoRequest = {
            cargo: request.cargo,
        };
        const { data } = await instance.post<IAddCargoResponse>(POST, cargo);
        return data;
    };

    const deleteCargo = async (cargoId: number): Promise<IAddCargoResponse> => {
        const { data } = await instance.delete<IAddCargoResponse>(`${DELETE}/${cargoId}`, {data: {cargoId}});
        return data;
    };

    return {
        getCargos,
        addCargo,
        deleteCargo
    };
};