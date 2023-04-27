import React, { useState } from 'react';
import s from './clients.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import NewClientCard from '../../components/NewClientCard';
import ClientCard from '../../components/ClientCard'
import AgreeWindow from '../../modalWindow/AgreeModalWindow';

export default function ClientsPage() {
    const [isNewClientButtonActive, setNewClientButtonActive] = useState(false);
    const [isUpdateClientButtonActive, setUpdateClientButtonActive] = useState(false);
    const [isAgreeWindowActive, setAgreeWindowActive] = useState(false);

    return (
        <div>
            <Header />
            <div className={s.products}>
                <Menu />
                <div className={s.page}>
                    {isNewClientButtonActive ?
                        <NewClientCard
                            setActive={setNewClientButtonActive}
                            label="Добавление нового клиента"
                            buttonName="Добавить" /> :
                        <button
                            className={s.addNew}
                            onClick={() => setNewClientButtonActive(true)}>
                            <img className={s.plus} src="./images/add.png" alt="add" />
                            <h2>Добавить нового клиента</h2>
                        </button>
                    }
                    <div className={s.tableHeader}>
                        <h2 style={{ paddingLeft: "20px", width: "70px" }}>№</h2>
                        <h2 style={{ textAlign: "center", width: "120px" }}>Имя</h2>
                        <h2 style={{ textAlign: "center", width: "250px" }}>Почта</h2>
                        <h2 style={{ textAlign: "center", width: "150px" }}>Номер телефона</h2>
                        <h2 style={{ textAlign: "center", width: "300px" }}>Адрес</h2>
                        <h2 style={{ textAlign: "center", width: "120px" }}>Скидка</h2>
                    </div>
                    <ClientCard setUpdateClientButtonActive={setUpdateClientButtonActive}
                        setDeleteWindowActive={setAgreeWindowActive} />
                    {isUpdateClientButtonActive &&
                        <NewClientCard
                            style={{}}
                            label="Редактирование клиента №id"
                            buttonName="Отредактировать"
                            setActive={setUpdateClientButtonActive}
                        />}
                    {isAgreeWindowActive &&
                        <AgreeWindow
                            setActive={setAgreeWindowActive}
                            fun=""
                            title="Удаление клиента"
                            text="Вы действительно хотите удалить клиента?" />}
                </div>
            </div>
        </div>
    )
}