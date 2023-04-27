import { useState } from 'react';
import s from './productCard.module.scss';
import NewProductCard from '../NewProductCard';
import AddProductCard from '../AddProductCard';

export default function ProductCard({ product, setDeleteWindowActive }) {
    const [isUpdateProductButtonActive, setUpdateProductButtonActive] = useState(false);
    const [isAddProductsButtonActive, setAddProductsButtonActive] = useState(false);

    return (
        <div className={s.fullCard}>
            <div className={s.card}>
                <h2 style={{ paddingLeft: "20px", width: "70px" }}>{product.id}</h2>
                <h2 style={{ width: "480px" }}>{product.name}</h2>
                <h2 style={{ width: "120px" }}>{product.code}</h2>
                <h2 style={{ width: "120px" }}>{product.amount}</h2>
                <h2 style={{ width: "120px" }}>{product.reservedAmount}</h2>
                <h2 style={{ width: "120px" }}>{product.price}</h2>
                <img onClick={() => setAddProductsButtonActive(true)} className={s.edit} src=".\images\add.png" alt="edit" />
                <img onClick={() => setUpdateProductButtonActive(true)} className={s.edit} src=".\images\edit.png" alt="edit" />
                <img onClick={() => setDeleteWindowActive(true)} className={s.remove} src=".\images\remove.png" alt="delete" />
            </div>
            {isAddProductsButtonActive &&
                <AddProductCard
                    setActive={setAddProductsButtonActive} />
            }
            {isUpdateProductButtonActive &&
                <NewProductCard
                    label="Редактирование товара №id"
                    buttonName="Отредактировать"
                    setActive={setUpdateProductButtonActive} />}
        </div>
    );
}