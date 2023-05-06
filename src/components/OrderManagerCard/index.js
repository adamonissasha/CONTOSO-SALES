import s from './orderManagerCard.module.scss';
import { useState } from 'react';
import AgreeWithMessageWindow from '../../modalWindow/AgreeWithMessageModalWindow';
import Notification from '../../modalWindow/Notification';

export default function OrderManagerCard({ order }) {
    const [isAgreeWithMessageWindowActive, setAgreeWithMessageWindowActive] = useState(false);
    const [agreeText, setAgreeText] = useState("");
    const [agreeTitle, setAgreeTitle] = useState("");
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState(false);
    const [title, setTitle] = useState(false);
    const [isCardOpen, setCardOpen] = useState(false);
    const [status, setStatus] = useState("");

    // const getOrderSum = () => {
    //     var sum = 0;
    //     for (var i = 0; i < order.rlist.length; i++) {
    //         sum += order.rlist[i].clientAmount * order.rlist[i].pricePerItem;
    //     }
    //     return sum;
    // }

    // const onAction = (status) => {
    //     RequestService.changeStatus(request.requestId, status)
    //         .then(() => {
    //             window.location.reload();
    //         })
    //         .catch(function (error) {
    //             setAgreeWindowActive(false);
    //             setNotificationText(error.response.data.message);
    //             setNotificationActive(true);
    //             setTitle("Ошибка");
    //         });
    // }

    return (
        <div className={s.full}>
            <div className={s.fullCard}>
                <div className={s.card}>
                    <div className={s.info}>
                        <h3 style={{ width: "90px", textAlign: "center" }}>{order.id}</h3>
                        <div className={s.column}>
                            <div className={s.row}>
                                <h3 style={{ width: "110px" }}>Заказчик: </h3>
                                <h2 style={{ width: "250px" }}>{order.clientEmail}</h2>
                            </div>
                            <div className={s.row}>
                                <h3 style={{ width: "110px" }}>Менеджер: </h3>
                                <h2 style={{ width: "250px" }}>{order.userFullName}</h2>
                            </div>
                        </div>
                        <div className={s.column}>
                            <div className={s.row}>
                                <h3 style={{ width: "180px" }}>Дата оформления: </h3>
                                <h2 style={{ width: "180px" }}>{order.dateOfCreate}</h2>
                            </div>
                            <div className={s.row}>
                                <h3 style={{ width: "180px" }}>Дата доставки: </h3>
                                <h2 style={{ width: "180px" }}>{order.dateOfDelivery}</h2>
                            </div>
                        </div>
                        <div className={s.column}>
                            <div className={s.row}>
                                <h3 style={{ width: "80px" }}>Сумма: </h3>
                                <h2 style={{ width: "200px" }}>{order.finalPrice} бел.руб.</h2>
                            </div>
                            <div className={s.row}>
                                <h3 style={{ width: "80px" }}>Статус: </h3>
                                <h2 style={{ width: "200px" }}>{order.status}</h2>
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
                                <h3 style={{ textAlign: "center", width: "15%" }}>Цена за шт, руб.</h3>
                                <h3 style={{ textAlign: "center", width: "15%" }}>Итоговая цена, руб.</h3>

                            </div>
                            {order.rList
                                .map((product) => (
                                    <div className={s.productCard}>
                                        <h3 style={{ textAlign: "center", width: "10%" }}>{product.productId}</h3>
                                        <h3 style={{ textAlign: "center", width: "35%" }}>{product.name}</h3>
                                        <h3 style={{ textAlign: "center", width: "10%" }}>{product.code}</h3>
                                        <h3 style={{ textAlign: "center", width: "15%" }}>{product.clientAmount}</h3>
                                        <h3 style={{ textAlign: "center", width: "15%" }}>{product.pricePerItem}</h3>
                                        <h3 style={{ textAlign: "center", width: "15%" }}>{product.pricePerItem * product.clientAmount}</h3>
                                    </div>
                                ))}
                            <div className={s.notePayment}>
                                <div className={s.row}>
                                    <h3 style={{ width: "150px" }}>Примечание: </h3>
                                    <h2 style={{ width: "800px" }}>{order.note}</h2>
                                </div> <div className={s.row}>
                                    <h3 style={{ width: "150px" }}>Способ оплаты: </h3>
                                    <h2 style={{ width: "250px" }}>{order.paymentMethod}</h2>
                                </div>
                            </div>
                            <div className={s.buttons}>
                                <button className={s.but}>Закрыть заказ</button>
                                <button className={s.but} onClick={() => {
                                    setStatus("CANCELLED")
                                    setAgreeWithMessageWindowActive(true);
                                    setAgreeText("Вы уверены, что хотите отменить этот заказ? Оставьте сообщение с причиной отмены.");
                                    setAgreeTitle("Отмена заказа");
                                }}>Отменить заказ</button>
                            </div>
                            <button className={s.aarrowButton} onClick={() => setCardOpen(false)} ><img className={s.arrow} src="..\..\images\arrow-top.svg" alt="top-arrow" /></button>
                        </div> :
                        <button className={s.aarrowButton} onClick={() => setCardOpen(true)} ><img className={s.arrow} src="..\..\images\arrow-bottom.svg" alt="bottom-arrow" /></button>}
                </div>
                {isAgreeWithMessageWindowActive &&
                    <AgreeWithMessageWindow
                        setActive={setAgreeWithMessageWindowActive}
                        title={agreeTitle}
                        text={agreeText} />}
                {/* {isNotificationActive &&
                    <Notification
                        title={title}
                        text={notificationText}
                        setActive={setNotificationActive} />} */}
            </div >
        </div>
    );
}