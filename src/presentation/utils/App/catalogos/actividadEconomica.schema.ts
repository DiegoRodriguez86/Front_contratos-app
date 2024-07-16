import { object, string } from 'yup';


export const ActividadEconomicaSchema = object().shape({
    actividadEconomica: string().required('La actividad economica es requerida'),
});