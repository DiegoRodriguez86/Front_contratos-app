import { BaseRespnse } from '../../generic-responses/generic-responses.models';

export interface ICargoSociedad {
    cargoSociedadId: number;
    cargoSociedad: string;
    fechaCaptura: string;
}

export interface ICargoSociedadResponse extends BaseRespnse{
    resultado: ICargoSociedad[];
}

export interface IAddCargoSociedadRequest {
    cargoSociedad: string;
}

export interface IAddCargoSociedadResponse extends BaseRespnse {
    resultado: string|null;
}