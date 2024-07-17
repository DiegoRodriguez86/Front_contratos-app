import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useCargoStore } from '../../../hooks/pages/catalogos/cargo/useCargoStore.hook';
import { CargoFormType } from '../../../interfaces/pages/catalogos/cargo/cargo.interface';
import { Formik } from 'formik';
import { CargoShema } from '../../../utils/App/catalogos/cargo.shema';


interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
}

const initialValues: CargoFormType = {
    cargo: '',
};

export const ModalAgregarCargo = ({ isOpen, onOpenChange, onClose }: Props) => {
    const { isLoading, addCargoList } = useCargoStore();

    const handleSave = (values: CargoFormType) => {
        addCargoList(values);
        isOpen = false;
    };

    return (
        <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className='flex flex-col gap-1 text-white'>Agregar Cargo</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={CargoShema}
                        onSubmit={handleSave}>
                        {({ values, errors, touched, handleChange, handleSubmit }) => (
                            <>
                                <div className='flex flex-col gap-4 mb-4 text-white'>
                                    <Input
                                        name='cargo'
                                        variant='bordered'
                                        label='Cargo'
                                        type='text'
                                        value={values.cargo}
                                        isInvalid={!!errors.cargo && !!touched.cargo}
                                        errorMessage={errors.cargo}
                                        onChange={handleChange('cargo')}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className='flex justify-end gap-4'>
                                    <Button color='danger' variant='ghost' onPress={onClose} isLoading={isLoading}>Cancelar</Button>
                                    <Button color='primary' variant='ghost' onPress={() => handleSubmit()} isLoading={isLoading}>Guardar</Button>
                                </div>
                            </>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};