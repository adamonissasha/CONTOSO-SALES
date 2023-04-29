import s from './newProductCard.module.scss';
import { useState } from 'react';
import ProductService from '../../services/ProductService';
import Notification from '../../modalWindow/Notification';

export default function NewProductCard({ product, setActive, label, buttonName }) {
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const [title, setTitle] = useState("");
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [code, setCode] = useState(product.code);

    const onCommit = (e) => {
        e.preventDefault();
        if (product.id === 0) {
            ProductService.addNew({ name, code, price })
                .then(() => window.location.reload())
                .catch(function (error) {
                    setNotificationText(error.response.data.message);
                    setNotificationActive(true);
                    setTitle("Ошибка")
                });
        } else {
            ProductService.update(product.id, { name, code, price, amount: product.amount, reservedAmount: product.reservedAmount })
                .then(() => window.location.reload())
                .catch(function (error) {
                    setNotificationText(error.response.data.message);
                    setNotificationActive(true);
                    setTitle("Ошибка")
                });
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
            {isNotificationActive &&
                <Notification
                    title={title}
                    text={notificationText}
                    setActive={setNotificationActive} />}
        </div>
    );
}