import { Button, getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { useActividadImssStore } from '../../../hooks/pages/catalogos/actividadimss/useActividadImss.hook';
import { useAlertStore } from '../../../hooks/pages/alert/useAlertStore.hook';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { TiPlus, TiTrash } from 'react-icons/ti';
import { IActividadIMSS } from '../../../../domain/models/app/actividadimss/actividadImss.model';
import { LayoutCatalogos } from '../../../components/catalogos/LayoutCatalogos';
import { ModalEliminarActividadImss } from '../../../components/catalogos/actividadimss/ModalEliminarActividadImss';
import { ModalAgregarActividadImss } from '../../../components/catalogos/actividadimss/ModalAgregarActividadImss';




export const ActividadImss = () => {

    const { isOpen: agregarIsOpen, onOpen: agregatOnOpen, onOpenChange: AgregarOnOpenChange, onClose: agregarOnClose } = useDisclosure();
    const { isOpen: eliminarIsOpen, onOpen: eliminarOnOpen, onOpenChange: eliminarOnOpenChange, onClose: eliminarOnClose } = useDisclosure();
    const { name, info, isLoading, rehydrated, getActividadImssList } = useActividadImssStore();
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
        getActividadImssList();
    }, []);

    useEffect(() => {
        getActividadImssList();
    }, [rehydrated]);

    const loadingState = isLoading ? 'loading' : 'idle';

    const butoonAdd = (
        <Button onPress={agregatOnOpen} color="primary" variant="ghost" startContent={<TiPlus />} isLoading={isLoading}>
            Agregar
        </Button>
    );

    const [idActividadSelect, setIdActividadSelect] = useState(0);

    const handleDeleteActividad = (actividadId: number) => {
        setIdActividadSelect(actividadId);
        eliminarOnOpen();
    };

    const renderCell = useCallback((item: IActividadIMSS, columnKey: string | number) => {
        const cellValue = getKeyValue(item, columnKey);
        switch (columnKey) {
            case 'actions':
                return (
                    <div className="flex gap-4 items-center">
                        <Button onPress={() => handleDeleteActividad(item.actividadIMSSId)} isIconOnly={true} variant='ghost' color='danger' aria-label='Eliminar'>
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
                <Table isHeaderSticky
                    aria-label='Actividades IMSS'>
                    <TableHeader>
                        <TableColumn key="actividadIMSSId">Id</TableColumn>
                        <TableColumn key="actividadIMSS">Actividad</TableColumn>
                        <TableColumn key="fechaCaptura">Fecha de captura</TableColumn>
                        <TableColumn key="actions">Acciones</TableColumn>
                    </TableHeader>
                    <TableBody items={info ?? []} loadingContent={<Spinner />} loadingState={loadingState}>
                        {(item: IActividadIMSS) => (
                            <TableRow key={item.actividadIMSSId}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <ModalEliminarActividadImss isOpen={eliminarIsOpen} onOpenChange={eliminarOnOpenChange} onClose={eliminarOnClose} idActividadImss={idActividadSelect} />
            <ModalAgregarActividadImss isOpen={agregarIsOpen} onOpenChange={AgregarOnOpenChange} onClose={agregarOnClose} />
        </LayoutCatalogos>
    );
};
