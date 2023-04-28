import React, { useState } from 'react';
import s from './requestsManager.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import RequestManagerCard from '../../components/RequestManagerCard';
import NewRequestCard from '../../components/NewRequestCard';
import RequestService from '../../services/RequestService';

export default function RequestManagerPage({ currentUser }) {
    const [isNewRequestButtonActive, setNewRequestButtonActive] = useState(false);
    const [requests, setRequests] = useState([]);

    React.useEffect(() => {
        RequestService.getByManagerId(currentUser.id)
            .then(({ data }) => setRequests(data));
    }, []);

    return (
        <div>
            <Header />
            <div className={s.products}>
                <Menu page="manager-requests" />
                <div className={s.page}>
                    {isNewRequestButtonActive ?
                        <NewRequestCard
                            setActive={setNewRequestButtonActive} /> :
                        <button
                            className={s.addNew}
                            onClick={() => setNewRequestButtonActive(true)}>
                            <img className={s.plus} src="../../images/add.png" alt="add" />
                            <h2>Оформить новую заявку</h2>
                        </button>
                    }
                    {requests
                        .map((request) => (
                            <RequestManagerCard
                                key={request.id}
                                request={request} />
                        ))}
                </div>
            </div>
        </div>
    )
}