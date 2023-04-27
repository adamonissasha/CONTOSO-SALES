import React from 'react';
import s from './notification.module.scss';

export default function Notification({ setActive, title, text }) {
    return (
        <div className={s.modal}>
            <div className={s.header}>
                <img className={s.warning} src='../../images/warning.png' alt="warning.png" />
                <h2>{title}!</h2>
                <img onClick={() => setActive(false)} className={s.close} src='../../images/delete.png' alt="close.png" />
            </div>
            <h3>{text}</h3>
        </div>
    );
}
