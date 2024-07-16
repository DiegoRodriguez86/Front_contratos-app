import { IUsuario } from '../../../domain/models/app/usuarios/usuario.model';

export interface ITableCatalog {
    name: string;
    info: IUsuario[] | [];
    rehydrated: boolean;
}

export const defaultValueTableCatalog: ITableCatalog = {
    name: '',
    info: [],
    rehydrated: false,
};