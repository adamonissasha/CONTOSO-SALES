import React, { useState } from 'react';
import s from './managers.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import ManagerCard from '../../components/ManagerCard';
import NewManagerCard from '../../components/NewManagerCard';

function ManagersPage() {
    const [isNewManagerButtonActive, setNewManagerButtonActive] = useState(false);

    return (
        <div>
            <Header />
            <div className={s.managers}>
                <Menu />
                <div className={s.page}>
                    {console.log(isNewManagerButtonActive)}
                    {isNewManagerButtonActive ?
                        <NewManagerCard setNewManagerButtonActive={setNewManagerButtonActive} /> :
                        <button
                            className={s.addNew}
                            onClick={() => setNewManagerButtonActive(true)}>
                            <img className={s.plus} src="./images/add.png" alt="add" />
                            <h2>Зарегистрировать нового менеджера</h2>
                        </button>
                    }
                    <div className={s.cards}>
                        <ManagerCard />
                        <ManagerCard />
                        <ManagerCard />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagersPage;