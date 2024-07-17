import { BaseRespnse } from '../../generic-responses/generic-responses.models';


export interface IActividadIMSS {
    actividadIMSSId : number;
    actividadIMSS : string;
    fechaCaptura : string;
}

export interface IActividadIMSSResponse extends BaseRespnse{
    resultado: IActividadIMSS[];
}

export interface IAddActividadIMSSRequest {
    actividadIMSS : string;
}

export interface IAddActividadIMSSResponse extends BaseRespnse{
    resultado: string|null;
}
