import React, { useState } from 'react';
import s from './clients.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import NewClientCard from '../../components/NewClientCard';
import ClientCard from '../../components/ClientCard';
import ClientService from '../../services/ClientService';
import SendMessageCard from '../../components/SendMesageCard';

export default function ClientsPage() {
    const [isNewClientButtonActive, setNewClientButtonActive] = useState(false);
    const [isSendMessageButtonActive, setSendMessageButtonActive] = useState(false);
    const [clients, setClients] = useState([]);
    const [findValue, setFindValue] = useState("");

    React.useEffect(() => {
        ClientService.getAll()
            .then(({ data }) => setClients(data));
    }, []);

    const filteredClients = clients.filter((client) =>
    (client.name.toLowerCase().includes(findValue) ||
        client.email.toLowerCase().includes(findValue) ||
        client.phoneNumber.toLowerCase().includes(findValue))
    );

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
                    {isSendMessageButtonActive ?
                        <SendMessageCard
                            label="Рассылка предложений клиентам"
                            setActive={setSendMessageButtonActive}
                            clientId={0} /> :
                        <button
                            className={s.sendMessage}
                            onClick={() => setSendMessageButtonActive(true)}>
                            <img className={s.send} src="./images/letter.png" alt="send" />
                            <h2>Рассылка предложений клиентам</h2>
                        </button>
                    }
                    <input value={findValue} onChange={(obj) => setFindValue(obj.target.value.toLowerCase())}></input>
                    <div className={s.tableHeader}>
                        <h2 style={{ textAlign: "center", width: "8%" }}>№</h2>
                        <h2 style={{ textAlign: "center", width: "15%" }}>Имя</h2>
                        <h2 style={{ textAlign: "center", width: "20%" }}>Почта</h2>
                        <h2 style={{ textAlign: "center", width: "15%" }}>Номер телефона</h2>
                        <h2 style={{ textAlign: "center", width: "20%" }}>Адрес</h2>
                        <h2 style={{ textAlign: "center", width: "10% " }}>Скидка</h2>
                        <h2 style={{ textAlign: "center", width: "10% " }}> </h2>
                    </div>
                    {filteredClients
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