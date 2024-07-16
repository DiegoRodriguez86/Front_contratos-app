import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useActividadEconomicaStore } from '../../../hooks/pages/catalogos/actividadeconomica/useActividadEconomica.hook';
import { ActividadEconomicaDeleteType } from '../../../interfaces/pages/catalogos/actividadeconomica/actividadeconomica.interface';


interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    idActividadEconomica: number;
}

export const ModalEliminarActividadEconomica = ({ isOpen, onOpenChange, onClose, idActividadEconomica }: Props) => {

    const { isLoading, deleteActividadEconomicaList } = useActividadEconomicaStore();

    const handleDelete = (values: ActividadEconomicaDeleteType) => {
        deleteActividadEconomicaList(values.actividadEconomicaId);
        isOpen = false;
    };

    return (
        <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-white">Eliminar Actividad Economica</ModalHeader>
                <ModalBody>
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' variant='ghost' onClick={onClose} disabled={isLoading}>Cancelar</Button>
                    <Button color='primary' variant='ghost' onClick={() => handleDelete({actividadEconomicaId: idActividadEconomica})} disabled={isLoading}>Eliminar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
