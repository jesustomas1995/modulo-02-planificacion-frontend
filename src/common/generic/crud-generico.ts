import { useState, useRef, useCallback } from 'react';
import { Toast } from 'primereact/toast';
import { useQuery, useMutation, QueryFunction } from '@tanstack/react-query';

import { TOKEN_KEY, USER_INFO_KEY } from '@/common/constant/localstorage.constant';

interface UseCrudParams {
    fetchListFn?: QueryFunction | any;
    createFn?: QueryFunction | any;
    updateFn?: QueryFunction | any;
    removeFn?: QueryFunction | any;
    resourceName: string;
    defaultFilters?: {
        page: number;
        limit: number;
        // fields: string[];
        // where: Record<string, any>;
    };
}

// Hook genérico para manejar operaciones CRUD
export const useCrud = ({
    fetchListFn,
    createFn,
    updateFn,
    removeFn,
    resourceName,
    defaultFilters = {
        page: 1,
        limit: 10,
        // fields: [],
        // where: {}
    }
}: UseCrudParams) => {
    const toast = useRef<Toast | null>(null);

    const [filters, setFilters] = useState(defaultFilters);
    const [enabled, setEnabled] = useState<boolean>(false);

    const handleAuthError = (error: any) => {
        if (error.response?.status === 403) {
            console.warn('🚨 Acceso denegado (403), redirigiendo al login...');
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_INFO_KEY);
            window.location.replace('/login');
        }
    };


    // Obtener la lista de elementos
    const { isError, isLoading, data, refetch, isFetching } = useQuery({
        queryKey: [`${resourceName}-list`, filters],
        queryFn: () => fetchListFn(filters),
        enabled,
        staleTime: 5000,
        throwOnError: (error: any) => {
            handleAuthError(error);
            toast.current?.show({
                severity: "error",
                summary: "Operación Fallida",
                detail: error.message,
                life: 3000,
            });
            return true;
        },
        select: (response: any) => response.data,
    });


    // Lógica de paginación, solo actualiza los filtros si hay cambios
    const onPage = useCallback((data: { rows: number; page: number } | any) => {
        const newLimit = data.rows;
        const newPage = data.page + 1;

        if (newLimit !== filters.limit || newPage !== filters.page) {
            setFilters(prevFilters => ({ ...prevFilters, limit: newLimit, page: newPage }));
            refetch();
        }
    }, [filters, refetch]);



    const onFilter = (customWhere: Record<string, any>): void => {
        setFilters(prevFilters => ({
            ...prevFilters,
            page: 1,
            // where: {
            //     ...customWhere,
            // },
        }));
        setEnabled(true);
    };

    const [filtersAll, setFiltersAll] = useState({
        page: 1,
        limit: 1000,
        // fields: ["id", "nombre"],
        // where: { is_deleted: false }
    });
    const [enabledAll, setEnabledAll] = useState<boolean>(false);
    const {
        isError: isErrorAll,
        isLoading: isLoadingAll,
        data: dataAll,
        refetch: onLoadAll,
        isFetching: isFetchingAll
    } = useQuery({
        queryKey: [`${resourceName}-all`, filtersAll],
        queryFn: () => fetchListFn(filtersAll),
        enabled: enabledAll,
        staleTime: 5000,
        throwOnError: (error: any) => {
            toast.current?.show({
                severity: "error",
                summary: "Operación Fallida",
                detail: error.message,
                life: 3000,
            });
            return true;
        },
        select: (response: any) => response.data,
    });
    const onFilterAll = (filtersInitial: any = { is_deleted: false }) => {
        setFiltersAll({
            ...filtersAll,
            // where: filtersInitial
        })
        onLoadAll()
    }

    // Lógica para eliminar un ítem
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteDataDialog, setDeleteDataDialog] = useState<any>({ id: null, estado: null });
    const [deleteMessageDialog, setDeleteMessageDialog] = useState("");

    const onDeleteDialogChange = useCallback((value: boolean) => setDeleteDialog(value), []);
    const onHiddenDeleteDialog = useCallback(() => {
        setDeleteMessageDialog("");
        setDeleteDataDialog({ id: null, estado: null });
        setDeleteDialog(false);
    }, []);

    const onShowDeleteDialog = ({ id, title, registerActive }: { id: number, title: string, registerActive: boolean }) => {
        setDeleteMessageDialog(`¿Desea cambiar el estado a ${!registerActive ? 'Activo' : 'Inactivo'} de <strong>${title}</strong>?`);
        setDeleteDataDialog({ id, estado: !registerActive });
        setDeleteDialog(true);
    };

    const mutationDelete = useMutation({
        mutationFn: (newData: any) => removeFn(newData.id, newData.estado),
        onSuccess: (data: any) => {
            toast.current?.show({
                severity: 'success',
                summary: 'Operación Exitosa',
                detail: data.message,
                life: 3000
            });
            onHiddenDeleteDialog();
            refetch();
        },
        onError: (response) => {
            toast.current?.show({
                severity: 'error',
                summary: 'Operación Fallida',
                detail: response.message,
                life: 3000
            });
        }
    });

    const onDelete = () => mutationDelete.mutate({ id: deleteDataDialog.id, estado: deleteDataDialog.estado });

    // Lógica para mostrar el formulario de agregar o editar un ítem
    const [formDialog, setFormDialog] = useState(false);
    const [formDataDialog, setFormDataDialog] = useState<any>({ id: null, estado: null });
    const [formMessageDialog, setFormMessageDialog] = useState("");

    const onHiddenFormDialog = useCallback(() => {
        setFormMessageDialog("");
        setFormDialog(false);
        setFormDataDialog({ id: null, estado: null });
    }, []);

    const onShowFormDialog = (data: any) => {
        setFormMessageDialog(data?.id ? "Editar" : "Registrar");
        setFormDialog(true);
        setFormDataDialog(data);
    };

    const mutationForm = useMutation({
        mutationFn: (newData: any) => {
            const { id, ...body } = newData;
            if (id) return updateFn(id, body)
            else return createFn(body)
        },
        onSuccess: (data: any) => {
            toast.current?.show({
                severity: 'success',
                summary: 'Operación Exitosa',
                detail: data.message,
                life: 3000
            });
            onHiddenFormDialog();
            refetch();
        },
        onError: (result: any) => {
            toast.current?.show({
                severity: 'error',
                summary: 'Operación Fallida',
                detail: result.response?.data.message,
                life: 3000
            });
        }
    });
    const onSave = (data: any) => mutationForm.mutate(data);

    return {
        // all data
        isErrorAll,
        isLoadingAll,
        dataAll,
        onLoadAll,
        isFetchingAll,
        enabledAll,
        setEnabledAll,
        onFilterAll,
        //
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
        onPage,
        onFilter,
        deleteDialog,
        deleteMessageDialog,
        onDeleteDialogChange,
        onDelete,
        onShowDeleteDialog,
        onShowFormDialog,
        onHiddenFormDialog,
        onSave,
        isSubmitting: mutationForm.isPending,
        isDeleting: mutationDelete.isPending,
        formDialog,
        formDataDialog,
        formMessageDialog
    };
};
