import { object, string } from 'yup';

export const CargoSociedadSchema = object().shape({
    cargoSociedad: string().required('El cargo es requerido')
});