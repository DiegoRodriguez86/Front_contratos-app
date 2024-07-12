import instance from '../../../../data/api/api-login-request';
import { URL } from '../../../../data/libs/url.libs';
import { LoginFormType } from '../../../../presentation/interfaces/pages/login.interface';
import { ILoginResponse } from '../../../models/auth/login/login.models';



export const loginCase = () => {
    const { LOGIN } = URL.AUTH;

    const authenticate = async (login: LoginFormType): Promise<ILoginResponse> => {
        const { data } = await instance.post<ILoginResponse>(LOGIN, login);
        return data;
    };

    return {
        authenticate,
    };
};