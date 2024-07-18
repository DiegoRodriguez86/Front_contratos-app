import { Button, getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { useEstadoEmpresaState } from '../../../hooks/pages/catalogos/estadoempresa/useEstadoEmpresaState.hook';
import { useAlertStore } from '../../../hooks/pages/alert/useAlertStore.hook';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { TiPlus, TiTrash } from 'react-icons/ti';
import { IEstadoEmpresa } from '../../../../domain/models/app/estadoempresa/estadoEmpresa.model';
import { LayoutCatalogos } from '../../../components/catalogos/LayoutCatalogos';
import { ModalEliminarEstadoEmpresa } from '../../../components/catalogos/estadoempresa/ModalEliminarEstadoEmpresa';
import { ModalAgregarEstadoEmpresa } from '../../../components/catalogos/estadoempresa/ModalAgregarEstadoEmpresa';



export const EstadosEmpresa = () => {
    const { isOpen: agregarIsOpen, onOpen: agregarOnOpen, onOpenChange: AgregarOnOpenChange, onClose: agregarOnClose } = useDisclosure();
    const { isOpen: eliminarIsOpen, onOpen: eliminarOnOpen, onOpenChange: eliminarOnOpenChange, onClose: eliminarOnClose } = useDisclosure();
    const { name, info, isLoading, rehydrated, getEstadosEmpresaList } = useEstadoEmpresaState();
    const { type, message, visible } = useAlertStore();

    const [idEstadoSelect, setIdEstadoSelect] = useState(0);

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
        getEstadosEmpresaList();
    }, []);

    useEffect(() => {
        getEstadosEmpresaList();
    }, [rehydrated]);

    const loadingState = isLoading ? 'loading' : 'idle';

    const butoonAdd = (
        <Button onPress={agregarOnOpen} color="primary" variant="ghost" startContent={<TiPlus />} isLoading={isLoading}>
            Agregar
        </Button>
    );

    const handleDeleteEstado = (estadoEmpresaId: number) => {
        setIdEstadoSelect(estadoEmpresaId);
        eliminarOnOpen();
    };

    const renderCell = useCallback((item: IEstadoEmpresa, columnKey: string | number) => {
        const cellValue = getKeyValue(item, columnKey);
        switch (columnKey) {
            case 'actions':
                return (
                    <div className="flex gap-4 items-center">
                        <Button onPress={() => handleDeleteEstado(item.estadoId)} isIconOnly={true} variant='ghost' color='danger' aria-label='Eliminar'>
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
            <div className='flex justify-center items-center max-h-screen'>
                <Table isHeaderSticky aria-label="Estado Empresas registrados">
                    <TableHeader>
                        <TableColumn key='estadoEmpresaId'>Id</TableColumn>
                        <TableColumn key='estado'>Estado Empresa</TableColumn>
                        <TableColumn key="fechaCaptura">Fecha de captura</TableColumn>
                        <TableColumn key="actions">Acciones</TableColumn>
                    </TableHeader>
                    <TableBody items={info ?? []} loadingContent={<Spinner />} loadingState={loadingState}>
                        {(item: IEstadoEmpresa) => (
                            <TableRow key={item.estadoId}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <ModalEliminarEstadoEmpresa isOpen={eliminarIsOpen} onOpenChange={eliminarOnOpenChange} onClose={eliminarOnClose} idEstadoEmpresa={idEstadoSelect} />
            <ModalAgregarEstadoEmpresa isOpen={agregarIsOpen} onOpenChange={AgregarOnOpenChange} onClose={agregarOnClose} />
        </LayoutCatalogos>
    );
};

