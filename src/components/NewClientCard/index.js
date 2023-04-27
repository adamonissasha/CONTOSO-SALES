import s from './newClientCard.module.scss';
import React from 'react';
import ClientService from '../../services/ClientService';

export default function NewClientCard({ client, setActive, label, buttonName }) {
    const [name, setName] = React.useState(client.name);
    const [email, setEmail] = React.useState(client.email);
    const [address, setAddress] = React.useState(client.address);
    const [phoneNumber, setPhoneNumber] = React.useState(client.phoneNumber);

    const onCommit = (e) => {
        e.preventDefault();
        if (client.id === 0) {
            ClientService.addNew({ name, email, address, phoneNumber });
        } else {
            ClientService.update(client.id, { name, email, address, phoneNumber });
        }
    }

    return (
        <div className={s.card}>
            <div className={s.header}>
                <h2 className={s.label}>{label}</h2>
                <img onClick={() => setActive(false)} src=".\images\delete.png" alt="close" />
            </div>
            <form onSubmit={(e) => onCommit(e)}>
                <div className={s.fields}>
                    <div className={s.column}>
                        <p>Имя</p>
                        <input value={name}
                            onChange={(obj) => setName(obj.target.value)}
                            className={s.inp}
                            required />
                        <p>Телефон</p>
                        <input value={phoneNumber}
                            onChange={(obj) => setPhoneNumber(obj.target.value)}
                            className={s.inp}
                            required />
                    </div>
                    <div className={s.column}>
                        <p>Email</p>
                        <input value={email}
                            onChange={(obj) => setEmail(obj.target.value)}
                            className={s.inp}
                            required />
                        <p>Адрес</p>
                        <input value={address}
                            onChange={(obj) => setAddress(obj.target.value)}
                            className={s.inp}
                            required />
                    </div>
                </div>
                <button className={s.but}>{buttonName}</button>
            </form>
        </div>
    );
}