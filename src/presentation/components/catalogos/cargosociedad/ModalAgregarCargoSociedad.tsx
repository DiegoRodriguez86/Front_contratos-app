import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useCargoSociedadStore } from '../../../hooks/pages/catalogos/cargosociedad/useCargoSociedad.hook';
import { CargoSociedadFormType } from '../../../interfaces/pages/catalogos/cardosociedad/cargoSociedad.interface';
import { CargoSociedadSchema } from '../../../utils/App/catalogos/cargoSociedad.schema';
import { Formik } from 'formik';


interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
}

const initialValues: CargoSociedadFormType = {
    cargoSociedad: '',
};

export const ModalAgregarCargoSociedad = ({ isOpen, onOpenChange, onClose }: Props) => {
    const { isLoading, addCargoSociedadList } = useCargoSociedadStore();

    const handleSave = (values: CargoSociedadFormType) => {
        addCargoSociedadList(values);
        isOpen = false;
    };

    return (
        <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-white">Agregar Cargo Sociedad</ModalHeader>
                <ModalBody>
                    <Formik initialValues={initialValues} validationSchema={CargoSociedadSchema} onSubmit={handleSave}>
                        {({ values, errors, touched, handleChange, handleSubmit }) => (
                            <>
                                <div className="flex flex-col gap-4 mb-4 text-white">
                                    <Input
                                        name="cargoSociedad"
                                        variant="bordered"
                                        label="Cargo Sociedad"
                                        type="text"
                                        value={values.cargoSociedad}
                                        isInvalid={!!errors.cargoSociedad && !!touched.cargoSociedad}
                                        errorMessage={errors.cargoSociedad}
                                        onChange={handleChange('cargoSociedad')}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <Button color="danger" variant="ghost" onPress={onClose} disabled={isLoading}>Cancelar</Button>
                                    <Button color="primary" variant="ghost" onPress={() => handleSubmit()} disabled={isLoading}>Guardar</Button>
                                </div>
                            </>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};


