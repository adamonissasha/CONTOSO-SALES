import s from './newRequestCard.module.scss';
import { useState, useEffect } from 'react';
import Notification from '../../modalWindow/Notification';
import ClientService from '../../services/ClientService';
import ProductService from '../../services/ProductService';

export default function NewRequestCard({ setActive }) {
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const [title, setTitle] = useState("");
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [requestProducts, setRequestProducts] = useState([{ name: "", amount: "" }])

    const handleAddProduct = () => {
        setRequestProducts([...requestProducts, { name: "", amount: "" }]);
    };

    const handleProductChange = (index, event) => {
        const newProducts = [...requestProducts];
        newProducts[index][event.target.name] = event.target.value;
        setRequestProducts(newProducts);
        console.log(requestProducts)
    };

    useEffect(() => {
        ClientService.getAll()
            .then(({ data }) => setClients(data));
        ProductService.getAll()
            .then(({ data }) => setProducts(data));
    }, []);

    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>Добавить новую заявку</h2>
                <img onClick={() => setActive(false)} src="..\..\images\delete.png" alt="close" />
            </div>
            <form>
                <div className={s.fields}>
                    <div className={s.column}>
                        <p>Имя</p>
                        <select className={s.sel}>
                            {clients.map((client) =>
                                <option>{client.name}</option>
                            )}
                        </select>
                        <p>Продукты</p>
                    </div>
                    <div className={s.column}>
                        <p>Дата доставки</p>
                        <input
                            type="date"
                            className={s.inp}
                            required />
                        <p>Количество</p>
                    </div>
                </div>
                {requestProducts.map((product, index) => (
                    <div key={index} className={s.fields}>
                        <div className={s.product}>
                            <select
                                className={s.selProduct}
                                value={product.name}
                                name="name"
                                onChange={(event) => handleProductChange(index, event)}>
                                <option value="">Выберите продукт</option>
                                {products.map((product) => {
                                    return <option value={product.name}>{product.name}</option>
                                })}
                            </select>
                            <h2>Цена за шт: </h2>
                            <h3>10 руб.</h3>
                        </div>
                        <div className={s.amount}>
                            <input
                                className={s.inpAmount}
                                type="amount"
                                name="amount"
                                required
                                value={product.number}
                                onChange={(event) => handleProductChange(index, event)} />
                            <h2>Итоговая цена: </h2>
                            <h3>10 руб.</h3>
                            <img className={s.remove} src="../../images/remove.png" alt="remove" />
                        </div>

                    </div>
                ))}
                <div className={s.bott}>
                    <div className={s.col}>
                        <p>Примечание</p>
                        <input className={s.inp} />
                        <div className={s.sum}>
                            <h2>Итоговая сумма: </h2><h3>150 бел.руб.</h3>
                        </div>
                    </div>
                    <div className={s.col}>
                        <button className={s.but} onClick={handleAddProduct}>Добавить товар</button>
                        <button className={s.but}>Оформить</button>
                    </div>
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