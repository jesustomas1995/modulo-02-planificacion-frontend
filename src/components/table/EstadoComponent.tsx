import { Tag } from 'primereact/tag';

const EstadoComponent: React.FC<{
    is_deleted: boolean;
}> = ({ is_deleted }) => <Tag value={is_deleted ? 'Inactivo' : 'Activo'} severity={is_deleted ? 'info' : 'success'}></Tag>;

export default EstadoComponent;
