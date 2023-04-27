import React from 'react';
import s from './account.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import AuthService from '../../services/AuthService';

function Account({ currentUser }) {
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [newPassword2, setNewPassword2] = React.useState('');

    const onChangePassword = (e) => {
        e.preventDefault();
        if (newPassword === newPassword2) {
            const user = { userId: currentUser.id, oldPassword, newPassword };
            AuthService.changePassword(user);
        }
    }
    return (
        <div>
            <Header />
            <div className={s.account}>
                <Menu page="account" />
                <div className={s.page}>
                    <div className={s.info}>
                        <img className={s.photo} src=".\images\photo_2023-03-13_16-07-07.jpg" alt="userImg" />
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
            </div>
        </div>
    )
}

export default Account;