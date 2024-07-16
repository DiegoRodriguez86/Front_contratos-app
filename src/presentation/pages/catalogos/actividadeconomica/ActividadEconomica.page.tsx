import { Button, getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { useActividadEconomicaStore } from '../../../hooks/pages/catalogos/actividadeconomica/useActividadEconomica.hook';
import { useAlertStore } from '../../../hooks/pages/alert/useAlertStore.hook';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { TiPlus, TiTrash } from 'react-icons/ti';
import { IActividadEconomica } from '../../../../domain/models/app/actividadeconomica/actividadEconomica.model';
import { LayoutCatalogos } from '../../../components/catalogos/LayoutCatalogos';
import { ModalEliminarActividadEconomica } from '../../../components/catalogos/actividadeconomica/ModalEliminarActividadEconomica';
import { ModalAgregarActividadEconomica } from '../../../components/catalogos/actividadeconomica/ModalAgregarActividadEconomica';


export const ActividadEconomica = () => {

    const { isOpen: agregarIsOpen, onOpen: agregatOnOpen, onOpenChange: AgregarOnOpenChange, onClose: agregarOnClose } = useDisclosure();
    const { isOpen: eliminarIsOpen, onOpen: eliminarOnOpen, onOpenChange: eliminarOnOpenChange, onClose: eliminarOnClose } = useDisclosure();
    const { name, info, isLoading, rehydrated, getActividadEconomicaList } = useActividadEconomicaStore();
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
        getActividadEconomicaList();
    }, []);

    useEffect(() => {
        getActividadEconomicaList();
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

    const renderCell = useCallback((item: IActividadEconomica, columnKey: string | number) => {
        const cellValue = getKeyValue(item, columnKey);
        switch (columnKey) {
            case 'actions':
                return (
                    <div className="flex gap-4 items-center">
                        <Button onPress={() => handleDeleteActividad(item.actividadEconomicaId)} isIconOnly={true} variant='ghost' color='danger' aria-label='Eliminar'>
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
                <Table
                    isHeaderSticky
                    aria-label='Actividades Economicas'
                >
                    <TableHeader>
                        <TableColumn key="actividadEconomicaId">Id</TableColumn>
                        <TableColumn key="actividadEconomica">Actividad</TableColumn>
                        <TableColumn key="fechaCaptura">Fecha de captura</TableColumn>
                        <TableColumn key="actions">Acciones</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={info ?? []}
                        loadingContent={<Spinner />}
                        loadingState={loadingState}
                    >
                        {(item:IActividadEconomica) => (
                            <TableRow key={item.actividadEconomicaId}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <ModalEliminarActividadEconomica isOpen={eliminarIsOpen} onOpenChange={eliminarOnOpenChange} onClose={eliminarOnClose} idActividadEconomica={idActividadSelect} />
            <ModalAgregarActividadEconomica isOpen={agregarIsOpen} onOpenChange={AgregarOnOpenChange} onClose={agregarOnClose} />
        </LayoutCatalogos>
    );
};
