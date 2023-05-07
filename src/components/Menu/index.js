import s from './menu.module.scss';
import React from 'react';

export default function Menu({ page }) {
    const [user] = React.useState(JSON.parse(localStorage.getItem("user")));

    return (
        <div className={s.menu}>
            <a href='/account' style={{ textDecoration: 'none' }}>
                <div className={page === "account" ? s.choosenAccount : s.unchoosenAccount}>
                    <img className={s.photo} src={"..\\..\\images\\avatars\\" + user.image} alt="userImg" />
                    <div className={s.text}>
                        <h2>{user.firstName}</h2>
                        <p>{user.role}</p>
                    </div>
                    <img className={s.arrow} src='..\..\images\arrow.svg' alt="arrow" />
                </div>
            </a>
            {JSON.parse(localStorage.getItem("user")).role === "Менеджер отдела продаж" && <a href='/products' style={{ textDecoration: 'none' }}><div className={page === "products" ? s.choosen : s.unchoosen}><h2>Товары</h2></div></a>}
            {JSON.parse(localStorage.getItem("user")).role === "Менеджер отдела продаж" && <a href='/manager/requests' style={{ textDecoration: 'none' }}><div className={page === "manager-requests" ? s.choosen : s.unchoosen}><h2>Заявки</h2></div></a>}
            {JSON.parse(localStorage.getItem("user")).role === "Руководитель отдела продаж" && <a href='/admin/requests' style={{ textDecoration: 'none' }}><div className={page === "admin-requests" ? s.choosen : s.unchoosen}><h2>Заявки</h2></div></a>}
            {JSON.parse(localStorage.getItem("user")).role === "Менеджер отдела продаж" && <a href='/clients' style={{ textDecoration: 'none' }}><div className={page === "clients" ? s.choosen : s.unchoosen}><h2>Клиенты</h2></div></a>}
            {JSON.parse(localStorage.getItem("user")).role === "Менеджер отдела продаж" && <a href='/manager/orders' style={{ textDecoration: 'none' }}><div className={page === "manager-orders" ? s.choosen : s.unchoosen}><h2>Заказы</h2></div></a>}
            {JSON.parse(localStorage.getItem("user")).role === "Руководитель отдела продаж" && <a href='/admin/orders' style={{ textDecoration: 'none' }}><div className={page === "admin-orders" ? s.choosen : s.unchoosen}><h2>Заказы</h2></div></a>}
            {JSON.parse(localStorage.getItem("user")).role === "Руководитель отдела продаж" && <a href='/managers' style={{ textDecoration: 'none' }}><div className={page === "managers" ? s.choosen : s.unchoosen}><h2>Менеджеры</h2></div></a>}
            {JSON.parse(localStorage.getItem("user")).role === "Руководитель отдела продаж" && <a href='/admin/statistic' style={{ textDecoration: 'none' }}><div className={page === "statistic" ? s.choosen : s.unchoosen}><h2>Статистика</h2></div></a>}
        </div>
    );
}