import React, { useState } from 'react';
import s from './ordersAdmin.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import RequestAdminCard from '../../components/RequestAdminCard';
import RequestService from '../../services/RequestService';

export default function OrdersAdminPage() {
    const [requests, setRequests] = useState([]);

    React.useEffect(() => {
        RequestService.getAll()
            .then(({ data }) => setRequests(data));
    }, []);

    return (
        <div>
            <Header />

            <div className={s.products}>
                <Menu page="orders" />
                {requests.length === 0 ?
                    <div className={s.page}>
                        <div className={s.no}><h2>В настоящее время нет оформленных заявок</h2></div>
                    </div> :
                    <div className={s.page}>
                        {requests
                            .map((request) => (
                                <RequestAdminCard
                                    key={request.id}
                                    request={request} />
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}