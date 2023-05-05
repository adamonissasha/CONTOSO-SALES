import s from './requestManagerCard.module.scss';
import { useState } from 'react';
import AgreeWindow from '../../modalWindow/AgreeModalWindow';
import RequestService from '../../services/RequestService';
import EditRequestCard from '../../components/EditRequestCard';

export default function RequestManagerCard({ request }) {
    const [isUpdateClientButtonActive, setUpdateClientButtonActive] = useState(false);
    const [isAgreeWindowActive, setAgreeWindowActive] = useState(false);
    const [isCardOpen, setCardOpen] = useState(false);

    const getRequestSum = () => {
        var sum = 0;
        for (var i = 0; i < request.rlist.length; i++) {
            sum += request.rlist[i].clientAmount * request.rlist[i].pricePerItem;
        }
        return sum;
    }

    const onDelete = () => {
        RequestService.delete(request.requestId)
            .then(() => {
                setAgreeWindowActive(false);
                window.location.reload();
            });
    }

    return (
        <div className={s.full}>
            <div className={s.fullCard}>
                <div className={s.card}>
                    <div className={s.info}>
                        <h3 style={{ width: "90px", textAlign: "center" }}>{request.requestId}</h3>
                        <div className={s.column}>
                            <div className={s.row}>
                                <h3 style={{ width: "100px" }}>Заказчик: </h3>
                                <h2 style={{ width: "250px" }}>{request.clientEmail}</h2>
                            </div>
                            <div className={s.row}>
                                <h3 style={{ width: "100px" }}>Статус: </h3>
                                <h2 style={{ width: "250px" }}>{request.status}</h2>
                            </div>
                        </div>
                        <div className={s.column}>
                            <div className={s.row}>
                                <h3 style={{ width: "180px" }}>Дата оформления: </h3>
                                <h2 style={{ width: "180px" }}>{request.dateTime}</h2>
                            </div>
                            <div className={s.row}>
                                <h3 style={{ width: "180px" }}>Дата доставки: </h3>
                                <h2 style={{ width: "180px" }}>{request.dateOfDelivery}</h2>
                            </div>
                        </div>
                        <div className={s.column}>
                            <div className={s.row}>
                                <h3 style={{ width: "80px" }}>Сумма: </h3>
                                <h2 style={{ width: "160px" }}>{getRequestSum()} бел.руб.</h2>
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
                            {request.rlist
                                .map((product) => (
                                    <div className={s.productCard}>
                                        <h3 style={{ textAlign: "center", width: "10%" }}>{product.productId}</h3>
                                        <h3 style={{ width: "45%" }}>{product.name}</h3>
                                        <h3 style={{ width: "10%" }}>{product.code}</h3>
                                        <h3 style={{ textAlign: "center", width: "9%" }}>{product.clientAmount}</h3>
                                        <h3 style={{ textAlign: "center", width: "12%" }}>{product.pricePerItem}</h3>
                                        <h3 style={{ textAlign: "center", width: "15%" }}>{product.clientAmount * product.pricePerItem}</h3>
                                    </div>
                                ))}
                            <button className={s.aarrowButton} onClick={() => setCardOpen(false)} ><img className={s.arrow} src="..\..\images\arrow-top.svg" alt="top-arrow" /></button>
                        </div> :
                        <button className={s.aarrowButton} onClick={() => setCardOpen(true)} ><img className={s.arrow} src="..\..\images\arrow-bottom.svg" alt="bottom-arrow" /></button>}
                </div>
                {(isUpdateClientButtonActive && request.status === "Оформлена") &&
                    <EditRequestCard
                        setActive={setUpdateClientButtonActive}
                        request={request} />
                }
                {isAgreeWindowActive &&
                    <AgreeWindow
                        setActive={setAgreeWindowActive}
                        fun={onDelete}
                        title="Удаление заявки"
                        text="Вы действительно хотите удалить заявку?" />}
            </div >

        </div>
    );
}