import s from './clientCard.module.scss';
import React from 'react';
import NewClientCard from '../NewClientCard';
import AgreeWindow from '../../modalWindow/AgreeModalWindow';
import ClientService from '../../services/ClientService';

export default function ClientCard({ client, setSendMessageButtonActive }) {
    const [isUpdateClientButtonActive, setUpdateClientButtonActive] = React.useState(false);
    const [isAgreeWindowActive, setAgreeWindowActive] = React.useState(false);

    const onDelete = () => {
        ClientService.delete(client.id);
        setAgreeWindowActive(false);
    }

    return (
        <div className={s.fullCard}>
            <div className={s.card}>
                <h2 style={{ paddingLeft: "20px", width: "70px" }}>{client.id}</h2>
                <h2 style={{ width: "150px" }}>{client.name}</h2>
                <h2 style={{ width: "250px" }}>{client.email}</h2>
                <h2 style={{ width: "160px" }}>{client.phoneNumber}</h2>
                <h2 style={{ width: "300px" }}>{client.address}</h2>
                <h2 style={{ textAlign: "center", width: "40px" }}>3%</h2>
                <img onClick={() => setUpdateClientButtonActive(true)} className={s.edit} src=".\images\edit.png" alt="edit" />
                <img onClick={() => setSendMessageButtonActive(true)} className={s.send} src=".\images\letter.png" alt="send" />
                <img onClick={() => setAgreeWindowActive(true)} className={s.remove} src=".\images\remove.png" alt="delete" />
            </div>
            {
                isUpdateClientButtonActive &&
                <NewClientCard
                    label={"Редактирование клиента №" + client.id}
                    buttonName="Отредактировать"
                    setActive={setUpdateClientButtonActive}
                    client={client} />
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