import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../../store/interfaces/user.interface';
import { LoginFormType } from '../../../interfaces/pages/login.interface';
import { loginCase } from '../../../../domain/use-cases/auth/login/login.use.cases';
import { ILoginResponse } from '../../../../domain/models/auth/login/login.models';
import { startLoading, stopLoading } from '../../../store/modules/loading';
import { resetUser, setUser } from '../../../store/modules/user.module';
import { showAlert, hideAlert } from '../../../store/modules/alert';
import { AxiosError } from 'axios';
import { validateToken } from '../../../../domain/use-cases/auth/login/validateToken.use.cases';

export const useAuthStore = () => {

    const { email, name, token, isLogged }: IUser = useSelector((state: any) => state.user);
    const { isLoading } = useSelector((state: any) => state.loading);

    const dispatch = useDispatch();
    const { authenticate } = loginCase();
    const { validate } = validateToken();

    const startLogin = async (object: LoginFormType) => {
        dispatch(startLoading());
        try {
            const response: ILoginResponse = await authenticate(object);
            localStorage.setItem('nombrUsuario', response.resultado.nombre);
            localStorage.setItem('email', response.resultado.email);
            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('token', response.resultado.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(setUser(response.resultado));
            dispatch(stopLoading());

        } catch (error: unknown) {
            localStorage.clear();
            dispatch(stopLoading());
            dispatch(resetUser());
            if (error instanceof AxiosError && error.response) {
                dispatch(showAlert({ type: 'error', message: error.response.data.mensaje }));
                setTimeout(() => {
                    dispatch(hideAlert());
                }, 1000);
            }
        }
    };

    const checkAuthToken = async () => {
        const token: string | null = localStorage.getItem('token');
        if (!token) {
            localStorage.clear();
            dispatch(resetUser());
        }
        else {
            try {
                const { resultado } = await validate(token);
                if (!resultado) {
                    localStorage.clear();
                    dispatch(resetUser());
                }
            }
            catch (error: unknown) {
                localStorage.clear();
                dispatch(resetUser());
            }
        }
    };

    return {
        //* Properties
        email,
        name,
        token,
        isLogged,
        isLoading,

        //* Methods
        startLogin,
        checkAuthToken,
    };
};
