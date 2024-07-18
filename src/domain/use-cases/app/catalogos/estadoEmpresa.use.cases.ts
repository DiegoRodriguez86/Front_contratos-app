import instance from '../../../../data/api/api-requests';
import { URL } from '../../../../data/libs/url.libs';
import { EstadoEmpresaFormType } from '../../../../presentation/interfaces/pages/catalogos/estadoempresa/estadoEmpresa.interface';
import { IAddEstadoEmpresaRequest, IAddEstadoEmpresaResponse, IEstadoEmpresaResponse } from '../../../models/app/estadoempresa/estadoEmpresa.model';


export const estadoEmpresaCase = () => {
    const { GET, POST, DELETE } = URL.ESTADO_EMPRESA;

    const getEstadosEmpresa = async (): Promise<IEstadoEmpresaResponse> => {
        const { data } = await instance.get<IEstadoEmpresaResponse>(GET);
        return data;
    };

    const addEstadoEmpresa = async (request: EstadoEmpresaFormType): Promise<IAddEstadoEmpresaResponse> => {
        const newEstadoEmpresa : IAddEstadoEmpresaRequest ={
            estado: request.estado,
        };
        const { data } = await instance.post<IAddEstadoEmpresaResponse>(POST, newEstadoEmpresa);
        return data;
    };

    const deleteEstadoEmpresa = async (estadoEmpresaId: number): Promise<IAddEstadoEmpresaResponse> => {
        const { data } = await instance.delete<IAddEstadoEmpresaResponse>(`${DELETE}/${estadoEmpresaId}`, {data: {estadoEmpresaId}});
        return data;
    };

    return {
        getEstadosEmpresa,
        addEstadoEmpresa,
        deleteEstadoEmpresa
    };
};