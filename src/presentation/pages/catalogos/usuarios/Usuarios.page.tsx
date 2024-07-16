import { Button, getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { LayoutCatalogos } from '../../../components/catalogos/LayoutCatalogos';
import { useUsuariosStore } from '../../../hooks/pages/catalogos/usuarios/useUsuariosStore.hook';
import { useCallback, useEffect } from 'react';
import { TiPlus, TiTrash } from 'react-icons/ti';
import { ModalAgregarUsuario } from '../../../components/catalogos/usuario/ModalAgregarUsuario';
import { useAlertStore } from '../../../hooks/pages/alert/useAlertStore.hook';
import Swal from 'sweetalert2';
import { IUsuario } from '../../../../domain/models/app/usuarios/usuario.model';

export const Usuarios = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { name, info, isLoading, rehydrated, getUsuariosList } = useUsuariosStore();
    const { type, message, visible } = useAlertStore();

    useEffect(() => {
        if (visible) {
            Swal.fire({
                title: 'Estatus de la operación',
                text: message,
                icon: type
            });
        }
    }, [visible]);

    useEffect(() => {
        getUsuariosList();
    }, []);

    useEffect(() => {
        getUsuariosList();
    }, [rehydrated]);

    const loadingState = isLoading ? 'loading' : 'idle';

    const butoonAdd = (
        <Button onPress={onOpen} color="primary" variant="ghost" startContent={<TiPlus />} isLoading={isLoading}>
            Agregar
        </Button>
    );

    const renderCell = useCallback((item: IUsuario, columnKey: string | number) => {
        const cellValue = getKeyValue(item, columnKey);
        switch (columnKey) {
            case 'actions':
                return (
                    <div className="flex gap-4 items-center">
                        <Button isIconOnly={true} variant='ghost' color='danger' aria-label='Eliminar'>
                            <TiTrash />
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <LayoutCatalogos title={name.toUpperCase()} buttonAdd={butoonAdd}>
            <div className="flex justify-center items-center max-h-screen">
                <Table
                    isHeaderSticky
                    aria-label='Usuarios registrados'
                >
                    <TableHeader>
                        <TableColumn key="userId">
                            Id
                        </TableColumn>
                        <TableColumn key="usuario">
                            Usuario
                        </TableColumn>
                        <TableColumn key="correo" >
                            Correo
                        </TableColumn>
                        <TableColumn key="fechaCaptura">
                            Fecha de captura
                        </TableColumn>
                        <TableColumn key="actions">
                            Acciones
                        </TableColumn>
                    </TableHeader>
                    <TableBody
                        items={info ?? []}
                        loadingContent={<Spinner />}
                        loadingState={loadingState}
                    >
                        {(item) => (
                            <TableRow key={item.userId}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <ModalAgregarUsuario isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
        </LayoutCatalogos>
    );
};
