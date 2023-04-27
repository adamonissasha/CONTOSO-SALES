import React from 'react';
import s from './login.module.scss';

function Login() {
    return (
        <div className={s.content}>
            <h1>CONTOSO sales</h1>
            <div className={s.login_area}>
                <h2>Вход в аккаунт</h2>
                <div className={s.input}>
                    <p>Имя пользователя</p>
                    <input
                        className={s.inp}
                        required />
                </div>
                <div className={s.input}>
                    <p>Пароль</p>
                    <input
                        className={s.inp}
                        required
                        type='password'
                        id='password_input'
                        name='password' />
                </div>
                <button className={s.but}>Войти</button>
            </div>
        </div>
    )
}

export default Login;