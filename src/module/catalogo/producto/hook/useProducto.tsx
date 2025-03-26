import { fetchList, create, update, remove } from "../services/ProductoService";
import { useCrud } from "@/common/generic/crud-generico";
import { EstadoComponent } from "@/components";

import ActionComponent from "@/components/table/ActionComponent";
import { useEffect } from "react";

// Hook personalizado para manejar incidencia tipos
const useProducto = () => {
  const {
    onHiddenDeleteDialog,
    toast,
    isError,
    isFetching,
    isLoading,
    data,
    refetch,
    enabled,
    setEnabled,
    filters,
    setFilters,
    onFilter,
    onPage,
    deleteDialog,
    deleteMessageDialog,
    onDeleteDialogChange,
    onDelete,
    onShowDeleteDialog,
    onShowFormDialog,
    onHiddenFormDialog,
    onSave,
    formDialog,
    formDataDialog,
    formMessageDialog,
  } = useCrud({
    fetchListFn: fetchList, // Función para obtener la lista
    createFn: create, // Función para crear
    updateFn: update, // Función para actualizar
    removeFn: remove, // Función para eliminar
    resourceName: "catalogo-producto", // Nombre del recurso
    defaultFilters: {
      limit: 10,
      page: 1,
      //   where: {},
    },
  });

  useEffect(() => {
    setEnabled(true);
    refetch(); // Ejecutar la función de refetch solo una vez
  }, [setEnabled, refetch]);

  const ColumnItems = [
    {
      header: "#",
      field: "index",
      width: "3rem",
      body: (_: any, options: any) => options.rowIndex + 1,
    },
    { header: "Nombre", field: "nombre" },
    { header: "Numero de Serie", field: "numberSerial" },
    { header: "Numero de Parte", field: "numberPart" },
    { header: "Descripción", field: "descripcion" },
    { header: "Categoría", field: "categoria.nombre" },
    { header: "Marca", field: "marca.nombre" },
    {
      header: "Estado",
      field: "registerActive",
      body: (data: any) => (
        <EstadoComponent registerActive={data.registerActive} />
      ),
    },
    {
      header: "Acciones",
      field: "acciones",
      body: (data: any) => (
        <ActionComponent
          onAllowPermissionsForm={["CAT_INCIDENCIA_ESTADO_ACTUALIZAR"]}
          onAllowPermissionsDelete={["CAT_INCIDENCIA_ESTADO_ELIMINAR"]}
          onShowForm={() => onShowFormDialog(data)}
          onShowDelete={() =>
            onShowDeleteDialog({
              id: data.id,
              title: data.nombre,
              registerActive: data.registerActive,
            })
          }
        />
      ),
    },
  ];

  return {
    onHiddenDeleteDialog,
    toast,
    isError,
    isFetching,
    isLoading,
    data,
    refetch,
    enabled,
    setEnabled,
    filters,
    setFilters,
    onFilter,
    onPage,
    deleteDialog,
    deleteMessageDialog,
    onDeleteDialogChange,
    onDelete,
    onShowDeleteDialog,
    onShowFormDialog,
    onHiddenFormDialog,
    onSave,
    formDialog,
    formDataDialog,
    formMessageDialog,
    ColumnItems,
  };
};
export default useProducto;
