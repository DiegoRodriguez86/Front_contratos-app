import { BaseRespnse } from '../../generic-responses/generic-responses.models';

export interface IAddActividadEconomicaRequest {
    actividadEconomia: string;
}

export interface IAddActividadEconomicaResponse extends BaseRespnse {
    resultado: string|null;
}

export interface IActividadEconomica {
    actividadEconomicaId: number;
    actividadEconomica: string;
    fechaCaptura: string;
}

export interface IActividadEconomicaResponse extends BaseRespnse{
    resultado: IActividadEconomica[];
}