import React, { useState } from 'react';
import s from './products.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import ProductCard from '../../components/ProductCard';
import NewProductCard from '../../components/NewProductCard';
import ProductService from '../../services/ProductService';
import Notification from '../../modalWindow/Notification';

export default function ProductsPage() {
    const [isNewProductButtonActive, setNewProductButtonActive] = useState(false);
    const [isNewDeliveryButtonActive, setNewDeliveryButtonActive] = useState(false);
    const [products, setProducts] = useState([]);
    const [findValue, setFindValue] = useState("");
    const [file, setFile] = useState(null);
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState(false);
    const [title, setTitle] = useState(false);

    React.useEffect(() => {
        ProductService.getAll()
            .then(({ data }) => setProducts(data));
    }, []);

    const filteredProducts = products.filter((product) =>
    (product.name.toLowerCase().includes(findValue) ||
        product.code.toString().toLowerCase().includes(findValue))
    );

    const onSendFile = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', file);
        ProductService.addProductAmountByFile(data)
            .then(() => {
                window.location.reload();
            })
            .catch(function (error) {
                setNotificationText(error.response.data.message);
                setNotificationActive(true);
                setTitle("Ошибка")
            });
    }

    return (
        <div>
            <Header />
            <div className={s.products}>
                <Menu page="products" />
                <div className={s.page}>
                    {isNewProductButtonActive ?
                        <NewProductCard
                            setActive={setNewProductButtonActive}
                            label="Добавление нового товара"
                            buttonName="Добавить"
                            product={{ id: 0, name: "", code: "", price: "" }} /> :
                        <button
                            className={s.addNew}
                            onClick={() => setNewProductButtonActive(true)}>
                            <img className={s.plus} src="./images/add.png" alt="add" />
                            <h2>Добавить новый товар</h2>
                        </button>
                    }
                    {isNewDeliveryButtonActive ?
                        <div className={s.card}>
                            <div className={s.header}>
                                <h2 className={s.label}>Новая поставка товаров</h2>
                                <img onClick={() => setNewDeliveryButtonActive(false)} src=".\images\delete.png" alt="close" />
                            </div>
                            <form className={s.fields} onSubmit={(e) => onSendFile(e)}>
                                <div className={s.column}>
                                    <p>Загрузите файл</p>
                                    <input
                                        onChange={(obj) => setFile(obj.target.files[0])}
                                        type='file'
                                        className={s.inp}
                                        required />
                                </div>
                                <div className={s.column}>
                                    <button className={s.but}>Добавить</button>
                                </div>
                            </form>
                        </div> :
                        <button
                            className={s.addNew}
                            onClick={() => setNewDeliveryButtonActive(true)}>
                            <img className={s.plus} src="./images/add.png" alt="add" />
                            <h2>Новая поставка товаров</h2>
                        </button>
                    }
                    <div className={s.search}>
                        <img src="../../images/search.png" alt="search" />
                        <h3>Поиск</h3>
                        <input className={s.inp} value={findValue} onChange={(obj) => setFindValue(obj.target.value.toLowerCase())}></input>
                    </div>
                    <div className={s.tableHeader}>
                        <h2 style={{ textAlign: "center", width: "8%" }}>№</h2>
                        <h2 style={{ textAlign: "center", width: "20%" }}>Название</h2>
                        <h2 style={{ textAlign: "center", width: "15%" }}>Артикул</h2>
                        <h2 style={{ textAlign: "center", width: "15%" }}>В резерве, шт.</h2>
                        <h2 style={{ textAlign: "center", width: "15%" }}>Доступно, шт.</h2>
                        <h2 style={{ textAlign: "center", width: "15%" }}>Цена, руб.</h2>
                        <div style={{ width: "10%" }}></div>
                    </div>
                    {filteredProducts
                        .map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product} />
                        ))}
                </div>
                {isNotificationActive &&
                    <Notification
                        title={title}
                        text={notificationText}
                        setActive={setNotificationActive} />}
            </div>
        </div>
    )
}