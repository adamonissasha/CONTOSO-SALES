import s from './newClientCard.module.scss';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import ClientService from '../../services/ClientService';
import Notification from '../../modalWindow/Notification';

export default function NewClientCard({ client, setActive, label, buttonName }) {
    const [name, setName] = useState(client.name);
    const [email, setEmail] = useState(client.email);
    const [address, setAddress] = useState(client.address);
    const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber);
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const [title, setTitle] = useState("");

    const onCommit = (e) => {
        e.preventDefault();
        if (phoneNumber !== "") {
            if (client.id === 0) {
                ClientService.addNew({ name, email, address, phoneNumber })
                    .then(() => {
                        window.location.reload();
                    })
                    .catch(function (error) {
                        if (error.response.status === 404) {
                            setNotificationText(error.response.data.message);
                            setNotificationActive(true);
                            setTitle("Ошибка")
                        }
                    });
            } else {
                ClientService.update(client.id, { name, email, address, phoneNumber })
                    .then(() => {
                        window.location.reload();
                    })
                    .catch(function (error) {
                        if (error.response.status === 404) {
                            setNotificationText(error.response.data.message);
                            setNotificationActive(true);
                            setTitle("Ошибка")
                        }
                    });
            }
        } else {
            setNotificationText("Введите телефон!");
            setNotificationActive(true);
            setTitle("Ошибка")
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
                        <PhoneInput
                            value={phoneNumber}
                            onChange={(obj) => setPhoneNumber(obj)}
                            inputClass={s.phone}
                            country={'by'}
                            specialLabel=""
                            required
                            inputExtraProps={{
                                mask: '+375 (99) 99-99-999'
                            }} />
                    </div>
                    <div className={s.column}>
                        <p>Email</p>
                        <input value={email}
                            type='email'
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
            {isNotificationActive &&
                <Notification
                    title={title}
                    text={notificationText}
                    setActive={setNotificationActive} />}
        </div>
    );
}