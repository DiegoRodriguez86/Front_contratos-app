import { object, string } from 'yup';

export const EstadoEmpresaSchema = object().shape({
    estado: string().required('El estado es requerido'),
});