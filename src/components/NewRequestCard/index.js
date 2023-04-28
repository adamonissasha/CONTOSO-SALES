import s from './newRequestCard.module.scss';
import { useState, useEffect } from 'react';
import Notification from '../../modalWindow/Notification';
import ClientService from '../../services/ClientService';
import ProductService from '../../services/ProductService';
import RequestService from '../../services/RequestService';

export default function NewRequestCard({ setActive }) {
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const [title, setTitle] = useState("");
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [requestProducts, setRequestProducts] = useState([{ product: JSON.stringify({}), amount: 1 }])
    const [clientId, setClientId] = useState(0);
    const [userId] = useState(JSON.parse(localStorage.getItem("user")).id);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [note, setNote] = useState("");

    const handleAddProduct = () => {
        setRequestProducts([...requestProducts, { product: JSON.stringify({}), amount: 1 }]);
    };

    const handleProductChange = (index, event) => {
        const newProducts = [...requestProducts];
        newProducts[index][event.target.name] = event.target.value;
        setRequestProducts(newProducts);
    };

    const deleteProductFromRequest = (index) => {
        if (requestProducts.length === 1) {
            setTitle("Ошибка");
            setNotificationText("Вы не можете оставить заявку без товаров!");
            setNotificationActive(true);
        } else {
            const newProducts = [...requestProducts];
            newProducts.splice(index, 1);
            setRequestProducts(newProducts);
        }
    };

    const getTotalSum = () => {
        var sum = 0;
        for (var i = 0; i < requestProducts.length; i++) {
            if (requestProducts[i].product !== JSON.stringify({})) {
                sum += requestProducts[i].amount * JSON.parse(requestProducts[i].product).price;
            }
        }
        return sum;
    };

    const onAddNewRequest = (e) => {
        e.preventDefault();
        if (clientId === 0) {
            setTitle("Ошибка");
            setNotificationText("Вы не можете оставить заявку без заказчика!");
            setNotificationActive(true);
        } else {
            const requestLists = requestProducts.map(req => ({
                productId: JSON.parse(req.product).id,
                amount: req.amount
            }));
            RequestService.addNew({ clientId, userId, date: date.split("-").reverse().join("."), note, requestLists }).then(() => {
                window.location.reload();
            }).catch(function (error) {
                setNotificationText(error.response.data.message);
                setNotificationActive(true);
                setTitle("Ошибка")
            });
        };
    }

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
                        <p>Заказчик</p>
                        <select
                            onChange={(e) => setClientId(e.target.value)}
                            className={s.sel}>
                            <option value="0">Выберите заказчика</option>
                            {clients.map((client) =>
                                <option value={client.id} >{client.email}</option>
                            )}
                        </select>
                        <p>Продукты</p>
                    </div>
                    <div className={s.column}>
                        <p>Дата доставки</p>
                        <input
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                            className={s.inp}
                            required />
                        <p>Количество</p>
                    </div>
                </div>
                {requestProducts.map((reqProduct, index) => (
                    <div key={index} className={s.fields}>
                        <div className={s.product}>
                            <select
                                className={s.selProduct}
                                name="product"
                                onChange={(event) => handleProductChange(index, event)}>
                                <option value={JSON.stringify({})}>Выберите продукт</option>
                                {products.map((product) => {
                                    return <option value={JSON.stringify(product)}>{product.name}</option>
                                })}
                            </select>
                            <h2>Цена за шт: </h2>
                            <h3>{reqProduct.product === JSON.stringify({}) ? 0 : JSON.parse(reqProduct.product).price} руб.</h3>
                        </div>
                        <div className={s.amount}>
                            <input
                                className={s.inpAmount}
                                type="number"
                                name="amount"
                                min={1}
                                required
                                value={reqProduct.amount}
                                onChange={(event) => handleProductChange(index, event)} />
                            <h2>Итоговая цена: </h2>
                            <h3>{reqProduct.product === JSON.stringify({}) ? 0 : JSON.parse(reqProduct.product).price * reqProduct.amount} руб.</h3>
                            <img onClick={() => deleteProductFromRequest(index)} className={s.remove} src="../../images/remove.png" alt="remove" />
                        </div>
                    </div>
                ))}
                <div className={s.bott}>
                    <div className={s.col}>
                        <p>Примечание</p>
                        <input value={note} onChange={(e) => setNote(e.target.value)} className={s.inp} />
                        <div className={s.sum}>
                            <h2>Итоговая сумма: </h2><h3>{getTotalSum()} руб.</h3>
                        </div>
                    </div>
                    <div className={s.col}>
                        <button type='button' className={s.but} onClick={handleAddProduct}>Добавить товар</button>
                        <button className={s.but} onClick={(e) => onAddNewRequest(e)}>Оформить</button>
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