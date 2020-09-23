import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DetailCard from './DetailCard';
import UserHeader from './UserHeader';

function AdminDisplay(props) {
    const [pending, setPending] = useState([])
    const [reorder, setReorder] = useState([])
    useEffect(() => {
        async function getPendingRequests() {
            const response = await fetch('http://localhost:9000/admin/pendingrequest');
            const { data } = await response.json()
            setPending(data)
        }
        async function getReorders() {
            const response = await fetch('http://localhost:9000/admin/reorederrequired');
            const { data } = await response.json()
            setReorder(data)
        }
        getPendingRequests();
        getReorders();
    }, [])
    const pendingHosts = Object.keys(pending).map(items =>
        <DetailCard
            image={pending[items].profilePhoto}
            name={pending[items].hostName}
            details={pending[items].description}
            path='/party'
            vatno={pending[items].vatNo}
            totalHalls={pending[items].totalHalls}
            street={pending[items].street}
            city={pending[items].city}
            provience={pending[items].provience}
            status={pending[items].status}
        />)
    let reorderRequire;
    if (reorder.length !== 0) {
        reorderRequire = Object.keys(reorder).map((items) =>
            <div style={{ display: 'flex' }} >
                <Link to={`/giftstore/products/details?modelNo=${reorder[items].modelNo}`}><img src={reorder[items].photo} style={{ marginTop: 'auto', marginBottom: 'auto', height: '50px', width: '50px' }} /></Link>
                <div className="status" style={{ marginLeft: '15px' }}>
                    <h5>{reorder[items].name}</h5>
                    <p>Quantity: <strong>{reorder[items].quantity}</strong></p>
                </div>
            </div>)

    }
    return (
        <div className="admin__wrapper">
            <UserHeader />
            <div style={{ display: 'flex' }}>
                <div className="left" style={{ marginLeft: '20px' }}>
                    <strong>Request From Hosts</strong>
                    {pendingHosts}
                </div>
                <div className="right" style={{ width: '100%' }}>
                    <div className="low__quantity" style={{ marginTop: '15px', position: 'fixed', right: '0', display: 'flex', flexDirection: 'column', border: '3px solid', borderColor: "crimson" }}>
                        <strong style={{ textAlign: 'center', backgroundColor: 'white' }} >Reorder Required</strong >
                        {reorderRequire}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDisplay;