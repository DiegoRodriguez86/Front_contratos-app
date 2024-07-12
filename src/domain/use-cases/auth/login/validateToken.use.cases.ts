import instance from '../../../../data/api/api-requests';
import { URL } from '../../../../data/libs/url.libs';
import { IValidateTokenResponse } from '../../../models/auth/validateToken/validateToken.models';



export const validateToken = () => {
    const { VALIDATE_TOKEN } = URL.AUTH;

    const validate = async (token: string): Promise<IValidateTokenResponse> => {
        const { data } = await instance.get<IValidateTokenResponse>(`${VALIDATE_TOKEN}?token=${token}`);
        return data;
    };

    return {
        validate,
    };
};