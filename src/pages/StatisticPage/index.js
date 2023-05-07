import React, { useState } from 'react';
import s from './statistic.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import StatisticService from '../../services/StatisticService';
import Notification from '../../modalWindow/Notification';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, PieChart, Pie, Tooltip, Cell, LineChart, ResponsiveContainer, Legend, Line } from 'recharts';

export default function StatisticPage() {
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const [title, setTitle] = useState("");
    const [isProductStatisticOpened, setProductStatisticOpened] = React.useState(false);
    const [isClientStatisticOpened, setClientStatisticOpened] = React.useState(false);
    const [isFailedStatisticOpened, setFailedStatisticOpened] = React.useState(false);
    const [isProfitStatisticOpened, setProfitStatisticOpened] = React.useState(false);
    const [dateFrom1, setDateFrom1] = React.useState("");
    const [dateFrom2, setDateFrom2] = React.useState("");
    const [dateTo1, setDateTo1] = React.useState("");
    const [dateTo2, setDateTo2] = React.useState("");
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
                setFailedStatisticOpened(true);
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
                setProfitStatisticOpened(true);
            })
            .catch(function (error) {
                setNotificationText(error.response.data.message);
                setNotificationActive(true);
                setTitle("Ошибка")
            });;
    }

    return (
        <div>
            <Header />
            <div className={s.products}>
                <Menu page="statistic" />
                <div className={s.page}>
                    <button onClick={() => onGetProductStat()}>Продукты</button>
                    {isProductStatisticOpened &&
                        <BarChart width={800} height={600} data={productData} label className={s.left}>
                            <Tooltip />
                            <Bar dataKey="value" fill='orange' />
                            <CartesianGrid stroke='#ccc' />
                            <XAxis dataKey="key" />
                            <YAxis />
                        </BarChart>
                    }
                    <button onClick={() => onGetClientStat()}>Клиенты</button>
                    {isClientStatisticOpened &&
                        <BarChart width={800} height={600} data={clientData} label className={s.left}>
                            <Tooltip />
                            <Bar dataKey="value" fill='orange' />
                            <CartesianGrid stroke='#ccc' />
                            <XAxis dataKey="key" />
                            <YAxis />
                        </BarChart>
                    }
                    <form onSubmit={(e) => onGetFailedStat(e)}>
                        <input
                            value={dateFrom1}
                            onChange={(e) => setDateFrom1(e.target.value)}
                            type="date"
                            className={s.inp}
                            max={today}
                            required />
                        <input
                            value={dateTo1}
                            onChange={(e) => setDateTo1(e.target.value)}
                            type="date"
                            className={s.inp}
                            max={today}
                            required />
                        <button>Заказы</button>
                    </form>
                    {isFailedStatisticOpened &&
                        <PieChart width={600} height={600} className={s.right}>
                            <Tooltip />
                            <Pie data={failedData} dataKey="value" nameKey="key" outerRadius={250} innerRadius={150} fill="#8884d8" label={true} >
                                <Cell fill={'green'} />
                                <Cell fill={'red'} />
                            </Pie>
                        </PieChart>
                    }
                    <form onSubmit={(e) => onGetProfitStat(e)}>
                        <input
                            value={dateFrom2}
                            onChange={(e) => setDateFrom2(e.target.value)}
                            type="date"
                            className={s.inp}
                            max={today}
                            required />
                        <input
                            value={dateTo2}
                            onChange={(e) => setDateTo2(e.target.value)}
                            type="date"
                            className={s.inp}
                            max={today}
                            required />
                        <button>Прибыль</button>
                    </form>
                    {isProfitStatisticOpened &&
                        <ResponsiveContainer width="100%" aspect={3}>
                            <LineChart data={profitData} margin={{ right: 300 }}>
                                <CartesianGrid />
                                <XAxis dataKey="key"
                                    interval={'preserveStartEnd'} />
                                <YAxis></YAxis>
                                <Legend />
                                <Tooltip />
                                <Line dataKey="value"
                                    stroke="black" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
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