import { object, string } from 'yup';


export const LoginSchema = object().shape({
    email: string()
      .email('El correo no es válido')
      .required('El correo es requerido'),
    password: string().required('La contraseña es requerida'),
  });