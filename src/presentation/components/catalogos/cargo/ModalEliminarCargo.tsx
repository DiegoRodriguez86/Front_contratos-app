import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useCargoStore } from '../../../hooks/pages/catalogos/cargo/useCargoStore.hook';
import { CargoDeleteType } from '../../../interfaces/pages/catalogos/cargo/cargo.interface';


interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    idCargo: number;
}

export const ModalEliminarCargo = ({ isOpen, onOpenChange, onClose, idCargo }: Props) => {
    const { isLoading, deleteCargoList } = useCargoStore();

    const handleDelete = (values: CargoDeleteType) => {
        deleteCargoList(values.cargoId);
        isOpen = false;
    };

    return (
        <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-white">Eliminar Cargo</ModalHeader>
                <ModalBody></ModalBody>
                <ModalFooter>
                    <Button color='danger' variant='ghost' onPress={onClose} disabled={isLoading}>Cancelar</Button>
                    <Button color='primary' variant='ghost' onPress={() => handleDelete({ cargoId: idCargo })} disabled={isLoading}>Eliminar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
