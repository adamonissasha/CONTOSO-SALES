import React from 'react';
import s from './account.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

function Account({ user }) {
    return (
        <div>
            <Header />
            <div className={s.account}>
                <Menu />
                <div className={s.page}>
                    <div className={s.info}>
                        <img className={s.photo} src=".\images\photo_2023-03-13_16-07-07.jpg" alt="photo" />
                        <div className={s.text}>
                            <h2>Игнатович Илья</h2>
                            <h3>@ilych2002</h3>
                            <h3>+375291234567</h3>
                            <p>Менеджер отдела продаж</p>
                        </div>
                    </div>
                    <div className={s.password}>
                        <h2>Сменить пароль</h2>
                        <div className={s.fields}>
                            <div className={s.column}>
                                <p>Старый пароль</p>
                                <input className={s.inp}></input>
                                <p>Новый пароль</p>
                                <input className={s.inp}></input>
                            </div>
                            <div className={s.column}>
                                <p>Повторите новый пароль</p>
                                <input className={s.inp}></input>
                                <button className={s.but}>Сменить пароль</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;