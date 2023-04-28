import s from './newProductCard.module.scss';
import React from 'react';
import ProductService from '../../services/ProductService';

export default function NewProductCard({ product, setActive, label, buttonName }) {
    const [name, setName] = React.useState(product.name);
    const [price, setPrice] = React.useState(product.price);
    const [code, setCode] = React.useState(product.code);

    const onCommit = (e) => {
        e.preventDefault();
        if (product.id === 0) {
            ProductService.addNew({ name, code, price });
            window.location.reload();
        } else {
            ProductService.update(product.id, { name, code, price, amount: product.amount, reservedAmount: product.reservedAmount });
            window.location.reload();
        }
    }

    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>{label}</h2>
                <img onClick={() => setActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <form className={s.fields} onSubmit={(e) => onCommit(e)}>
                <div className={s.column}>
                    <p>Название товара</p>
                    <input value={name}
                        onChange={(obj) => setName(obj.target.value)}
                        className={s.inp}
                        required />
                    <p>Артикул</p>
                    <input value={code}
                        onChange={(obj) => setCode(obj.target.value)}
                        className={s.inp}
                        required />
                </div>
                <div className={s.column}>
                    <p>Цена, руб.</p>
                    <input value={price}
                        onChange={(obj) => setPrice(obj.target.value)}
                        className={s.inp}
                        required />
                    <button className={s.but}>{buttonName}</button>
                </div>
            </form>
        </div>
    );
}