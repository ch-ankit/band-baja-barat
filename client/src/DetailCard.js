import React from 'react'
import "./DetailCard.css"
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { actionvatNo } from './redux/action'
function DetailCard({ image, name, details, path, vatno, totalHalls, street, city, provience, status }) {
    const admin = useSelector(state => state.isAdmin)
    const uid = useSelector(state => state.uid);
    const vatNo = useSelector(state => state.vatNo);
    const addVatNo = () => {
        dispatch(actionvatNo(vatno))
    }
    const dispatch = useDispatch();
    const history = useHistory()
    switch (path) {
        case '/party':
            return (
                <div className="detailCard" onClick={() => { history.push(`/partypalace/${name}`); addVatNo() }}>
                    {admin ? <Link to={`/admin/partypalace/${name}`} onClick={addVatNo}>
                        <img src={image} alt={name} className="detailCard__image" />
                    </Link> :
                        <img src={image} alt={name} className="detailCard__image" />}
                    <div className="detailCard__detail" style={{ padding: '1.5rem' }}>
                        <h2>{name}</h2>
                        {!admin && <p>{details ?? ''.substr(0, 150)} <Link to={uid ? `/partypalace/${name}` : '/SignUp'} onClick={addVatNo}>...See More</Link></p>}
                        {admin &&
                            <div className="admin__details" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ backgroundColor: 'wheat', marginTop: 'auto', marginBottom: 'autos', padding: '0.5rem', display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <p>Total Halls: {totalHalls}</p>
                                    <p>Location: {`${city}`, `${street}`}</p>
                                    <p>Provience: {provience}</p>
                                    <div>Status: <strong style={{ backgroundColor: 'orange' }}>{status}</strong></div>
                                </div>
                                <p style={{ marginLeft: '20px' }}>{details == null ? '' : details.substr(0, 400)} <Link to={`/admin/partypalace/${name}`} onClick={addVatNo}>...See More</Link></p>
                            </div>
                        }
                    </div>
                </div>
            )
        case '/bands':
            return (
                <div className="detailCard" onClick={() => { history.push(`/admin/partypalace/${name}`) }}>
                    <img src={image} alt={name} style={{ width: '400px', height: '230px' }} />
                    <div className="detailCard__detail" style={{ padding: '1.5rem' }}>
                        <h2>{name}</h2>
                        <p>{details.substr(0, 250)} <Link to={uid ? `/bands/${name}` : '/SignUp'}>...See More</Link></p>
                    </div>
                </div>
            )
        case '/viewPartyPalaces':
            return (
                <div className="detailCard">
                    <img src={image} alt={name} className="detailCard__image" />
                    <div className="detailCard__detail">
                        <h2>{name}</h2>
                        {<p>{details ?? ''.substr(0, 150)} <Link to={`/partypalace/${name}`} onClick={addVatNo}>...See More</Link></p>}
                    </div>
                </div>
            )
        case '/search':
            return (
                <div>

                </div>
            )

    }
}

export default DetailCard 
