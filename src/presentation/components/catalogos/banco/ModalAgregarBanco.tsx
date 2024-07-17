import { Button, Input, ModalBody, ModalContent, ModalHeader, Modal } from '@nextui-org/react';
import { useBancoStore } from '../../../hooks/pages/catalogos/banco/useBanco.hook';
import { BancoFormType } from '../../../interfaces/pages/catalogos/banco/banco.interface';
import { Formik } from 'formik';
import { BancoSchema } from '../../../utils/App/catalogos/banco.schema';


interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
}

const initialValues: BancoFormType = {
    nombreCorto: '',
    nombreBanco: '',
};

export const ModalAgregarBanco = ({ isOpen, onOpenChange, onClose }: Props) => {

    const { isLoading, addBancoList } = useBancoStore();

    const handleSave = (values: BancoFormType) => {
        addBancoList(values);
        isOpen = false;
    };

    return (
        <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-white">Agregar Banco</ModalHeader>
                <ModalBody>
                    <Formik initialValues={initialValues} validationSchema={BancoSchema} onSubmit={handleSave}>
                        {({ values, errors, touched, handleChange, handleSubmit }) => (
                            <>
                                <div className="flex flex-col gap-4 mb-4 text-white">
                                    <Input
                                        name='nombreCorto'
                                        variant='bordered'
                                        label='Nombre Corto'
                                        type='text'
                                        value={values.nombreCorto}
                                        isInvalid={!!errors.nombreCorto && !!touched.nombreCorto}
                                        errorMessage={errors.nombreCorto}
                                        onChange={handleChange('nombreCorto')}
                                        disabled={isLoading}
                                    />
                                    <Input
                                        name='nombreBanco'
                                        variant='bordered'
                                        label='Nombre Banco'
                                        type='text'
                                        value={values.nombreBanco}
                                        isInvalid={!!errors.nombreBanco && !!touched.nombreBanco}
                                        errorMessage={errors.nombreBanco}
                                        onChange={handleChange('nombreBanco')}
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
