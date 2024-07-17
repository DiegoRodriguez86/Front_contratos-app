import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useUsuariosStore } from '../../../hooks/pages/catalogos/usuarios/useUsuariosStore.hook';
import { UsuarioDeleteType } from '../../../interfaces/pages/catalogos/usuarios/usuario.iterface';


interface Props{
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    idUser: number;
}

export const ModalEliminarUsuario = ({ isOpen, onOpenChange, onClose, idUser }: Props) => {

const { isLoading, deleteUsuarioList } = useUsuariosStore();

const handleDelete = (values: UsuarioDeleteType) => {
    deleteUsuarioList(values.userId);
    isOpen = false;
};

  return (
    <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1 text-white">Eliminar Usuario</ModalHeader>
            <ModalBody>
            </ModalBody>
            <ModalFooter>
                <Button color='danger' variant='ghost' onClick={onClose} isLoading={isLoading}>Cancelar</Button>
                <Button color='primary' variant='ghost' onClick={() => handleDelete({userId: idUser})} isLoading={isLoading}>Eliminar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  );
};
