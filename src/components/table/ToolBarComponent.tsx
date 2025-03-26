import { Button } from "../primereact";

const ToolbarComponent: React.FC<{
  onShowForm?: Function;
  textShowForm?: string;
  title: string;
}> = ({ onShowForm, title, textShowForm = "Nuevo" }) => {
  return (
    <div className="toolbar-custom">
      <div className="flex justify-content-between flex-wrap ">
        <div className="flex align-items-center align-content-center justify-content-center">
          <div className="text-3xl">{title}</div>
        </div>
        <div className="flex align-items-center justify-content-center">
          {onShowForm && (
            <Button
              severity="success"
              className="p-button-primary"
              label={textShowForm}
              onClick={() => onShowForm(null)}
              tooltip="Click para abrir formulario"
              tooltipOptions={{
                position: "bottom",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolbarComponent;
