import React from 'react';
import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import './HistoryProduct.css'

function HistoryProducts({ orderNo, status, rating, title, image, price, userName, orderedDate, orderedQuantity, occasion, msgFunction, deliveryDate, location }) {
    const admin = useSelector(state => state.isAdmin)
    const currDate = new Date().getFullYear() + `-${new Date().getMonth() + 1}` + `-${new Date().getDate()}`
    const compare = Math.ceil((new Date(currDate) - new Date(orderedDate)) / (1000 * 60 * 60 * 24))
    const getEventDay = Math.ceil((new Date(deliveryDate) - new Date(currDate)) / (1000 * 60 * 60 * 24))
    const removeOrder = async () => {
        const response = await fetch(`http://localhost:9000/giftstore/orders?orderNo=${orderNo}`, {
            method: 'DELETE'
        })
        const { message } = await response.json()
        msgFunction(message)
    }

    const handleChange = async (evt) => {
        const response = await fetch(`http://localhost:9000/giftstore/orders`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ status: evt.target.value, orderNo: orderNo })
        })
        const { message } = await response.json()
        msgFunction(message)
    }
    const selectCondition = status === 'DELIVERED' ? <input className="form-control" value={status} disabled /> : (<select value={status} class="custom-select" onChange={handleChange}>
        <option value="PROCESSING">PROCESSING</option>
        <option value="SHIPPING">SHIPPING</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="DELAYED">DELAYED</option>
        <option value="CANCELLED">CANCELLED</option>
    </select>)

    let conditionalStyle;
    let adminStyle;
    if (status === "DELIVERED") {
        conditionalStyle = { border: '1px solid teal', padding: '0.5rem', display: 'flex', flexDirection: 'row' }
    } else if (status === "PROCESSING") {
        conditionalStyle = { border: '1px solid yellow', padding: '0.5rem', display: 'flex', flexDirection: 'row' }
    } else if (status === "CANCELLED") {
        conditionalStyle = { border: '1px solid red', padding: '0.5rem', display: 'flex', flexDirection: 'row' }
    } else if (getEventDay < 7) {
        conditionalStyle = { border: '1px solid orange', padding: '0.5rem', display: 'flex', flexDirection: 'row' }
    } else {
        conditionalStyle = {}
    }

    if (admin === true && status === "DELIVERED" && getEventDay < 5) {
        adminStyle = { border: '2px solid green' }
    } else if (admin === true && status !== "DELIVERED" && getEventDay < 5) {
        adminStyle = { border: '2px solid orange' }
    } else {
        adminStyle = {}
    }

    return (
        <div style={adminStyle} className="overall">
            {admin && <div className="ordered__by" style={{ cursor: 'pointer' }} data-toggle="tooltip" data-placement="bottom" title="Username">Ordered By: {userName}</div>}
            <div className="history">
                <img className="history__image" src={image} alt="" />
                <div className="history__info">
                    <p className="history__title">{title}</p>
                    <p className="history__price">
                        <strong>{price * orderedQuantity}</strong>
                        <small> Store Points</small>
                    </p>
                    <span>Quantity: {orderedQuantity}</span>
                    <div className="history__rating">
                        <ReactStars
                            count={5}
                            value={rating}
                            color='gray'
                            activeColor='#ffd700'
                            edit={false}
                            isHalf={true}
                        />
                    </div>
                    <div>Ordered Date: {orderedDate.slice(0, 10)}</div>
                    {admin && <div>Delivery Date: {deliveryDate.slice(0, 10)}</div>}
                    {admin && <div>Delivery Location: {location}</div>}
                    {!admin && <div>Event: {occasion}</div>}
                </div>
            </div>
            <div className="status__display">
                OrderStatus:
                    {admin ? (
                    selectCondition
                )
                    : <div style={conditionalStyle}>{status}{(status !== "DELIVERED" && getEventDay < 7) && (<div data-toggle="tooltip" data-placement="bottom" title="The event is approaching soon"><PriorityHighIcon style={{ color: 'orange' }} /></div>)}</div>
                }</div>
            { !admin && (compare > 3 ? <button className="btn btn-primary cancle__button" data-toggle="tooltip" data-placement="bottom" title="The order was placed more than 3 days ago" disabled>Cancel order</button> : <button className="btn btn-primary cancle__button" onClick={removeOrder}>Cancel order</button>)}
        </div >
    );
}

export default HistoryProducts;