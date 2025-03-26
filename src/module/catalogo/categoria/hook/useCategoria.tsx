import {
  fetchList,
  create,
  update,
  remove,
} from "../services/CategoriaService";
import { useCrud } from "@/common/generic/crud-generico";
import { EstadoComponent } from "@/components";

import ActionComponent from "@/components/table/ActionComponent";
import { useEffect } from "react";

// Hook personalizado para manejar incidencia tipos
const useCategoria = () => {
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
    resourceName: "catalogo-categoria", // Nombre del recurso
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
    { header: "Nombre del estado de incidencia", field: "nombre" },
    { header: "Descripción", field: "descripcion" },
    {
      header: "Estado",
      field: "color",
      body: (data: any) => <EstadoComponent is_deleted={data.is_deleted} />,
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
              is_deleted: data.is_deleted,
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
export default useCategoria;
