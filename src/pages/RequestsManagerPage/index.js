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
    const [selectedStatus, setSelectedStatus] = useState("");

    React.useEffect(() => {
        RequestService.getByManagerId(currentUser.id)
            .then(({ data }) => setRequests(data));
    }, [currentUser.id]);

    const filteredRequests = requests.filter((request) =>
        (request.status === selectedStatus || selectedStatus === "")
    );

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
                    {
                        requests.length !== 0 &&
                        <select className={s.selRequest} value={selectedStatus} onChange={(obj) => setSelectedStatus(obj.target.value)}>
                            <option value="">Все</option>
                            <option value="Отклонена">Отклонённые</option>
                            <option value="Оформлена">Оформленные</option>
                        </select>
                    }
                    {filteredRequests
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