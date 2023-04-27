import React, { useState } from 'react';
import s from './clients.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import NewClientCard from '../../components/NewClientCard';
import ClientCard from '../../components/ClientCard';
import ClientService from '../../services/ClientService';

export default function ClientsPage() {
    const [isNewClientButtonActive, setNewClientButtonActive] = useState(false);
    const [clients, setClients] = useState([]);

    React.useEffect(() => {
        ClientService.getAll()
            .then(({ data }) => setClients(data));
    }, []);

    return (
        <div>
            <Header />
            <div className={s.products}>
                <Menu page="clients" />
                <div className={s.page}>
                    {isNewClientButtonActive ?
                        <NewClientCard
                            setActive={setNewClientButtonActive}
                            label="Добавление нового клиента"
                            buttonName="Добавить"
                            client={{ id: 0, name: "", email: "", phoneNumber: "", address: "" }} /> :
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
                    {clients
                        .map((client) => (
                            <ClientCard
                                key={client.id}
                                client={client} />
                        ))}
                </div>
            </div>
        </div>
    )
}