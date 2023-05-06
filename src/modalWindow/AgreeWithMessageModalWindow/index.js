import React from 'react';
import s from './agreeWithMessage.module.scss'

export default function AgreeWithMessageWindow({ setActive, fun, title, text }) {
    return (
        <div onClick={() => setActive(false)} className={s.modal}>
            <div onClick={e => e.stopPropagation()} className={s.modal_content}>
                <div className={s.header}>
                    <h2>{title}</h2>
                </div>
                <h3>{text}</h3>
                <input className={s.inp} />
                <div className={s.buttons}>
                    <button className={s.btn} onClick={() => fun()}>Да</button>
                    <button className={s.btn} onClick={() => setActive(false)}>Нет</button>
                </div>
            </div>
        </div>
    );
}
