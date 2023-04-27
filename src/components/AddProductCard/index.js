import s from './addProductCard.module.scss';
import React from 'react';

export default function AddProductCard({ setActive, onCommit }) {
    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>Поставка товара</h2>
                <img onClick={() => setActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <form className={s.fields} onSubmit={() => onCommit()}>
                <div className={s.column}>
                    <p>Количество</p>
                    <input
                        className={s.inp}
                        required />
                </div>
                <div className={s.column}>
                    <button className={s.but}>Сохранить</button>
                </div>
            </form>
        </div>
    );
}