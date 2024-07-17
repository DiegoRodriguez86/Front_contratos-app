import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useActividadImssStore } from '../../../hooks/pages/catalogos/actividadimss/useActividadImss.hook';
import { ActividadIMSSDeleteType } from '../../../interfaces/pages/catalogos/actividadimss/actividadimss.interface';



interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    idActividadImss: number;
}

export const ModalEliminarActividadImss = ({ isOpen, onOpenChange, onClose, idActividadImss }:Props) => {

const { isLoading, deleteActividadImssList } = useActividadImssStore();

const handleDelete = (values: ActividadIMSSDeleteType) => {
    deleteActividadImssList(values.actividadIMSSId);
    isOpen = false;
};

  return (
    <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1 text-white">Eliminar Actividad IMSS</ModalHeader>
            <ModalBody>
            </ModalBody>
            <ModalFooter>
                <Button color='danger' variant='ghost' onClick={onClose} disabled={isLoading}>Cancelar</Button>
                <Button color='primary' variant='ghost' onClick={() => handleDelete({actividadIMSSId: idActividadImss})} disabled={isLoading}>Eliminar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  );
};
