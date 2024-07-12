import { useDispatch } from 'react-redux';
import { resetUser } from '../../../store/modules/user.module';
import { handleLogOut } from '../../../store/modules/sidebar';



export const useAuthNavBar = () => {

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(handleLogOut());
        dispatch(resetUser());
    };

    return {
        logout
    };
};