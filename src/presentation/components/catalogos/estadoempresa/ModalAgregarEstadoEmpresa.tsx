import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useEstadoEmpresaState } from '../../../hooks/pages/catalogos/estadoempresa/useEstadoEmpresaState.hook';
import { EstadoEmpresaFormType } from '../../../interfaces/pages/catalogos/estadoempresa/estadoEmpresa.interface';
import { Formik } from 'formik';
import { EstadoEmpresaSchema } from '../../../utils/App/catalogos/estadoEmpresa.schema';

interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
}

const initialValues: EstadoEmpresaFormType = {
    estado: '',
};

export const ModalAgregarEstadoEmpresa = ({ isOpen, onOpenChange, onClose }: Props) => {
    const { isLoading, addEstadoEmpresaList } = useEstadoEmpresaState();

    const handleSave = (values: EstadoEmpresaFormType) => {
        addEstadoEmpresaList(values);
        isOpen = false;
    };

    return (
        <Modal className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-white">Agregar Estado Empresa</ModalHeader>
                <ModalBody>
                    <Formik initialValues={initialValues} onSubmit={handleSave} validationSchema={EstadoEmpresaSchema}>
                        {({ values, errors, touched, handleChange, handleSubmit }) => (
                            <>
                                <div className="flex flex-col gap-4 mb-4 text-white">
                                    <Input
                                        name="estado"
                                        variant="bordered"
                                        label="Estado"
                                        type="text"
                                        value={values.estado}
                                        isInvalid={!!errors.estado && !!touched.estado}
                                        errorMessage={errors.estado}
                                        onChange={handleChange('estado')}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <Button color="danger" variant="ghost" onPress={onClose} isLoading={isLoading}>
                                        Cancelar
                                    </Button>
                                    <Button color="primary" variant="ghost" onPress={() => handleSubmit()} isLoading={isLoading}>
                                        Guardar
                                    </Button>
                                </div>
                            </>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
