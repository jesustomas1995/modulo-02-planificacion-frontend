import {
  fetchList,
  create,
  update,
  remove,
} from "../services/ProveedorService";
import { useCrud } from "@/common/generic/crud-generico";
import { EstadoComponent } from "@/components";

import ActionComponent from "@/components/table/ActionComponent";
import { useEffect } from "react";
import { departamentosBolivia } from "@/common/constant/departamentos.constant";

// Hook personalizado para manejar incidencia tipos
const userProveedor = () => {
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
    resourceName: "catalogo-proveedor", // Nombre del recurso
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
    { header: "Representante Legal", field: "representanteLegal" },
    { header: "Razón Social", field: "razonSocial" },
    { header: "Nit", field: "nit" },
    { header: "Celular", field: "celular" },
    { header: "Teléfono", field: "telefono" },
    { header: "Correo Electrónico", field: "email" },
    {
      header: "Departamento",
      field: "depatamentoId",
      body: (item: any) => {
        const find = departamentosBolivia.find(
          (data) => data.id == item.departamentoId
        );
        return find?.nombre;
      },
    },
    { header: "Municipio", field: "municipio" },
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
              title: data.razonSocial,
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
export default userProveedor;
