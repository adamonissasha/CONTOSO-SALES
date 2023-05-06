import React, { useState } from 'react';
import s from './ordersAdmin.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import OrderService from '../../services/OrderService';
import OrderAdminCard from '../../components/OrderAdminCard';

export default function OrdersAdminPage() {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    React.useEffect(() => {
        OrderService.getAll()
            .then(({ data }) => {
                setOrders(data);
            });
    }, []);

    const filteredOrders = orders.filter((order) =>
        (order.status === selectedStatus || selectedStatus === "") &&
        (order.dateOfCreate === selectedDate || selectedDate === "")
    );
    return (
        <div>
            <Header />
            <div className={s.products}>
                <Menu page="admin-orders" />
                {orders.length === 0 ?
                    <div className={s.page}>
                        <div className={s.no}><h2>В настоящее время нет оформленных заказов</h2></div>
                    </div> :
                    <div className={s.page}>
                        <select value={selectedStatus} onChange={(obj) => setSelectedStatus(obj.target.value)}>
                            <option value="">Все</option>
                            <option value="Отклонен">Отклонённые</option>
                            <option value="Оформлен">Оформленные</option>
                            <option value="Отменен">Отменённые</option>
                            <option value="Выполнен">Выполненные</option>
                        </select>
                        <input
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            type="date"
                            className={s.inp}
                            required />
                        {filteredOrders
                            .map((order) => (
                                <OrderAdminCard
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