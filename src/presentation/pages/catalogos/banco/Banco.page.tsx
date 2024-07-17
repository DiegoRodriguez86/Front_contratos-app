import { Button, getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { useBancoStore } from '../../../hooks/pages/catalogos/banco/useBanco.hook';
import { useAlertStore } from '../../../hooks/pages/alert/useAlertStore.hook';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { TiPlus, TiTrash } from 'react-icons/ti';
import { IBanco } from '../../../../domain/models/app/banco/banco.model';
import { LayoutCatalogos } from '../../../components/catalogos/LayoutCatalogos';
import { ModalEliminarBanco } from '../../../components/catalogos/banco/ModalEliminarBanco';
import { ModalAgregarBanco } from '../../../components/catalogos/banco/ModalAgregarBanco';



export const Bancos = () => {
    const { isOpen: agregarIsOpen, onOpen: agregarOnOpen, onOpenChange: AgregarOnOpenChange, onClose: agregarOnClose } = useDisclosure();
    const { isOpen: eliminarIsOpen, onOpen: eliminarOnOpen, onOpenChange: eliminarOnOpenChange, onClose: eliminarOnClose } = useDisclosure();
    const { name, info, isLoading, rehydrated, getBancoList } = useBancoStore();
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
        getBancoList();
    }, []);

    useEffect(() => {
        getBancoList();
    }, [rehydrated]);

    const loadingState = isLoading ? 'loading' : 'idle';

    const butoonAdd = (
        <Button onPress={agregarOnOpen} color="primary" variant="ghost" startContent={<TiPlus />} isLoading={isLoading}>
            Agregar
        </Button>
    );

    const [idBancoSlect, setIdBancoSlect] = useState(0);

    const handleDeleteBanco = (bancoId: number) => {
        setIdBancoSlect(bancoId);
        eliminarOnOpen();
    };

    const renderCell = useCallback((item: IBanco, columnKey: string | number) => {
        const cellValue = getKeyValue(item, columnKey);
        switch (columnKey) {
            case 'actions':
                return (
                    <div className="flex gap-4 items-center">
                        <Button onPress={() => handleDeleteBanco(item.bancoId)} isIconOnly={true} variant='ghost' color='danger' aria-label='Eliminar'>
                            <TiTrash />
                        </Button>
                    </div>
                );
        }
        return cellValue;
    }, []);

    return (
        <LayoutCatalogos title={name.toUpperCase()} buttonAdd={butoonAdd}>
            <div className="flex justify-center items-center max-h-screen">
                <Table isHeaderSticky aria-label='Bancos Registrados'>
                    <TableHeader>
                        <TableColumn key="bancoId">Id</TableColumn>
                        <TableColumn key="nombreCorto">Nombre Corto</TableColumn>
                        <TableColumn key="nombreBanco">Nombre</TableColumn>
                        <TableColumn key="fechaCaptura">Fecha de Captura</TableColumn>
                        <TableColumn key="actions">Acciones</TableColumn>
                    </TableHeader>
                    <TableBody items={info ?? []} loadingContent={<Spinner/>} loadingState={loadingState}>
                    {(item: IBanco) => (
                        <TableRow key={item.bancoId}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
            <ModalEliminarBanco isOpen={eliminarIsOpen} onOpenChange={eliminarOnOpenChange} onClose={eliminarOnClose} idBanco={idBancoSlect} />
            <ModalAgregarBanco isOpen={agregarIsOpen} onOpenChange={AgregarOnOpenChange} onClose={agregarOnClose} />
        </LayoutCatalogos>
    );
};
