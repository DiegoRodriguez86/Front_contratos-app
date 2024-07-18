import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useEstadoEmpresaState } from '../../../hooks/pages/catalogos/estadoempresa/useEstadoEmpresaState.hook';
import { EstadoEmpresaDeleteType } from '../../../interfaces/pages/catalogos/estadoempresa/estadoEmpresa.interface';

interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
    idEstadoEmpresa: number;
}

export const ModalEliminarEstadoEmpresa = ({ isOpen, onOpenChange, onClose, idEstadoEmpresa }: Props) => {

    const { isLoading, deleteEstadoEmpresaList } = useEstadoEmpresaState();

    const handleDelete = (values: EstadoEmpresaDeleteType) => {
        deleteEstadoEmpresaList(values.estadoEmpresaId);
        isOpen = false;
    };

    return (
        <Modal className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-white">Eliminar Estado Empresa</ModalHeader>
                <ModalBody>
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' variant='ghost' onPress={onClose} isLoading={isLoading}>Cancelar</Button>
                    <Button color='primary' variant='ghost' onPress={() => handleDelete({estadoEmpresaId: idEstadoEmpresa})} isLoading={isLoading}>Eliminar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};