import { Tag } from "primereact/tag";

const EstadoComponent: React.FC<{
  registerActive: boolean;
}> = ({ registerActive }) => (
  <Tag
    value={!registerActive ? "Inactivo" : "Activo"}
    severity={!registerActive ? "danger" : "secondary"}
  ></Tag>
);

export default EstadoComponent;
