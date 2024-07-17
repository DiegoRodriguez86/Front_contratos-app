import { BaseRespnse } from '../../generic-responses/generic-responses.models';

export interface ICargo {
    cargoId: number;
    cargo: string;
    fechaCaptura: string;
}

export interface ICargoResponse extends BaseRespnse{
    resultado: ICargo[];
}

export interface IAddCargoRequest {
    cargo: string;
}

export interface IAddCargoResponse extends BaseRespnse {
    resultado: string|null;
}