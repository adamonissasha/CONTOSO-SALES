import s from './managerCard.module.scss';
import ManagerService from '../../services/ManagerService';
import AgreeWindow from '../../modalWindow/AgreeModalWindow';
import React from 'react';

export default function ManagerCard({ manager }) {
    const [isAgreeWindowActive, setAgreeWindowActive] = React.useState(false);

    const onDelete = () => {
        ManagerService.delete(manager.id);
        setAgreeWindowActive(false);
        window.location.reload();
    }

    return (
        <div className={s.fullCard}>
            <div className={s.card}>
                <img className={s.photo} src={".\\images\\avatars\\" + manager.image} alt="user" />
                <div className={s.text}>
                    <h2>{manager.lastName} {manager.firstName}</h2>
                    <h3>{manager.login}</h3>
                    <h3>{manager.phoneNumber}</h3>
                </div>
                <img className={s.delete} src=".\images\delete.png" alt="delete" onClick={() => setAgreeWindowActive(true)} />
            </div>
            {
                isAgreeWindowActive &&
                <AgreeWindow
                    setActive={setAgreeWindowActive}
                    fun={onDelete}
                    title="Удаление менеджера"
                    text="Вы действительно хотите удалить менеджера?" />
            }
        </div>
    );
}