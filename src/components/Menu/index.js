import s from './menu.module.scss';
import React from 'react';

function Menu() {
    const [user] = React.useState(JSON.parse(localStorage.getItem("user")));

    return (
        <div className={s.menu}>
            <div className={s.account}>
                <img className={s.photo} src=".\images\photo_2023-03-13_16-07-07.jpg" alt="userImg" />
                <div className={s.text}>
                    <h2>{user.firstName}</h2>
                    <p>{user.role}</p>
                </div>
                <img className={s.arrow} src='.\images\arrow.svg' alt="arrow" />
            </div>
            <div className={s.row}>Товары</div>
            <div className={s.row}>Заявки</div>
            <div className={s.row}>Клиенты</div>
            <div className={s.row}>Заказы</div>
        </div>
    );
}

export default Menu;