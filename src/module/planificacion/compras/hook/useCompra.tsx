import { fetchList, create, update, remove } from "../services/CompraService";
import { DateTime } from "luxon";
import { useCrud } from "@/common/generic/crud-generico";
import { EstadoComponent } from "@/components";

import ActionComponent from "@/components/table/ActionComponent";
import { useEffect } from "react";
import { numeroFormateado } from "@/common/util/formatDecimal";

// Hook personalizado para manejar incidencia tipos
const useCompra = () => {
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
    resourceName: "planificacion-compra", // Nombre del recurso
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
    { header: "Presupuesto", field: "presupuesto.nombre" },
    {
      header: "Presupuesto - Monto",
      field: "presupuesto.monto",
      body: (data: any) => numeroFormateado(data.presupuesto.monto),
    },
    { header: "Proveedor", field: "proveedor.razonSocial" },
    { header: "Proveedor - Nit", field: "proveedor.nit" },
    {
      header: "Proveedor -  Representante Legal",
      field: "proveedor.representanteLegal",
    },
    {
      header: "Total(Bs.)",
      field: "total",
      body: (data: any) => numeroFormateado(data.total),
    },
    {
      header: "Registro",
      field: "createdAt",
      body: (data: any) =>
        DateTime.fromISO(data.createdAt).toFormat("dd/MM/yyyy HH:mm"),
    },
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
export default useCompra;
