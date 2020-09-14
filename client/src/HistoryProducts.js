import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux';
import './HistoryProduct.css'

function HistoryProducts({ orderNo, status, rating, title, image, price, eventId, orderedDate, orderedQuantity, occasion, msgFunction }) {
    const admin = useSelector(state => state.isAdmin)
    const [history, setHistory] = useState([]);
    const currDate = new Date().getFullYear() + `-${new Date().getMonth() + 1}` + `-${new Date().getDate()}`
    const compare = Math.ceil((new Date(currDate) - new Date(orderedDate)) / (1000 * 60 * 60 * 24))

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
    return (
        <div className="overall">
            <div className="history">
                <img className="history__image" src={image} alt="" />
                <div className="history__info">
                    <p className="history__title">{title}</p>
                    <p className="history__price">
                        <strong>{price}</strong>
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

                    {admin ? (
                        <select value={status} class="custom-select" onChange={handleChange}>
                            <option value="Processing">Processing</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Cancled">Cancled</option>
                        </select>
                    )
                        : <div>Order Status: {status}</div>
                    }


                    <div>Event: {occasion}</div>
                </div>
            </div>
            {!admin && (compare > 3 ? <button className="btn btn-primary cancle__button" data-toggle="tooltip" data-placement="bottom" title="The order was placed more than 3 days ago" disabled>Cancel order</button> : <button className="btn btn-primary cancle__button" onClick={removeOrder}>Cancel order</button>)}
        </div>
    );
}

export default HistoryProducts;