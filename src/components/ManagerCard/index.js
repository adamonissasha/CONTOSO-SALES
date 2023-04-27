import s from './managerCard.module.scss';

export default function ManagerCard() {
    return (
        <div className={s.card}>
            <img className={s.photo} src=".\images\photo_2023-03-13_16-07-07.jpg" alt="user" />
            <div className={s.text}>
                <h2>Игнатович Илья</h2>
                <h3>@ilych2002</h3>
                <h3>+375291234567</h3>
                <p>Менеджер отдела продаж</p>
            </div>
            <img className={s.delete} src=".\images\delete.png" alt="delete" />
        </div>
    );
}