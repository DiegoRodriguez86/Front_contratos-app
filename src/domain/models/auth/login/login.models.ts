import { BaseRespnse } from '../../generic-responses/generic-responses.models';

export interface ILogin{
    email: string;
    nombre: string;
    token: string;
}

export interface ILoginResponse extends BaseRespnse{
    resultado: ILogin;
}