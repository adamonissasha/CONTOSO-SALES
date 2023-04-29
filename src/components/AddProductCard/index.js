import s from './addProductCard.module.scss';
import React from 'react';
import ProductService from '../../services/ProductService';

export default function AddProductCard({ productId, setActive }) {
    const [amount, setAmount] = React.useState(1);

    const onAdd = (e) => {
        e.preventDefault();
        ProductService.addProductAmount({ productId, amount });
        window.location.reload();
    }

    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>Поставка товара</h2>
                <img onClick={() => setActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <form className={s.fields} onSubmit={(e) => onAdd(e)}>
                <div className={s.column}>
                    <p>Количество</p>
                    <input value={amount}
                        type='number'
                        min={1}
                        onChange={(obj) => setAmount(obj.target.value)}
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