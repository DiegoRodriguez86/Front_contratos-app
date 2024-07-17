import { object, string } from 'yup';


export const CargoShema = object().shape({
    cargo: string().required('El cargo es requerido'),
});