import React, { useState } from 'react';
import s from './products.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import ProductCard from '../../components/ProductCard';
import NewProductCard from '../../components/NewProductCard';
import ProductService from '../../services/ProductService';
import AgreeWindow from '../../modalWindow/AgreeModalWindow';

export default function ProductsPage() {
    const [isNewProductButtonActive, setNewProductButtonActive] = useState(false);
    const [products, setProducts] = useState([]);
    const [isAgreeWindowActive, setAgreeWindowActive] = useState(false);

    React.useEffect(() => {
        ProductService.getAll()
            .then(({ data }) => setProducts(data));
    }, []);

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
                            buttonName="Добавить" /> :
                        <button
                            className={s.addNew}
                            onClick={() => setNewProductButtonActive(true)}>
                            <img className={s.plus} src="./images/add.png" alt="add" />
                            <h2>Добавить новый товар</h2>
                        </button>
                    }
                    <div className={s.tableHeader}>
                        <h2 style={{ paddingLeft: "20px", width: "70px" }}>№</h2>
                        <h2 style={{ width: "475px" }}>Название</h2>
                        <h2 style={{ width: "100px" }}>Актикул</h2>
                        <h2 style={{ width: "120px" }}>В резерве, шт.</h2>
                        <h2 style={{ width: "120px" }}>Доступно, шт.</h2>
                        <h2 style={{ width: "120px" }}>Цена, руб.</h2>
                    </div>
                    {products
                        .map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                setDeleteWindowActive={setAgreeWindowActive} />
                        ))}
                    {isAgreeWindowActive &&
                        <AgreeWindow
                            setActive={setAgreeWindowActive}
                            fun=""
                            title="Удаление товара"
                            text="Вы действительно хотите удалить товар?" />}
                </div>
            </div>
        </div>
    )
}