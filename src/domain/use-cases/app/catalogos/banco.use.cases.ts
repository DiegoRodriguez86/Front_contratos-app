import instance from '../../../../data/api/api-requests';
import { URL } from '../../../../data/libs/url.libs';
import { BancoFormType } from '../../../../presentation/interfaces/pages/catalogos/banco/banco.interface';
import { IAddBancoRequest, IAddBancoResponse, IBancoResponse } from '../../../models/app/banco/banco.model';


export const bancoCase = () => {
    const { GET, POST, DELETE } = URL.BANCO;

    const getBancos = async (): Promise<IBancoResponse> => {
        const { data } = await instance.get<IBancoResponse>(GET);
        return data;
    };

    const addBanco = async (request: BancoFormType): Promise<IAddBancoResponse> => {
        const newBanco: IAddBancoRequest = {
            nombreCorto: request.nombreCorto,
            nombreBanco: request.nombreBanco,
        };
        const { data } = await instance.post<IAddBancoResponse>(POST, newBanco);
        return data;
    };

    const deleteBanco = async (bancoId: number): Promise<IAddBancoResponse> => {
        const { data } = await instance.delete<IAddBancoResponse>(`${DELETE}/${bancoId}`, {data: {bancoId}});
        return data;
    };

    return {
        getBancos,
        addBanco,
        deleteBanco
    };
};