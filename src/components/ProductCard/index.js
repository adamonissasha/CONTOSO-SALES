import { useState } from 'react';
import s from './productCard.module.scss';
import NewProductCard from '../NewProductCard';
import AddProductCard from '../AddProductCard';
import ProductService from '../../services/ProductService';
import AgreeWindow from '../../modalWindow/AgreeModalWindow';

export default function ProductCard({ product }) {
    const [isUpdateProductButtonActive, setUpdateProductButtonActive] = useState(false);
    const [isAddProductsButtonActive, setAddProductsButtonActive] = useState(false);
    const [isAgreeWindowActive, setAgreeWindowActive] = useState(false);

    const onDelete = () => {
        ProductService.delete(product.id);
        setAgreeWindowActive(false);
        window.location.reload();
    }

    return (
        <div className={s.fullCard}>
            <div className={s.card}>
                <h2 style={{ textAlign: "center", width: "8%" }}>{product.id}</h2>
                <h2 style={{ textAlign: "center", width: "20%" }}>{product.name}</h2>
                <h2 style={{ textAlign: "center", width: "15%" }}>{product.code}</h2>
                <h2 style={{ textAlign: "center", width: "15%" }}>{product.reservedAmount}</h2>
                <h2 style={{ textAlign: "center", width: "15%" }}>{product.amount}</h2>
                <h2 style={{ textAlign: "center", width: "15%" }}>{product.price}</h2>
                <img onClick={() => setAddProductsButtonActive(true)} className={s.edit} src=".\images\add.png" alt="edit" />
                <img onClick={() => setUpdateProductButtonActive(true)} className={s.edit} src=".\images\edit.png" alt="edit" />
                <img onClick={() => setAgreeWindowActive(true)} className={s.remove} src=".\images\remove.png" alt="delete" />
            </div>
            {
                isUpdateProductButtonActive &&
                <NewProductCard
                    label={"Редактирование товара №" + product.id}
                    buttonName="Отредактировать"
                    setActive={setUpdateProductButtonActive}
                    product={product} />
            }
            {
                isAddProductsButtonActive &&
                <AddProductCard
                    setActive={setAddProductsButtonActive}
                    productId={product.id} />
            }
            {isAgreeWindowActive &&
                <AgreeWindow
                    setActive={setAgreeWindowActive}
                    fun={onDelete}
                    title="Удаление товара"
                    text="Вы действительно хотите удалить товар?" />}
        </div>
    );
}