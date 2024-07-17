import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useActividadImssStore } from '../../../hooks/pages/catalogos/actividadimss/useActividadImss.hook';
import { ActividadIMSSFormType } from '../../../interfaces/pages/catalogos/actividadimss/actividadimss.interface';
import { Formik } from 'formik';
import { ActividadImssSchema } from '../../../utils/App/catalogos/actividadIMSS.schema';


interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
}

const initialValues: ActividadIMSSFormType = {
    actividadIMSS: '',
};

export const ModalAgregarActividadImss = ({isOpen, onOpenChange, onClose}: Props) => {

    const { isLoading, addActividadImssList } = useActividadImssStore();

    const handleSave = (values: ActividadIMSSFormType) => {
        addActividadImssList(values);
        isOpen = false;
    };

  return (
    <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1 text-white">Agregar Actividad IMSS</ModalHeader>
            <ModalBody>
                <Formik
                initialValues={initialValues}
                validationSchema={ActividadImssSchema}
                onSubmit={handleSave}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                        <>
                            <div className="flex flex-col gap-4 mb-4 text-white">
                                <Input
                                    name='actividadIMSS'
                                    variant='bordered'
                                    label='Actividad IMSS'
                                    type='text'
                                    value={values.actividadIMSS}
                                    isInvalid={!!errors.actividadIMSS && !!touched.actividadIMSS}
                                    errorMessage={errors.actividadIMSS}
                                    onChange={handleChange('actividadIMSS')}
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
                            >Guardar</Button>
                        </>
                    )}
                </Formik>
            </ModalBody>
        </ModalContent>
    </Modal>
  );
};
