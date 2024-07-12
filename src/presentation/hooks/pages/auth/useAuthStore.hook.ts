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
import { handleLogin, handleLogOut } from '../../../store/modules/sidebar';

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
            dispatch(setUser(response.resultado));
            dispatch(handleLogin());
            dispatch(stopLoading());

        } catch (error: unknown) {
            dispatch(stopLoading());
            dispatch(resetUser());
            dispatch(handleLogOut());
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
            dispatch(resetUser());
            dispatch(handleLogOut());
        }
        else {
            try {
                const { resultado } = await validate(token);
                if (!resultado) {
                    dispatch(resetUser());
                    dispatch(handleLogOut());
                }
            }
            catch (error: unknown) {
                dispatch(resetUser());
                dispatch(handleLogOut());
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
