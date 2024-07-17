import { Button, getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { useCargoStore } from '../../../hooks/pages/catalogos/cargo/useCargoStore.hook';
import { useAlertStore } from '../../../hooks/pages/alert/useAlertStore.hook';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { TiPlus, TiTrash } from 'react-icons/ti';
import { LayoutCatalogos } from '../../../components/catalogos/LayoutCatalogos';
import { ICargo } from '../../../../domain/models/app/cargo/cargo.model';
import { ModalEliminarCargo } from '../../../components/catalogos/cargo/ModalEliminarCargo';
import { ModalAgregarCargo } from '../../../components/catalogos/cargo/ModalAgregarCargo';


export const Cargos = () => {
    const { isOpen: agregarIsOpen, onOpen: agregarOnOpen, onOpenChange: AgregarOnOpenChange, onClose: agregarOnClose } = useDisclosure();
    const { isOpen: eliminarIsOpen, onOpen: eliminarOnOpen, onOpenChange: eliminarOnOpenChange, onClose: eliminarOnClose } = useDisclosure();
    const { name, info, isLoading, rehydrated, getCargosList } = useCargoStore();
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
        getCargosList();
    }, []);

    useEffect(() => {
        getCargosList();
    }, [rehydrated]);

    const loadingState = isLoading ? 'loading' : 'idle';

    const butoonAdd = (
        <Button onPress={agregarOnOpen} color="primary" variant="ghost" startContent={<TiPlus />} isLoading={isLoading}>
            Agregar
        </Button>
    );

    const [idCargoSlect, setIdCargoSlect] = useState(0);

    const handleDeleteCargo = (cargoId: number) => {
        setIdCargoSlect(cargoId);
        eliminarOnOpen();
    };

    const renderCell = useCallback((item: ICargo, columnKey: string | number) => {
        const cellValue = getKeyValue(item, columnKey);
        switch (columnKey) {
            case 'actions':
                return (
                    <div className="flex gap-4 items-center">
                        <Button onPress={() => handleDeleteCargo(item.cargoId)} isIconOnly={true} variant='ghost' color='danger' aria-label='Eliminar'>
                            <TiTrash />
                        </Button>
                    </div>
                );
                default: return cellValue;
        }
    }, []);

    return (
        <LayoutCatalogos title={name.toUpperCase()} buttonAdd={butoonAdd}>
            <div className="flex justify-center items-center max-h-screen">
                <Table isHeaderSticky aria-label='Cargos Registrados'>
                    <TableHeader>
                        <TableColumn key='cargoId'>Id</TableColumn>
                        <TableColumn key='cargo'>Cargo</TableColumn>
                        <TableColumn key='fechaCreacion'>Fecha de Creación</TableColumn>
                        <TableColumn key='actions'>Acciones</TableColumn>
                    </TableHeader>
                    <TableBody items={info ?? []} loadingContent={<Spinner/>} loadingState={loadingState}>
                    {(item: ICargo) => (
                        <TableRow key={item.cargoId}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
            <ModalEliminarCargo isOpen={eliminarIsOpen} onOpenChange={eliminarOnOpenChange} onClose={eliminarOnClose} idCargo={idCargoSlect} />
            <ModalAgregarCargo isOpen={agregarIsOpen} onOpenChange={AgregarOnOpenChange} onClose={agregarOnClose} />
        </LayoutCatalogos>
    );
};
