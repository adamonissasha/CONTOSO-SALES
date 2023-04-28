import s from './newRequestCard.module.scss';
import { useState } from 'react';
import Notification from '../../modalWindow/Notification';

export default function NewRequestCard({ setActive }) {
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const [title, setTitle] = useState("");

    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>Добавить новую заявку</h2>
                <img onClick={() => setActive(false)} src="..\..\images\delete.png" alt="close" />
            </div>
            <form>
                <div className={s.fields}>
                    <div className={s.column}>
                        <p>Имя</p>
                        <select className={s.sel}>
                            <option>DSd</option>
                        </select>
                    </div>
                    <div className={s.column}>
                        <p>Дата доставки</p>
                        <input
                            className={s.inp}
                            required />
                    </div>
                </div>
                <button className={s.but}>Добавить</button>
            </form>
            {/* {isNotificationActive &&
                <Notification
                    title={title}
                    text={notificationText}
                    setActive={setNotificationActive} />} */}
        </div>
    );
}