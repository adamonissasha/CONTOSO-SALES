import React from 'react';
import s from './agree.module.scss'

export default function AgreeWindow({ setActive, fun, title, text }) {
    return (
        <div onClick={() => setActive(false)} className={s.modal}>
            <div onClick={e => e.stopPropagation()} className={s.modal_content}>
                <div className={s.header}>
                    <h2>{title}</h2>
                </div>
                <h3>{text}</h3>
                <div className={s.buttons}>
                    <button className={s.btn} onClick={() => fun()}>Да</button>
                    <button className={s.btn} onClick={() => setActive(false)}>Нет</button>
                </div>
            </div>
        </div>
    );
}
