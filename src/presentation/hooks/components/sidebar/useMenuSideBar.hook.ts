import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/interfaces/sidebar.interface';
import { handleHomeMenu, handleCatalogosMenu } from '../../../store/modules/sidebar';
import { resetTable, saveElemet } from '../../../store/modules/table.module';

export const useMenuSideBar = () => {

    const dispatch = useDispatch();

    const menuSelected = useSelector((state: RootState) => state.sidebar);

    const setActiveMenu = (menu: string) => {
        if (menu === 'Home') {
            dispatch(handleHomeMenu());
        }
        else {
            dispatch(handleCatalogosMenu());
        }
        dispatch(resetTable());
        dispatch(saveElemet());
    };

    return {
        menuSelected,
        setActiveMenu,
    };
};
