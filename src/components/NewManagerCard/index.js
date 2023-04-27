import s from './newManagerCard.module.scss';
import AuthService from '../../services/AuthService';
import React from 'react';

export default function NewManagerCard({ setNewManagerButtonActive }) {
    const [password, setPassword] = React.useState('admin');
    const [login, setLogin] = React.useState('Matthew@gmail.com');
    const [firstName, setFirstName] = React.useState('Matvei');
    const [lastName, setLastName] = React.useState('Stremous');
    const [phoneNumber, setPhoneNumber] = React.useState('+375331234567');

    const onRegistrate = (e) => {
        e.preventDefault();
        const user = { login, password, firstName, lastName, phoneNumber };
        AuthService.registrate(user);
    }

    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>Регистрация нового менеджера</h2>
                <img onClick={() => setNewManagerButtonActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <form className={s.fields} onSubmit={(e) => onRegistrate(e)}>
                <div className={s.photo}>
                    <img src=".\images\add-image.png" alt="add-img" />
                </div>
                <div className={s.column}>
                    <p>Имя</p>
                    <input value={firstName}
                        onChange={(obj) => setFirstName(obj.target.value)}
                        className={s.inp}
                        required />
                    <p>Фамилия</p>
                    <input value={lastName}
                        onChange={(obj) => setLastName(obj.target.value)}
                        className={s.inp}
                        required />
                    <p>Номер телефона</p>
                    <input value={phoneNumber}
                        onChange={(obj) => setPhoneNumber(obj.target.value)}
                        className={s.inp}
                        required />
                </div>
                <div className={s.column}>
                    <p>Логин</p>
                    <input value={login}
                        onChange={(obj) => setLogin(obj.target.value)}
                        className={s.inp}
                        required />
                    <p>Пароль</p>
                    <input value={password}
                        onChange={(obj) => setPassword(obj.target.value)}
                        className={s.inp}
                        required
                        type='password' />
                    <button className={s.but}><h2>Зарегистрировать</h2></button>
                </div>
            </form>
        </div>
    );
}