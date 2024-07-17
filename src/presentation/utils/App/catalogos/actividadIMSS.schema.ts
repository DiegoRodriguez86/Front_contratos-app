import { object, string } from 'yup';


export const ActividadImssSchema = object().shape({
    actividadIMSS: string().required('La actividad es requerida'),
});