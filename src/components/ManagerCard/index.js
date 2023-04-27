import s from './managerCard.module.scss';
import ManagerService from '../../services/ManagerService';

export default function ManagerCard({ manager }) {

    const onDelete = () => {
        ManagerService.delete(manager.id);
    }

    return (
        <div className={s.card}>
            <img className={s.photo} src=".\images\photo_2023-03-13_16-07-07.jpg" alt="user" />
            <div className={s.text}>
                <h2>{manager.lastName} {manager.firstName}</h2>
                <h3>{manager.login}</h3>
                <h3>{manager.phoneNumber}</h3>
            </div>
            <img className={s.delete} src=".\images\delete.png" alt="delete" onClick={() => onDelete()} />
        </div>
    );
}