import { BaseRespnse } from '../../generic-responses/generic-responses.models';


export interface IBanco {
    bancoId: number;
    nombreCorto: string;
    nombreBanco: string;
    fechaCaptura: string;
}

export interface IBancoResponse extends BaseRespnse{
    resultado: IBanco[];
}

export interface IAddBancoRequest {
    nombreCorto: string;
    nombreBanco: string;
}

export interface IAddBancoResponse extends BaseRespnse {
    resultado: string|null;
}