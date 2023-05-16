import s from './sendMessageCard.module.scss';
import React from 'react';
import ClientService from '../../services/ClientService';

export default function SendMessageCard({ clientId, setActive, label }) {
    const [subject, setSubject] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [message, setMessage] = React.useState("");

    const onSend = (e) => {
        e.preventDefault();
        const messageRequest = new Blob([JSON.stringify({ subject, message })], { type: 'application/json' });
        const data = new FormData();
        data.append('file', file);
        data.append('messageRequest', messageRequest);
        if (clientId === 0) {
            ClientService.sendMessageToAll(data);
        } else {
            ClientService.sendOneMessage(clientId, data);
        }
        window.location.reload();
    }


    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>{label}</h2>
                <img onClick={() => setActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <form onSubmit={(e) => onSend(e)}>
                <div className={s.fields} >
                    <div className={s.column}>
                        <p>Заголовок письма</p>
                        <input
                            value={subject}
                            onChange={(obj) => setSubject(obj.target.value)}
                            className={s.inp}
                            required />
                        <p>Файл</p>
                        <input
                            onChange={(obj) => setFile(obj.target.files[0])}
                            type='file'
                            className={s.inp}
                            required />
                    </div>
                    <div className={s.column}>
                        <p>Текст письма</p>
                        <textarea value={message}
                            onChange={(obj) => setMessage(obj.target.value)}
                            className={s.tArea}
                            required />
                    </div>
                </div>
                <button className={s.but}>Отправить</button>
            </form>
        </div>
    );
}