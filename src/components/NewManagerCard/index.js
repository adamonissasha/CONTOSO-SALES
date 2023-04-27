import s from './newManagerCard.module.scss';

export default function NewManagerCard({ setNewManagerButtonActive }) {
    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>Регистрация нового менеджера</h2>
                <img onClick={() => setNewManagerButtonActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <div className={s.fields}>
                <div className={s.photo}>
                    <img src=".\images\add-image.png" alt="add-image" />
                </div>
                <div className={s.column}>
                    <p>Имя</p>
                    <input className={s.inp}></input>
                    <p>Фамилия</p>
                    <input className={s.inp}></input>
                    <p>Номер телефона</p>
                    <input className={s.inp}></input>
                </div>
                <div className={s.column}>
                    <p>Логин</p>
                    <input className={s.inp}></input>
                    <p>Пароль</p>
                    <input className={s.inp}></input>
                    <button className={s.but}><h2>Зарегистрировать</h2></button>
                </div>
            </div>
        </div>
    );
}