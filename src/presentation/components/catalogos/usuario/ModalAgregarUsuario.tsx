import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { Formik } from 'formik';
import { UsuarioFormType } from '../../../interfaces/pages/catalogos/usuarios/usuario.iterface';
import { useUsuariosStore } from '../../../hooks/pages/catalogos/usuarios/useUsuariosStore.hook';
import { UsuarioSchema } from '../../../utils/App/catalogos/usuario.schema';

interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
}

const initialValues: UsuarioFormType = {
    usuario: '',
    correo: '',
    password: '',

};


export const ModalAgregarUsuario = ({ isOpen, onOpenChange, onClose }: Props) => {

    const { isLoading, addUsuarioList } = useUsuariosStore();

    const handleSave = (values: UsuarioFormType) => {
        addUsuarioList(values);
        isOpen = false;
    };

    return (
        <Modal className='dark'  isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-white">Agregar Usuario</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={UsuarioSchema}
                        onSubmit={handleSave}>
                        {({ values, errors, touched, handleChange, handleSubmit }) => (
                            <>
                                <div className="flex flex-col gap-4 mb-4 text-white">
                                    <Input
                                        name='correo'
                                        variant='bordered'
                                        label='Correo'
                                        type='email'
                                        value={values.correo}
                                        isInvalid={!!errors.correo && !!touched.correo}
                                        errorMessage={errors.correo}
                                        onChange={handleChange('correo')}
                                        disabled={isLoading}
                                    />
                                    <Input
                                        name='usuario'
                                        variant='bordered'
                                        label='Usuario'
                                        type='text'
                                        value={values.usuario}
                                        isInvalid={!!errors.usuario && !!touched.usuario}
                                        errorMessage={errors.usuario}
                                        onChange={handleChange('usuario')}
                                        disabled={isLoading}
                                    />
                                    <Input
                                        name='password'
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
                                color='danger' 
                                variant='ghost'
                                onPress={onClose}
                                >Cancelar</Button>
                                <Button
                                isLoading={isLoading}
                                onPress={() => handleSubmit()}
                                variant='ghost'
                                color='primary'
                                >
                                    Guardar
                                </Button>
                            </>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
