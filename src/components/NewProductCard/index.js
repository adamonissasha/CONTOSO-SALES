import s from './newProductCard.module.scss';
import React from 'react';

export default function NewProductCard({ setActive, label, buttonName, onCommit }) {
    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>{label}</h2>
                <img onClick={() => setActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <form className={s.fields} onSubmit={() => onCommit()}>
                <div className={s.column}>
                    <p>Название товара</p>
                    <input
                        className={s.inp}
                        required />
                    <p>Артикул</p>
                    <input
                        className={s.inp}
                        required />
                </div>
                <div className={s.column}>
                    <p>Цена, руб.</p>
                    <input
                        className={s.inp}
                        required />
                    <button className={s.but}>{buttonName}</button>
                </div>
            </form>
        </div>
    );
}