import s from './clientCard.module.scss';
import React from 'react';
import NewClientCard from '../NewClientCard';

export default function ClientCard({ client, setSendMessageButtonActive }) {
    const [isUpdateClientButtonActive, setUpdateClientButtonActive] = React.useState(false);

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
                <img className={s.remove} src=".\images\remove.png" alt="delete" />
            </div>
            {
                isUpdateClientButtonActive &&
                <NewClientCard
                    label={"Редактирование клиента №" + client.id}
                    buttonName="Отредактировать"
                    setActive={setUpdateClientButtonActive}
                    client={client} />

            }
        </div>
    );
}