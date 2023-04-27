import React from 'react';
import s from './login.module.scss';
import AuthService from '../../services/AuthService';

function Login({ setUser }) {
    const [password, setPassword] = React.useState('admin');
    const [login, setLogin] = React.useState('admin');

    const onLogin = (e) => {
        e.preventDefault();
        const user = { login, password };
        AuthService.login(user)
            .then(({ data }) => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            });
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
        </div>
    )
}

export default Login;