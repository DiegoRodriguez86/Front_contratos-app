import { BaseRespnse } from '../../generic-responses/generic-responses.models';

export interface IAddUsuarioRequest {
    email: string;
    nombre: string;
    password: string;
}

export interface IAddUsuarioResponse extends BaseRespnse {
    resultado: string|null;
}

export interface IUsuario {
    userId: number;
    usuario: string;
    correo: string;
    fechaCaptura: string;
}

export interface IUsuarioResponse extends BaseRespnse{
    resultado: IUsuario[];
}