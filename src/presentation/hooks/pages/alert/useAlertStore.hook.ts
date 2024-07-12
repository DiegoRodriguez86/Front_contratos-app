import { useSelector } from 'react-redux';
import { AlertState } from '../../../store/modules/alert';


export const useAlertStore = () => {
    const {type, message, visible}: AlertState = useSelector((state: any) => state.alert);

    return {
        type,
        message,
        visible,
    };
};