import React, { useState } from 'react';
import s from './requestsManager.module.scss';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import RequestManagerCard from '../../components/RequestManagerCard';
import NewRequestCard from '../../components/NewRequestCard';

export default function RequestManagerPage() {
    const [isNewRequestButtonActive, setNewRequestButtonActive] = useState(false);
    const [requests, setRequests] = useState([]);

    React.useEffect(() => {
        // ProductService.getAll()
        //     .then(({ data }) => setRequests(data));
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
                    {/* {requests
                        .map((request) => (
                            <RequestCard
                                key={request.id}
                                request={request} />
                        ))} */}
                    <RequestManagerCard request />
                </div>
            </div>
        </div>
    )
}