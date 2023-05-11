import s from './clientCard.module.scss';
import React from 'react';
import NewClientCard from '../NewClientCard';
import AgreeWindow from '../../modalWindow/AgreeModalWindow';
import ClientService from '../../services/ClientService';
import SendMessageCard from '../SendMesageCard';

export default function ClientCard({ client }) {
    const [isUpdateClientButtonActive, setUpdateClientButtonActive] = React.useState(false);
    const [isAgreeWindowActive, setAgreeWindowActive] = React.useState(false);
    const [isSendMessageButtonActive, setSendMessageButtonActive] = React.useState(false);

    const onDelete = () => {
        ClientService.delete(client.id);
        setAgreeWindowActive(false);
        window.location.reload();
    }

    return (
        <div className={s.fullCard}>
            <div className={s.card}>
                <h2 style={{ textAlign: "center", width: "8%" }}>{client.id}</h2>
                <h2 style={{ textAlign: "center", width: "15%" }}>{client.name}</h2>
                <h2 style={{ textAlign: "center", width: "20%" }}>{client.email}</h2>
                <h2 style={{ textAlign: "center", width: "15%" }}>{client.phoneNumber}</h2>
                <h2 style={{ textAlign: "center", width: "20%" }}>{client.address}</h2>
                <h2 style={{ textAlign: "center", width: "10%" }}>{client.discount}%</h2>
                <div style={{ textAlign: "center", width: "10%", display: "flex", alignItems: "center" }}>
                    <img onClick={() => { setUpdateClientButtonActive(true); setSendMessageButtonActive(false) }} className={s.edit} src=".\images\edit.png" alt="edit" />
                    <img onClick={() => { setSendMessageButtonActive(true); setUpdateClientButtonActive(false) }} className={s.send} src=".\images\letter.png" alt="send" />
                    <img onClick={() => setAgreeWindowActive(true)} className={s.remove} src=".\images\remove.png" alt="delete" />
                </div>
            </div>
            {isUpdateClientButtonActive &&
                <NewClientCard
                    label={"Редактирование клиента №" + client.id}
                    buttonName="Отредактировать"
                    setActive={setUpdateClientButtonActive}
                    client={client} />
            }
            {isSendMessageButtonActive &&
                <SendMessageCard
                    label={"Отправка письма клиенту " + client.name}
                    setActive={setSendMessageButtonActive}
                    clientId={client.id} />
            }
            {isAgreeWindowActive &&
                <AgreeWindow
                    setActive={setAgreeWindowActive}
                    fun={onDelete}
                    title="Удаление клиента"
                    text="Вы действительно хотите удалить клиента?" />}
        </div>
    );
}