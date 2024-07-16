import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useActividadEconomicaStore } from '../../../hooks/pages/catalogos/actividadeconomica/useActividadEconomica.hook';
import { ActividadEconomicaFormType } from '../../../interfaces/pages/catalogos/actividadeconomica/actividadeconomica.interface';
import { Formik } from 'formik';
import { ActividadEconomicaSchema } from '../../../utils/App/catalogos/actividadEconomica.schema';


interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
}

const initialValues: ActividadEconomicaFormType = {
    actividadEconomica: '',
};


export const ModalAgregarActividadEconomica = ({ isOpen, onOpenChange, onClose }: Props) => {

    const { isLoading, addActividadEconomicaList } = useActividadEconomicaStore();

    const handleSave = (values: ActividadEconomicaFormType) => {
        addActividadEconomicaList(values);
        isOpen = false;
    };

    return (
        <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-white">Agregar Actividad Economica</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={ActividadEconomicaSchema}
                        onSubmit={handleSave}>
                        {({ values, errors, touched, handleChange, handleSubmit }) => (
                            <>
                                <div className="flex flex-col gap-4 mb-4 text-white">
                                    <Input
                                        name='actividadEconomica'
                                        variant='bordered'
                                        label='Actividad Economica'
                                        type='text'
                                        value={values.actividadEconomica}
                                        isInvalid={!!errors.actividadEconomica && !!touched.actividadEconomica}
                                        errorMessage={errors.actividadEconomica}
                                        onChange={handleChange('actividadEconomica')}
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
