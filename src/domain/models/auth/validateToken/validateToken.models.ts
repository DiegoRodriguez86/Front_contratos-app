import { BaseRespnse } from '../../generic-responses/generic-responses.models';


export interface IValidateTokenResponse extends BaseRespnse{
    resultado: boolean;
}