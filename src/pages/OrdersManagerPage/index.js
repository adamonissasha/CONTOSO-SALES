import React, { useState } from 'react';
import s from './ordersManager.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import OrderService from '../../services/OrderService';
import OrderManagerCard from '../../components/OrderManagerCard';

export default function OrdersManagerPage() {
    const [orders, setOrders] = useState([]);

    React.useEffect(() => {
        OrderService.getAll()
            .then(({ data }) => {
                setOrders(data)
                console.log(data)
            });
    }, []);

    return (
        <div>
            <Header />
            <div className={s.products}>
                <Menu page="manager-orders" />
                {orders.length === 0 ?
                    <div className={s.page}>
                        <div className={s.no}><h2>В настоящее время нет оформленных заказов</h2></div>
                    </div> :
                    <div className={s.page}>
                        {orders
                            .map((order) => (
                                <OrderManagerCard
                                    key={order.id}
                                    order={order} />
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}