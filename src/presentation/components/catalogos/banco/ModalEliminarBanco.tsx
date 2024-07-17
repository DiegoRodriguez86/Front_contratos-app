import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useBancoStore } from '../../../hooks/pages/catalogos/banco/useBanco.hook';
import { BancoDeleteType } from '../../../interfaces/pages/catalogos/banco/banco.interface';


interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    idBanco: number;
}

export const ModalEliminarBanco = ({ isOpen, onOpenChange, onClose, idBanco }:Props) => {

    const { isLoading, deleteBancoList } = useBancoStore();

    const handleDelete = (values: BancoDeleteType) => {
        deleteBancoList(values.bancoId);
        isOpen = false;
    };

  return (
    <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1 text-white">Eliminar Banco</ModalHeader>
            <ModalBody>
            </ModalBody>
            <ModalFooter>
                <Button color='danger' variant='ghost' onClick={onClose} disabled={isLoading}>Cancelar</Button>
                <Button color='primary' variant='ghost' onClick={() => handleDelete({bancoId: idBanco})} disabled={isLoading}>Eliminar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  );
};
