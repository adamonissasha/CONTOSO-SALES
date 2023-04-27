import s from './newProductCard.module.scss';
import AuthService from '../../services/AuthService';
import React from 'react';

export default function NewProductCard({ setNewProductButtonActive, label, buttonName }) {
    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>{label}</h2>
                <img onClick={() => setNewProductButtonActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <form>
                <div className={s.fields}>
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
                        <p>Количество на складе, шт.</p>
                        <input
                            className={s.inp}
                            required />
                        <p>Цена, руб.</p>
                        <input
                            className={s.inp}
                            required
                            type='password' />
                    </div>
                </div>
                <button className={s.but}>{buttonName}</button>
            </form>
        </div>
    );
}