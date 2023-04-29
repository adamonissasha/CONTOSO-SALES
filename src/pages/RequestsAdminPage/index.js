import React, { useState } from 'react';
import s from './requestsAdmin.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import RequestAdminCard from '../../components/RequestAdminCard';
import RequestService from '../../services/RequestService';

export default function RequestAdminPage({ currentUser }) {
    const [requests, setRequests] = useState([]);

    React.useEffect(() => {
        RequestService.getByManagerId(currentUser.id)
            .then(({ data }) => setRequests(data));
        console.log(requests)
    }, []);

    return (
        <div>
            <Header />
            <div className={s.products}>
                <Menu page="admin-requests" />
                <div className={s.page}>
                    {requests
                        .map((request) => (
                            <RequestAdminCard
                                key={request.id}
                                request={request} />
                        ))}
                </div>
            </div>
        </div>
    )
}