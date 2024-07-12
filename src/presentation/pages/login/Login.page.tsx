import { LoginFormType } from '../../interfaces/pages/login.interface';
import { Formik } from 'formik';
import { LoginSchema } from '../../utils/Auth/schemas/login.schema';
import { Button, Input } from '@nextui-org/react';
import { AuthLayout } from '../../components/auth/AuthLayout.component';
import { useAuthStore } from '../../hooks/pages/auth/useAuthStore.hook';
import { useAlertStore } from '../../hooks/pages/alert/useAlertStore.hook';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const initialValues: LoginFormType = {
  email: '',
  password: '',
};


export const Login = () => {

  const {isLoading, startLogin } = useAuthStore();
  const { type, message, visible } = useAlertStore();

  const handleLogin = (values: LoginFormType) => {
    startLogin(values);
  };

  useEffect(() => {
    if (visible){
      Swal.fire({
        title:'Error en la autenticación', 
        text: message, 
        icon: type
      });
    }
  }, [visible]);


  return (
    <AuthLayout>
      <div className='text-center text-[25px] font-bold mb-6'>Acceso</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}>
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className='flex flex-col w-1/2 gap-4 mb-4'>
              <Input
                name='email'
                variant='bordered'
                label='Correo'
                type='email'
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange('email')}
                disabled={isLoading}
              />
              <Input
                variant='bordered'
                label='Contraseña'
                type='password'
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange('password')}
                disabled={isLoading}
              />
            </div>

            <Button
              isLoading={isLoading}
              onPress={() => handleSubmit()}
              variant='flat'
              color='primary'>
              Ingresar
            </Button>
          </>
        )}
      </Formik>
    </AuthLayout>
  );
};
