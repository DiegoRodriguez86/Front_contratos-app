import instance from '../../../../data/api/api-requests';
import { IActividadEconomicaResponse, IAddActividadEconomicaRequest } from '../../../models/app/actividadeconomica/actividadEconomica.model';
import { URL } from '../../../../data/libs/url.libs';
import { ActividadEconomicaFormType } from '../../../../presentation/interfaces/pages/catalogos/actividadeconomica/actividadeconomica.interface';

export const actividadEconomicaCase = () => {
    const { GET, POST, DELETE } = URL.ACTIVIDAD_ECONOMICA;

    const getActividadesEconomicas = async (): Promise<IActividadEconomicaResponse> => {
        const { data } = await instance.get<IActividadEconomicaResponse>(GET);
        return data;
    };

    const addActividadEconomica = async (actividadEconomicaR: ActividadEconomicaFormType): Promise<IActividadEconomicaResponse> => {
        const request: IAddActividadEconomicaRequest = { actividadEconomia: actividadEconomicaR.actividadEconomica };
        const { data } = await instance.post<IActividadEconomicaResponse>(POST, request);
        return data;
    };

    const deleteActividadEconomica = async (actividadEconomicaId: number): Promise<IActividadEconomicaResponse> => {
        const { data } = await instance.delete<IActividadEconomicaResponse>(`${DELETE}/${actividadEconomicaId}`, {data: {actividadEconomicaId}});
        return data;
    };

    return {
        getActividadesEconomicas,
        addActividadEconomica,
        deleteActividadEconomica,
    };
};