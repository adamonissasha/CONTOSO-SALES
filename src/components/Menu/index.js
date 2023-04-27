import s from './menu.module.scss';

export default function Menu({ page }) {
    return (
        <div className={s.menu}>
            <a href='/account' style={{ textDecoration: 'none' }}>
                <div className={page === "account" ? s.choosenAccount : s.unchoosenAccount}>
                    <img className={s.photo} src=".\images\photo_2023-03-13_16-07-07.jpg" alt="photo" />
                    <div className={s.text}>
                        <h2>Илья</h2>
                        <p>Менеджер отдела продаж</p>
                    </div>
                    <img className={s.arrow} src='.\images\arrow.svg' />
                </div>
            </a>
            <a href='/products' style={{ textDecoration: 'none' }}><div className={page === "products" ? s.choosen : s.unchoosen}><h2>Товары</h2></div></a>
            <a href='/products' style={{ textDecoration: 'none' }}><div className={page === "requests" ? s.choosen : s.unchoosen}><h2>Заявки</h2></div></a>
            <a href='/clients' style={{ textDecoration: 'none' }}><div className={page === "clients" ? s.choosen : s.unchoosen}><h2>Клиенты</h2></div></a>
            <a href='/products' style={{ textDecoration: 'none' }}><div className={page === "orders" ? s.choosen : s.unchoosen}><h2>Заказы</h2></div></a>
            <a href='/managers' style={{ textDecoration: 'none' }}><div className={page === "managers" ? s.choosen : s.unchoosen}><h2>Менеджеры</h2></div></a>
        </div>
    );
}