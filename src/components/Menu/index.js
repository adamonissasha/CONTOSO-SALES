import s from './menu.module.scss';
import React from 'react';

export default function Menu({ page }) {
    const [user] = React.useState(JSON.parse(localStorage.getItem("user")));

    return (
        <div className={s.menu}>
            <a href='/account' style={{ textDecoration: 'none' }}>
                <div className={page === "account" ? s.choosenAccount : s.unchoosenAccount}>
                    <img className={s.photo} src="..\..\images\photo_2023-03-13_16-07-07.jpg" alt="userImg" />
                    <div className={s.text}>
                        <h2>{user.firstName}</h2>
                        <p>{user.role}</p>
                    </div>
                    <img className={s.arrow} src='..\..\images\arrow.svg' alt="arrow" />
                </div>
            </a>
            <a href='/products' style={{ textDecoration: 'none' }}><div className={page === "products" ? s.choosen : s.unchoosen}><h2>Товары</h2></div></a>
            <a href='/manager/requests' style={{ textDecoration: 'none' }}><div className={page === "manager-requests" ? s.choosen : s.unchoosen}><h2>Заявки MANAGER</h2></div></a>
            <a href='/manager/requests' style={{ textDecoration: 'none' }}><div className={page === "admin-requests" ? s.choosen : s.unchoosen}><h2>Заявки ADMIN</h2></div></a>
            <a href='/clients' style={{ textDecoration: 'none' }}><div className={page === "clients" ? s.choosen : s.unchoosen}><h2>Клиенты</h2></div></a>
            <a href='/products' style={{ textDecoration: 'none' }}><div className={page === "orders" ? s.choosen : s.unchoosen}><h2>Заказы</h2></div></a>
            <a href='/managers' style={{ textDecoration: 'none' }}><div className={page === "managers" ? s.choosen : s.unchoosen}><h2>Менеджеры ADMIN</h2></div></a>
        </div>
    );
}