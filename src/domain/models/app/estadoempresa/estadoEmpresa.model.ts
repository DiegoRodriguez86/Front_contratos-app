import { BaseRespnse } from '../../generic-responses/generic-responses.models';

export interface IEstadoEmpresa {
    estadoId: number;
    estado: string;
    fechaCaptura: string;
}

export interface IEstadoEmpresaResponse extends BaseRespnse{
    resultado: IEstadoEmpresa[];
}

export interface IAddEstadoEmpresaRequest {
    estado: string;
}

export interface IAddEstadoEmpresaResponse extends BaseRespnse {
    resultado: string|null;
}