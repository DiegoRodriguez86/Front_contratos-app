import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/interfaces/sidebar.interface';
import { handleHomeMenu, handleCatalogosMenu } from '../../../store/modules/sidebar';

export const useMenuSideBar = () => {

    const dispatch = useDispatch();

    const menuSelected = useSelector((state: RootState) => state.sidebar);

    const setActiveMenu = (menu: string) => {
        if (menu === 'Home')
        {
            dispatch(handleHomeMenu());
        }
        else {
            dispatch(handleCatalogosMenu());
        }
    };

    return {
        menuSelected,
        setActiveMenu,
    };
};
