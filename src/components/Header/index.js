import s from './header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AgreeWindow from '../../modalWindow/AgreeModalWindow';

function Header() {
    const [isAgreeWindowActive, setAgreeWindowActive] = useState(false);
    const navigate = useNavigate();

    const exit = () => {
        localStorage.removeItem("user")
        setAgreeWindowActive(false)
        navigate("/")
    }

    return (
        <div className={s.header}>
            <div className={s.label}>CONTOSO sales</div>
            {localStorage.getItem('user') &&
                <button onClick={() => setAgreeWindowActive(true)}><h2>Выйти</h2></button>}
            {isAgreeWindowActive &&
                <AgreeWindow
                    setActive={setAgreeWindowActive}
                    fun={exit}
                    title="Выход из аккаунта"
                    text="Вы уверены, что хотите выйти из аккаунта?" />}
        </div >
    );
}

export default Header;