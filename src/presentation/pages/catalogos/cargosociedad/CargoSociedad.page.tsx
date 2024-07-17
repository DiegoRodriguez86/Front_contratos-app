import { Button, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { useCargoSociedadStore } from '../../../hooks/pages/catalogos/cargosociedad/useCargoSociedad.hook';
import { useAlertStore } from '../../../hooks/pages/alert/useAlertStore.hook';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { TiPlus, TiTrash } from 'react-icons/ti';
import { ICargoSociedad } from '../../../../domain/models/app/cargosociedad/cargoSociedad.model';
import { LayoutCatalogos } from '../../../components/catalogos/LayoutCatalogos';
import { ModalEliminarCargoSociedad } from '../../../components/catalogos/cargosociedad/ModalEliminarCargoSociedad';
import { ModalAgregarCargoSociedad } from '../../../components/catalogos/cargosociedad/ModalAgregarCargoSociedad';



export const CargosSociedad = () => {
    const { isOpen: agregarIsOpen, onOpen: agregarOnOpen, onOpenChange: AgregarOnOpenChange, onClose: agregarOnClose } = useDisclosure();
    const { isOpen: eliminarIsOpen, onOpen: eliminarOnOpen, onOpenChange: eliminarOnOpenChange, onClose: eliminarOnClose } = useDisclosure();
    const { name, info, isLoading, rehydrated, getCargosSociedadList } = useCargoSociedadStore();
    const { type, message, visible } = useAlertStore();

    useEffect(() => {
      if (visible){
        Swal.fire({
          title: 'Estatus de la operación',
          text: message,
          icon: type
        });
      }
    }, [visible]);

    useEffect(() => {
        getCargosSociedadList();
    }, []);

    useEffect(() => {
        getCargosSociedadList();
    }, [rehydrated]);

    const loadingState = isLoading ? 'loading' : 'idle';

    const butoonAdd = (
      <Button onPress={agregarOnOpen} color="primary" variant="ghost" startContent={<TiPlus />} isLoading={isLoading}>
        Agregar
      </Button>
    );

    const [idCargoSociedadSlect, setIdCargoSociedadSlect] = useState(0);

    const handleDeleteCargoSociedad = (cargoSociedadId: number) => {
      setIdCargoSociedadSlect(cargoSociedadId);
      eliminarOnOpen();
    };

    const renderCell = useCallback((item: ICargoSociedad, columnKey: string | number) => {
        const cellValue = getKeyValue(item, columnKey);
        switch (columnKey) {
            case 'actions':
                return (
                    <div className="flex gap-4 items-center">
                        <Button onPress={() => handleDeleteCargoSociedad(item.cargoSociedadId)} isIconOnly={true} variant='ghost' color='danger' aria-label='Eliminar'>
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
            <Table isHeaderSticky aria-label="Cargos de Sociedad Registrados">
                <TableHeader>
                    <TableColumn key="cargoSociedadId">Id</TableColumn>
                    <TableColumn key="cargoSociedad">Cargo</TableColumn>
                    <TableColumn key="fechaCaptura">Fecha de captura</TableColumn>
                    <TableColumn key="actions">Acciones</TableColumn>
                </TableHeader>
                <TableBody items={info ?? []} loadingContent={loadingState} loadingState={loadingState}>
                    {(item: ICargoSociedad) => (
                        <TableRow key={item.cargoSociedadId}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        <ModalEliminarCargoSociedad isOpen={eliminarIsOpen} onOpenChange={eliminarOnOpenChange} onClose={eliminarOnClose} idCargoSociedad={idCargoSociedadSlect} />
        <ModalAgregarCargoSociedad isOpen={agregarIsOpen} onOpenChange={AgregarOnOpenChange} onClose={agregarOnClose} />
    </LayoutCatalogos>
  );
};
