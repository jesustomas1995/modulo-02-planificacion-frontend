import { Dialog } from 'primereact/dialog';
import React from 'react';
import { Button } from 'primereact/button';

interface DeleteItemProps {
    onClick: Function;
    title: string;
    visible: boolean;
    onHidden: Function;
    inProcess?: boolean;
}

const DeleteItemComponent: React.FC<DeleteItemProps> = ({ onClick, onHidden, title, visible, inProcess }) => {
    const deleteProductDialogFooter = (
        <>
            <Button label="Aceptar" onClick={() => onClick()} disabled={inProcess ?? false} />
            <Button label="Cancelar" severity="secondary" onClick={() => onHidden()} />
        </>
    );

    return (
        <>
            <Dialog visible={visible} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={() => onHidden()}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <div className="font-light" dangerouslySetInnerHTML={{ __html: title }} />
                </div>
            </Dialog>
        </>
    );
};

export default DeleteItemComponent;
