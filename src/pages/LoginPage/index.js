import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './login.module.scss';
import AuthService from '../../services/AuthService';
import Notification from '../../modalWindow/Notification';

function Login({ setUser }) {
    const [password, setPassword] = useState('admin');
    const [login, setLogin] = useState('admin');
    const navigate = useNavigate();
    const [isNotificationActive, setNotificationActive] = useState(false)
    const [notificationText, setNotificationText] = useState(false)
    const [title, setTitle] = useState(false)


    const onLogin = (e) => {
        e.preventDefault();
        const user = { login, password };
        AuthService.login(user)
            .then(({ data }) => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                navigate('/account')
            })
            .catch(function (error) {
                setNotificationText(error.response.data.message);
                setNotificationActive(true);
                setTitle("Ошибка")
            });;
    }

    return (
        <div className={s.content}>
            <h1>CONTOSO sales</h1>
            <form className={s.login_area} onSubmit={(e) => onLogin(e)}>
                <h2>Вход в аккаунт</h2>
                <div className={s.input}>
                    <p>Имя пользователя</p>
                    <input
                        value={login}
                        onChange={(obj) => setLogin(obj.target.value)}
                        className={s.inp}
                        required />
                </div>
                <div className={s.input}>
                    <p>Пароль</p>
                    <input
                        value={password}
                        onChange={(obj) => setPassword(obj.target.value)}
                        className={s.inp}
                        required
                        type='password'
                        id='password_input'
                        name='password' />
                </div>
                <button className={s.but}>Войти</button>
            </form>
            {isNotificationActive &&
                <Notification
                    title={title}
                    text={notificationText}
                    setActive={setNotificationActive} />}
        </div>
    )
}

export default Login;