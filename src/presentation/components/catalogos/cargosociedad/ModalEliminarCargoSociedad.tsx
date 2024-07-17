import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useCargoSociedadStore } from '../../../hooks/pages/catalogos/cargosociedad/useCargoSociedad.hook';
import { CargoSociedadDeleteType } from '../../../interfaces/pages/catalogos/cardosociedad/cargoSociedad.interface';

interface Props{
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    idCargoSociedad: number;
}

export const ModalEliminarCargoSociedad = ({ isOpen, onOpenChange, onClose, idCargoSociedad }:Props) => {
    const { isLoading, deleteCargoSociedadList } = useCargoSociedadStore();

    const handleDelete = (values: CargoSociedadDeleteType) => {
        deleteCargoSociedadList(values.cargoSociedadId);
        isOpen = false;
    };

  return (
    <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1 text-white">Eliminar Cargo Sociedad</ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
                <Button color='danger' variant='ghost' onClick={onClose} isLoading={isLoading}>Cancelar</Button>
                <Button color='primary' variant='ghost' onClick={() => handleDelete({cargoSociedadId: idCargoSociedad})} isLoading={isLoading}>Eliminar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  );
};
