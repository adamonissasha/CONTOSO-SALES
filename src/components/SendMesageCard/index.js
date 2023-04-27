import s from './sendMessageCard.module.scss';
import React from 'react';

export default function SendMessageCard({ setActive, label }) {
    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>{label}</h2>
                <img onClick={() => setActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <form>
                <div className={s.fields} >
                    <div className={s.column}>
                        <p>Заголовок письма</p>
                        <input
                            className={s.inp}
                            required />
                        <p>Файл</p>
                        <input
                            className={s.inp}
                            required />
                    </div>
                    <div className={s.column}>
                        <p>Текст письма</p>
                        <textarea
                            className={s.tArea}
                            required />
                    </div>
                </div>
                <button className={s.but}>Отправить</button>
            </form>
        </div>
    );
}