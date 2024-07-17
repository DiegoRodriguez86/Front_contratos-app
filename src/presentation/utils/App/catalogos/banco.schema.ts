import { object, string } from 'yup';


export const BancoSchema = object().shape({
    nombreCorto: string().required('El nombre corto es requerido'),
    nombreBanco: string().required('El nombre del banco es requerido'),
});