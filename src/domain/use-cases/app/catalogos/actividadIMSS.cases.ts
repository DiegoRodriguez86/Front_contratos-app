import instance from '../../../../data/api/api-requests';
import { URL } from '../../../../data/libs/url.libs';
import { ActividadIMSSFormType } from '../../../../presentation/interfaces/pages/catalogos/actividadimss/actividadimss.interface';
import { IActividadIMSSResponse, IAddActividadIMSSRequest, IAddActividadIMSSResponse } from '../../../models/app/actividadimss/actividadImss.model';


export const actividadIMSSCase = () => {
    const { GET, POST, DELETE } = URL.ACTIVIDAD_IMSS;

    const getActividadesIMSS = async(): Promise<IActividadIMSSResponse> => {
        const { data } = await instance.get<IActividadIMSSResponse>(GET);
        return data;
    };

    const addActividadIMSS = async(actividadIMSSR: ActividadIMSSFormType): Promise<IAddActividadIMSSResponse> => {
        const request: IAddActividadIMSSRequest = { actividadIMSS: actividadIMSSR.actividadIMSS };
        const { data } = await instance.post<IAddActividadIMSSResponse>(POST, request);
        return data;
    };

    const deleteActividadIMSS = async(actividadIMSSId: number): Promise<IAddActividadIMSSResponse> => {
        const { data } = await instance.delete<IAddActividadIMSSResponse>(`${DELETE}/${actividadIMSSId}`, {data: {actividadIMSSId}});
        return data;
    };

    return {
        getActividadesIMSS,
        addActividadIMSS,
        deleteActividadIMSS,
    };
};