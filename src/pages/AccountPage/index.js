import { useState } from 'react';
import s from './account.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import AuthService from '../../services/AuthService';
import Notification from '../../modalWindow/Notification';

function Account({ currentUser }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const [title, setTitle] = useState("");

    const onChangePassword = (e) => {
        e.preventDefault();
        if (newPassword === newPassword2) {
            const user = { userId: currentUser.id, oldPassword, newPassword };
            AuthService.changePassword(user)
                .then(response => {
                    setNotificationText(response.data);
                    setNotificationActive(true);
                    setTitle("Уведомление")
                })
                .catch(function (error) {
                    if (error.response.status === 400) {
                        setNotificationText(error.response.data.message);
                        setNotificationActive(true);
                        setTitle("Ошибка")
                    }
                });
        } else {
            setNotificationText("Пароли не совпадают!");
            setNotificationActive(true);
            setTitle("Ошибка")
        }
    }

    return (
        <div>
            <Header />
            <div className={s.account}>
                <Menu page="account" />
                <div className={s.page}>
                    <div className={s.info}>
                        <img className={s.photo} src={".\\images\\avatars\\" + currentUser.image} alt="userImg" />
                        <div className={s.text}>
                            <h2>{currentUser.lastName} {currentUser.firstName}</h2>
                            <h3>{currentUser.login}</h3>
                            <h3>{currentUser.phoneNumber}</h3>
                            <p>{currentUser.role}</p>
                        </div>
                    </div>
                    <div className={s.password}>
                        <h2>Сменить пароль</h2>
                        <form className={s.fields} onSubmit={(e) => onChangePassword(e)}>
                            <div className={s.column}>
                                <p>Старый пароль</p>
                                <input value={oldPassword}
                                    onChange={(obj) => setOldPassword(obj.target.value)}
                                    className={s.inp}
                                    required
                                    type='password' />
                                <p>Новый пароль</p>
                                <input value={newPassword}
                                    onChange={(obj) => setNewPassword(obj.target.value)}
                                    className={s.inp}
                                    required
                                    type='password' />
                            </div>
                            <div className={s.column}>
                                <p>Повторите новый пароль</p>
                                <input value={newPassword2}
                                    onChange={(obj) => setNewPassword2(obj.target.value)}
                                    className={s.inp}
                                    required
                                    type='password' />
                                <button className={s.but}>Сменить пароль</button>
                            </div>
                        </form>
                    </div>
                </div>
                {isNotificationActive &&
                    <Notification
                        title={title}
                        text={notificationText}
                        setActive={setNotificationActive} />}
            </div>
        </div>
    )
}

export default Account;