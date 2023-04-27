import s from './newClientCard.module.scss';
import React from 'react';

export default function NewClientCard({ setActive, label, buttonName }) {
    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>{label}</h2>
                <img onClick={() => setActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <form>
                <div className={s.fields}>
                    <div className={s.column}>
                        <p>Имя</p>
                        <input
                            className={s.inp}
                            required />
                        <p>Телефон</p>
                        <input
                            className={s.inp}
                            required />
                    </div>
                    <div className={s.column}>
                        <p>Email</p>
                        <input
                            className={s.inp}
                            required />
                        <p>Адрес</p>
                        <input
                            className={s.inp}
                            required />
                    </div>
                </div>
                <button className={s.but}>{buttonName}</button>
            </form>
        </div>
    );
}