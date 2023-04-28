import s from './newManagerCard.module.scss';
import ManagerService from '../../services/ManagerService';
import React from 'react';
import Notification from '../../modalWindow/Notification';

export default function NewManagerCard({ setNewManagerButtonActive }) {
    const [password, setPassword] = React.useState('admin');
    const [login, setLogin] = React.useState('Matthew@gmail.com');
    const [firstName, setFirstName] = React.useState('Matvei');
    const [lastName, setLastName] = React.useState('Stremous');
    const [phoneNumber, setPhoneNumber] = React.useState('+375331234567');
    const [imageUrl, setImageUrl] = React.useState((Math.floor(Math.random() * 18) + 1) + ".png");
    const [isNotificationActive, setNotificationActive] = React.useState(false);
    const [notificationText, setNotificationText] = React.useState("");
    const [title, setTitle] = React.useState("");

    const onRegistrate = (e) => {
        e.preventDefault();
        const user = { login, password, firstName, lastName, phoneNumber, image: imageUrl };
        ManagerService.registrate(user)
            .then(() => {
                window.location.reload();
            })
            .catch(function (error) {
                if (error.response.status === 404) {
                    setNotificationText(error.response.data.message);
                    setNotificationActive(true);
                    setTitle("Ошибка")
                }
            });
    }

    const onChangePhoto = () => {
        setImageUrl((Math.floor(Math.random() * 18) + 1) + ".png");
    }

    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>Регистрация нового менеджера</h2>
                <img onClick={() => setNewManagerButtonActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <form className={s.fields} onSubmit={(e) => onRegistrate(e)}>
                <div className={s.photo}>
                    <img onClick={() => onChangePhoto()} src={".\\images\\avatars\\" + imageUrl} alt="add-img" />
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
            {isNotificationActive &&
                <Notification
                    title={title}
                    text={notificationText}
                    setActive={setNotificationActive} />}
        </div>
    );
}