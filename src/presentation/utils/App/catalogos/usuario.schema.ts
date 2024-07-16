import {object, string} from 'yup';

export const UsuarioSchema = object().shape({
    correo: string()
        .email('El correo no es válido')
        .required('El correo es requerido'),
    usuario: string().required('El nombre es requerido'),
    password: string()
        .required('La contraseña es requerida')
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/,
        //     'La contraseña debe contener al menos 8 caracteres, una letra, un número y un caracter especial'
        // ),
});