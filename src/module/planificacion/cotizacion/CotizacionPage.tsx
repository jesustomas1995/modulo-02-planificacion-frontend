import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import TableSkeleton from "@/components/table/DataTableSkeletonComponent";
import DeleteItemComponent from "@/components/table/DeletedDialogComponent";
import usecotizacion from "./hook/useCotizacion";
import FormItemComponent from "./components/CotizacionFormDialog";
import ToolbarComponent from "@/components/table/ToolBarComponent";

import HeaderComponent from "@/components/table/HeaderComponent";
const CotizacionPage = () => {
  // Obtener lista
  const {
    toast,
    data,
    isLoading,
    onFilter,
    refetch,
    onPage,
    isFetching,
    filters,
    deleteDialog,
    deleteMessageDialog,
    onDelete,
    onHiddenDeleteDialog,
    // data form
    onShowFormDialog,
    onHiddenFormDialog,
    onSave,
    formDialog,
    formDataDialog,
    formMessageDialog,
    ColumnItems,
  } = usecotizacion();

  return (
    <div className="grid card grid-nogutter gap-3">
      <Toast ref={toast} />
      <div className="col-12">
        <ToolbarComponent
          onShowForm={() => onShowFormDialog(null)}
          title="Planificación - Cotización"
        />
      </div>
      <div className="col-12">
        <HeaderComponent refetch={refetch} />
      </div>
      <div className="col-12 p-0">
        {isLoading || isFetching ? (
          <TableSkeleton columns={ColumnItems} length={filters.limit} />
        ) : (
          <DataTable
            loading={isLoading}
            value={data?.items}
            lazy
            totalRecords={data?.totalItems ?? 0}
            dataKey="id"
            first={(filters.page - 1) * filters.limit}
            paginator
            rows={filters.limit}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="{first} - {last} de {totalRecords} registros"
            emptyMessage="Lista Vacía"
            responsiveLayout="scroll"
            stripedRows
            rowHover={true}
            onPage={(e) => onPage(e)}
            className="datatable-custom"
          >
            {ColumnItems.map((col, index) => (
              <Column
                key={index}
                header={col.header}
                field={col.field}
                body={col.body}
                headerStyle={{
                  width: col.width,
                }}
              />
            ))}
          </DataTable>
        )}
      </div>
      {deleteDialog && (
        <DeleteItemComponent
          onClick={onDelete}
          onHidden={onHiddenDeleteDialog}
          title={deleteMessageDialog}
          visible={deleteDialog}
        />
      )}
      {formDialog && (
        <FormItemComponent
          onSubmit={onSave}
          onHidden={onHiddenFormDialog}
          title={formMessageDialog}
          visible={formDialog}
          data={formDataDialog}
        />
      )}
    </div>
  );
};

export default CotizacionPage;
