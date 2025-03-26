import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';

interface ColumnProps {
    header: string;
    field: string;
    width?: string;
}

interface TableSkeletonProps {
    length: number;
    columns: ColumnProps[];
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ length, columns }) => {
    // Generar elementos vacíos basados en la longitud pasada como prop
    const items: any[] = Array.from({ length }, (_, index) => index + 1);

    return (
        <DataTable
            value={items}
            totalRecords={0}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            className="datatable-custom"
            currentPageReportTemplate="{first} - {last} de {totalRecords} registros"
            responsiveLayout="scroll"
            stripedRows
        >
            {columns.map((col, index) => (
                <Column key={index} header={col.header} field={col.field} body={<Skeleton width="100%" height="3rem" />} headerStyle={{ width: col.width }} />
            ))}
        </DataTable>
    );
};

export default TableSkeleton;
