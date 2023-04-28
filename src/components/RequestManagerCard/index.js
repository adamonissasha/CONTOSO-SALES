import s from './requestManagerCard.module.scss';
import { useState } from 'react';
import NewClientCard from '../NewClientCard';
import AgreeWindow from '../../modalWindow/AgreeModalWindow';
import ClientService from '../../services/ClientService';
import SendMessageCard from '../SendMesageCard';

export default function RequestManagerCard({ request }) {
    const [isUpdateClientButtonActive, setUpdateClientButtonActive] = useState(false);
    const [isAgreeWindowActive, setAgreeWindowActive] = useState(false);
    const [isCardOpen, setCardOpen] = useState(false);

    return (
        <div className={s.full}>
            <div className={s.fullCard}>
                <div className={s.card}>
                    <div className={s.info}>
                        <h3 style={{ width: "90px", textAlign: "center" }}>ID</h3>
                        <div className={s.column}>
                            <div className={s.row}>
                                <h3 style={{ width: "100px" }}>Заказчик: </h3>
                                <h2 style={{ width: "250px" }}>ivan@mail.ru</h2>
                            </div>
                            <div className={s.row}>
                                <h3 style={{ width: "100px" }}>Статус: </h3>
                                <h2 style={{ width: "250px" }}>Оформлена</h2>
                            </div>
                        </div>
                        <div className={s.column}>
                            <div className={s.row}>
                                <h3 style={{ width: "180px" }}>Дата оформления: </h3>
                                <h2 style={{ width: "180px" }}>28.04.2023</h2>
                            </div>
                            <div className={s.row}>
                                <h3 style={{ width: "180px" }}>Дата доставки: </h3>
                                <h2 style={{ width: "180px" }}>31.04.2023</h2>
                            </div>
                        </div>
                        <div className={s.column}>
                            <div className={s.row}>
                                <h3 style={{ width: "80px" }}>Сумма: </h3>
                                <h2 style={{ width: "160px" }}>1380 бел.руб.</h2>
                            </div>
                            <div className={s.row} />
                        </div>
                        <img onClick={() => setUpdateClientButtonActive(true)} className={s.edit} src="..\..\images\edit.png" alt="edit" />
                        <img onClick={() => setAgreeWindowActive(true)} className={s.remove} src="..\..\images\remove.png" alt="delete" />
                    </div>
                    {isCardOpen ?
                        <div className={s.openCard}>
                            <div className={s.header}>
                                <h3 style={{ textAlign: "center", width: "10%" }}>№</h3>
                                <h3 style={{ width: "45%" }}>Название</h3>
                                <h3 style={{ width: "10%" }}>Артикул</h3>
                                <h3 style={{ width: "9%" }}>Количество</h3>
                                <h3 style={{ width: "12%" }}>Цена за шт, руб.</h3>
                                <h3 style={{ width: "15%" }}>Итоговая цена, руб.</h3>
                            </div>
                            {/* замапить следующий див */}
                            <div className={s.productCard}>
                                <h3 style={{ textAlign: "center", width: "10%" }}>№</h3>
                                <h3 style={{ width: "45%" }}>Шариковая ручка</h3>
                                <h3 style={{ width: "10%" }}>123456</h3>
                                <h3 style={{ textAlign: "center", width: "9%" }}>124125</h3>
                                <h3 style={{ textAlign: "center", width: "12%" }}>0.34</h3>
                                <h3 style={{ textAlign: "center", width: "15%" }}>324.00</h3>
                            </div>
                            <button className={s.aarrowButton} onClick={() => setCardOpen(false)} ><img className={s.arrow} src="..\..\images\arrow-top.svg" alt="top-arrow" /></button>
                        </div> :
                        <button className={s.aarrowButton} onClick={() => setCardOpen(true)} ><img className={s.arrow} src="..\..\images\arrow-bottom.svg" alt="bottom-arrow" /></button>}
                </div>
                {/* {isUpdateClientButtonActive &&
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
                    text="Вы действительно хотите удалить клиента?" />} */}
            </div >

        </div>
    );
}