import React, { useState } from 'react';
import s from './ordersManager.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import OrderService from '../../services/OrderService';
import OrderManagerCard from '../../components/OrderManagerCard';

export default function OrdersManagerPage() {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [findValue, setFindValue] = useState("");

    React.useEffect(() => {
        OrderService.getAll()
            .then(({ data }) => {
                setOrders(data);
            });
    }, []);

    const filteredOrders = orders.filter((order) =>
        (order.status === selectedStatus || selectedStatus === "") &&
        (order.dateOfCreate === selectedDate || selectedDate === "") &&
        (order.id.toString().toLowerCase().includes(findValue) ||
            order.clientEmail.toLowerCase().includes(findValue))
    );

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
                        <input className={s.inp} value={findValue} onChange={(obj) => setFindValue(obj.target.value.toLowerCase())}></input>
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