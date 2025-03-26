import { Button } from "primereact/button";

const HeaderComponent: React.FC<{
  refetch: Function;
}> = ({ refetch }) => {
  return (
    <div className="toolbar-custom flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      {/* <h5 className="m-0">Manage Products</h5> */}
      <div className="flex flex-row gap-2">
        <Button
          rounded
          icon="pi pi-sync"
          onClick={() => refetch()}
          tooltip="Click para recargar los registros"
          tooltipOptions={{
            position: "bottom",
          }}
        />
      </div>
    </div>
  );
};

export default HeaderComponent;
