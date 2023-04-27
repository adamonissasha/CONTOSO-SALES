import s from './menu.module.scss';

function Menu() {
    return (
        <div className={s.menu}>
            <div className={s.account}>
                <img className={s.photo} src=".\images\photo_2023-03-13_16-07-07.jpg" alt="photo" />
                <div className={s.text}>
                    <h2>Илья</h2>
                    <p>Менеджер отдела продаж</p>
                </div>
                <img className={s.arrow} src='.\images\arrow.svg' />
            </div>
            <div className={s.row}>Товары</div>
            <div className={s.row}>Заявки</div>
            <div className={s.row}>Клиенты</div>
            <div className={s.row}>Заказы</div>
        </div>
    );
}

export default Menu;