import { useState } from 'react';
import s from './productCard.module.scss';
import NewProductCard from '../NewProductCard';

export default function ProductCard({ product }) {
    const [isUpdateProductButtonActive, setUpdateProductButtonActive] = useState(false);

    return (
        <div className={s.fullCard}>
            <div className={s.card}>
                <h2 style={{ paddingLeft: "20px", width: "70px" }}>{product.id}</h2>
                <h2 style={{ width: "480px" }}>{product.name}</h2>
                <h2 style={{ width: "120px" }}>{product.code}</h2>
                <h2 style={{ width: "120px" }}>{product.amount}</h2>
                <h2 style={{ width: "120px" }}>{product.reservedAmount}</h2>
                <h2 style={{ width: "120px" }}>{product.price}</h2>
                <img onClick={() => setUpdateProductButtonActive(true)} className={s.edit} src=".\images\edit.png" alt="edit" />
                <img className={s.remove} src=".\images\remove.png" alt="delete" />
            </div>
            {isUpdateProductButtonActive &&
                <NewProductCard
                    label="Редактирование товара №id"
                    buttonName="Отредактировать"
                    setActive={setUpdateProductButtonActive} />}
        </div>
    );
}