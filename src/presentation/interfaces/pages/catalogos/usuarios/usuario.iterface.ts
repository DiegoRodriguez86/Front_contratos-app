export type UsuarioFormType = {
    usuario: string;
    correo: string;
    password: string;

}

export type UsuarioDeleteType = {
    userId: number;
}

export type UsuarioType = {
    userId: number;
    usuario: string;
    correo: string;
    fechaCaptura: string;
}

export type columnsUsuarios = {
    name: string;
    uid: string;
    sortable: boolean;
}

export const columns: columnsUsuarios[] = [
    {
        name: 'Id',
        uid: 'userId',
        sortable: true,
    },
    {
        name: 'Usuario',
        uid: 'usuario',
        sortable: true,
    },
    {
        name: 'Correo',
        uid: 'correo',
        sortable: true,
    },
    {
        name: 'Fecha de captura',
        uid: 'fechaCaptura',
        sortable: true,
    },
    {
        name: 'Acciones',
        uid: 'actions',
        sortable: false,
    },
]; 