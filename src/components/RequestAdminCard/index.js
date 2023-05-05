import s from './requestAdminCard.module.scss';
import { useState } from 'react';
import AgreeWindow from '../../modalWindow/AgreeModalWindow';
import RequestService from '../../services/RequestService';
import Notification from '../../modalWindow/Notification';

export default function RequestAdminCard({ request }) {
    const [isAgreeWindowActive, setAgreeWindowActive] = useState(false);
    const [agreeText, setAgreeText] = useState("");
    const [agreeTitle, setAgreeTitle] = useState("");
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState(false);
    const [title, setTitle] = useState(false);
    const [isCardOpen, setCardOpen] = useState(false);
    const [status, setStatus] = useState("");

    const getRequestSum = () => {
        var sum = 0;
        for (var i = 0; i < request.rlist.length; i++) {
            sum += request.rlist[i].clientAmount * request.rlist[i].pricePerItem;
        }
        return sum;
    }

    const onAction = (status) => {
        RequestService.changeStatus(request.requestId, status)
            .then(() => {
                window.location.reload();
            })
            .catch(function (error) {
                setAgreeWindowActive(false);
                setNotificationText(error.response.data.message);
                setNotificationActive(true);
                setTitle("Ошибка");
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
                                <h3 style={{ width: "110px" }}>Заказчик: </h3>
                                <h2 style={{ width: "250px" }}>{request.clientEmail}</h2>
                            </div>
                            <div className={s.row}>
                                <h3 style={{ width: "110px" }}>Менеджер: </h3>
                                <h2 style={{ width: "250px" }}>{request.fullName}</h2>
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
                                <h2 style={{ width: "200px" }}>{getRequestSum()} бел.руб.</h2>
                            </div>
                            <div className={s.row}>
                                <h3 style={{ width: "80px" }}>Статус: </h3>
                                <h2 style={{ width: "200px" }}>{request.status}</h2>
                            </div>
                        </div>
                    </div>
                    {isCardOpen ?
                        <div className={s.openCard}>
                            <div className={s.header}>
                                <h3 style={{ textAlign: "center", width: "10%" }}>№</h3>
                                <h3 style={{ textAlign: "center", width: "35%" }}>Название</h3>
                                <h3 style={{ textAlign: "center", width: "10%" }}>Артикул</h3>
                                <h3 style={{ textAlign: "center", width: "15%" }}>Количество, шт.</h3>
                                <h3 style={{ textAlign: "center", width: "15%" }}>Доступно, шт.</h3>
                                <h3 style={{ textAlign: "center", width: "12%" }}>Цена за шт, руб.</h3>
                            </div>
                            {request.rlist
                                .map((product) => (
                                    <div style={product.amount - product.reservedAmount < product.clientAmount ? { backgroundColor: "#F3E7E6" } : {}} className={s.productCard}>
                                        <h3 style={{ textAlign: "center", width: "10%" }}>{product.productId}</h3>
                                        <h3 style={{ textAlign: "center", width: "35%" }}>{product.name}</h3>
                                        <h3 style={{ textAlign: "center", width: "10%" }}>{product.code}</h3>
                                        <h3 style={{ textAlign: "center", width: "15%" }}>{product.clientAmount}</h3>
                                        <h3 style={{ textAlign: "center", width: "15%" }}>{product.amount - product.reservedAmount}</h3>
                                        <h3 style={{ textAlign: "center", width: "12%" }}>{product.pricePerItem}</h3>
                                    </div>
                                ))}
                            <div className={s.notePayment}>
                                <div className={s.row}>
                                    <h3 style={{ width: "150px" }}>Примечание: </h3>
                                    <h2 style={{ width: "800px" }}>{request.note}</h2>
                                </div> <div className={s.row}>
                                    <h3 style={{ width: "150px" }}>Способ оплаты: </h3>
                                    <h2 style={{ width: "250px" }}>{request.paymentMethod}</h2>
                                </div>
                            </div>
                            <div className={s.buttons}>
                                <button className={s.but} onClick={() => {
                                    setStatus("COMPLETED")
                                    setAgreeWindowActive(true);
                                    setAgreeText("Вы уверены, что хотите оформить заказ по этой заявке?");
                                    setAgreeTitle("Подтверждение заявки");
                                }}>Подтвердить заявку</button>
                                <button className={s.but} onClick={() => {
                                    setStatus("CANCELLED")
                                    setAgreeWindowActive(true);
                                    setAgreeText("Вы уверены, что хотите отклонить эту заявку?");
                                    setAgreeTitle("Отклонение заявки");
                                }}>Отклонить заявку</button>
                            </div>
                            <button className={s.aarrowButton} onClick={() => setCardOpen(false)} ><img className={s.arrow} src="..\..\images\arrow-top.svg" alt="top-arrow" /></button>
                        </div> :
                        <button className={s.aarrowButton} onClick={() => setCardOpen(true)} ><img className={s.arrow} src="..\..\images\arrow-bottom.svg" alt="bottom-arrow" /></button>}
                </div>
                {isAgreeWindowActive &&
                    <AgreeWindow
                        setActive={setAgreeWindowActive}
                        fun={() => onAction(status)}
                        title={agreeTitle}
                        text={agreeText} />}
                {isNotificationActive &&
                    <Notification
                        title={title}
                        text={notificationText}
                        setActive={setNotificationActive} />}
            </div >

        </div>
    );
}