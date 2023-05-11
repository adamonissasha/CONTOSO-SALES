import React, { useState } from 'react';
import s from './statistic.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import StatisticService from '../../services/StatisticService';
import Notification from '../../modalWindow/Notification';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, PieChart, Pie, Tooltip, Cell, LineChart, ResponsiveContainer, Legend, Line } from 'recharts';

export default function StatisticPage() {
    const [idx, setIdx] = useState(0)
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const [title, setTitle] = useState("");
    const [isProductStatisticOpened, setProductStatisticOpened] = React.useState(false);
    const [isClientStatisticOpened, setClientStatisticOpened] = React.useState(false);
    const [isFailedStatisticOpened, setFailedStatisticOpened] = React.useState(true);
    const [isProfitStatisticOpened, setProfitStatisticOpened] = React.useState(false);
    const [dateFrom1, setDateFrom1] = React.useState("");
    const [dateFrom2, setDateFrom2] = React.useState("");
    const [dateTo1, setDateTo1] = React.useState(() => {
        const now = new Date();
        now.setHours(now.getHours() + 3);
        return now.toISOString().slice(0, 10);
    });
    const [dateTo2, setDateTo2] = React.useState(() => {
        const now = new Date();
        now.setHours(now.getHours() + 3);
        return now.toISOString().slice(0, 10);
    });
    const [today] = React.useState(() => {
        const now = new Date();
        now.setHours(now.getHours() + 3);
        return now.toISOString().slice(0, 10);
    });

    const [productData, setProductData] = React.useState([]);
    const [clientData, setClientData] = React.useState([]);
    const [failedData, setFailedData] = React.useState([]);
    const [profitData, setProfitData] = React.useState([]);

    const onGetProductStat = () => {
        StatisticService.getMostPopularItems()
            .then(({ data }) => {
                setProductData(data);
                setProductStatisticOpened(true);
                setClientStatisticOpened(false);
                setProfitStatisticOpened(false)
                setFailedStatisticOpened(false)
            })
            .catch(function (error) {
                setNotificationText(error.response.data.message);
                setNotificationActive(true);
                setTitle("Ошибка")
            });
    }

    const onGetClientStat = () => {
        StatisticService.getMostActiveClients()
            .then(({ data }) => {
                setClientData(data);
                setClientStatisticOpened(true);
                setProductStatisticOpened(false);
                setProfitStatisticOpened(false)
                setFailedStatisticOpened(false)
            })
            .catch(function (error) {
                setNotificationText(error.response.data.message);
                setNotificationActive(true);
                setTitle("Ошибка")
            });
    }

    const onGetFailedStat = (e) => {
        e.preventDefault();
        StatisticService.getFailedSuccessInRange(dateFrom1, dateTo1)
            .then(({ data }) => {
                setFailedData(data);
            })
            .catch(function (error) {
                setNotificationText(error.response.data.message);
                setNotificationActive(true);
                setTitle("Ошибка")
            });
    }

    const onGetProfitStat = (e) => {
        e.preventDefault();
        StatisticService.getProfitInRange(dateFrom2, dateTo2)
            .then(({ data }) => {
                setProfitData(data);
            })
            .catch(function (error) {
                setNotificationText(error.response.data.message);
                setNotificationActive(true);
                setTitle("Ошибка")
            });;
    }

    const onProfitStatisticClick = () => {
        setDateFrom2("")
        setDateTo2(today)
        setProfitData([])
        setFailedStatisticOpened(false)
        setProfitStatisticOpened(true)
        setClientStatisticOpened(false)
        setProductStatisticOpened(false)
    }

    const onFailedStatisticClick = () => {
        setDateFrom1("")
        setDateTo1(today)
        setFailedData([])
        setFailedStatisticOpened(true)
        setProfitStatisticOpened(false)
        setClientStatisticOpened(false)
        setProductStatisticOpened(false)
    }

    const pages = [];

    return (
        <div>
            <Header />
            <div className={s.products}>
                <Menu page="statistic" />
                <div className={s.page}>
                    <div className={s.buttons}>
                        <div className={s.d}><button onClick={() => { setIdx(0); onFailedStatisticClick() }} className={idx === 0 ? s.choosen : s.unchoosen}>Заказы</button></div>
                        <div className={s.d}><button onClick={() => { setIdx(1); onProfitStatisticClick() }} className={idx === 1 ? s.choosen : s.unchoosen}>Прибыль</button></div>
                        <div className={s.d}><button onClick={() => { setIdx(2); onGetProductStat() }} className={idx === 2 ? s.choosen : s.unchoosen}>Продукты</button></div>
                        <div className={s.d}><button onClick={() => { setIdx(3); onGetClientStat() }} className={idx === 3 ? s.choosen : s.unchoosen}>Клиенты</button></div>
                    </div>
                    {isProductStatisticOpened &&
                        <BarChart width={800} height={600} data={productData} label className={s.left}>
                            <Tooltip />
                            <Bar dataKey="value" fill='#E58B56' />
                            <CartesianGrid stroke='#ccc' />
                            <XAxis dataKey="key" />
                            <YAxis />
                        </BarChart>
                    }
                    {isClientStatisticOpened &&
                        <BarChart width={800} height={600} data={clientData} label className={s.left}>
                            <Tooltip />
                            <Bar dataKey="value" fill='#E5C65F' />
                            <CartesianGrid stroke='#ccc' />
                            <XAxis dataKey="key" />
                            <YAxis />
                        </BarChart>
                    }
                    {isFailedStatisticOpened &&
                        <div className={s.d}>
                            <form className={s.dateForm} onSubmit={(e) => onGetFailedStat(e)}>
                                <h3>Статистика успешных заказов с</h3>
                                <input
                                    value={dateFrom1}
                                    onChange={(e) => setDateFrom1(e.target.value)}
                                    type="date"
                                    className={s.inp}
                                    max={today}
                                    required />
                                <h3>по</h3>
                                <input
                                    value={dateTo1}
                                    onChange={(e) => setDateTo1(e.target.value)}
                                    type="date"
                                    className={s.inp}
                                    max={today}
                                    required />
                                <button>Построить</button>
                            </form>
                            <PieChart width={550} height={550} className={s.right}>
                                <Tooltip />
                                <Pie data={failedData} dataKey="value" nameKey="key" outerRadius={250} innerRadius={150} fill="#8884d8" label={true} >
                                    <Cell fill={'#82B581'} />
                                    <Cell fill={'#E58470'} />
                                </Pie>
                            </PieChart>
                        </div>
                    }
                    {isProfitStatisticOpened &&
                        <div className={s.d}>
                            <form className={s.dateForm} onSubmit={(e) => onGetProfitStat(e)}>
                                <h3>Статистика полученной прибыли с</h3>
                                <input
                                    value={dateFrom2}
                                    onChange={(e) => setDateFrom2(e.target.value)}
                                    type="date"
                                    className={s.inp}
                                    max={today}
                                    required />
                                <h3>по</h3>
                                <input
                                    value={dateTo2}
                                    onChange={(e) => setDateTo2(e.target.value)}
                                    type="date"
                                    className={s.inp}
                                    max={today}
                                    required />
                                <button>Построить</button>
                            </form>
                            <LineChart className={s.lineChart} data={profitData} width={600} height={400}>
                                <XAxis dataKey="key"
                                    interval={'preserveStartEnd'} />
                                <YAxis></YAxis>
                                <Tooltip />
                                <Line dataKey="value"
                                    stroke="#5E7DE6" activeDot={{ r: 10 }} />
                            </LineChart>
                        </div>
                    }
                    {isNotificationActive &&
                        <Notification
                            title={title}
                            text={notificationText}
                            setActive={setNotificationActive} />}
                </div>
            </div>
        </div>
    )
}