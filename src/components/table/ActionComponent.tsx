import { Button } from "@/components/primereact";

const ActionComponent: React.FC<{
  onShowForm?: Function | React.MouseEventHandler<HTMLButtonElement> | any;
  onAllowPermissionsForm?: string[];
  onShowDelete?: Function | React.MouseEventHandler<HTMLButtonElement> | any;
  onAllowPermissionsDelete?: string[];
  onShowView?: Function | React.MouseEventHandler<HTMLButtonElement> | any;
  onAllowPermissionsView?: string[];
}> = ({ onShowForm, onShowDelete, onShowView }) => {
  return (
    <>
      <div className="flex justify-content-center column-gap-2">
        <Button
          className="p-button-rounded"
          icon="pi pi-eye"
          onClick={onShowView}
          tooltip="Click para visualizar"
        />
        <Button
          className="p-button-rounded"
          severity="success"
          icon="pi pi-pencil"
          onClick={onShowForm}
          tooltip="Click para editar"
        />
        <Button
          className="p-button-rounded"
          severity="warning"
          icon="pi pi-arrow-right-arrow-left"
          onClick={onShowDelete}
          tooltip="Click para cambiar el estado"
        />
      </div>
    </>
  );
};

export default ActionComponent;
