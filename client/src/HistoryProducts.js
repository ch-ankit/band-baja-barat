import React from 'react';
import ReactStars from "react-rating-stars-component";
import './HistoryProduct.css'

function HistoryProducts({ orderNo, status, rating, title, image, price, eventId, orderedDate, orderedQuantity, occasion, msgFunction }) {
    const currDate = new Date().getFullYear() + `-${new Date().getMonth() + 1}` + `-${new Date().getDate()}`
    const compare = Math.ceil((new Date(currDate) - new Date(orderedDate)) / (1000 * 60 * 60 * 24))
    const removeOrder = async (evt) => {
        const response = await fetch(`http://localhost:9000/giftstore/orders?orderNo=${orderNo}`, {
            method: 'DELETE'
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
                    <div>Ordered-Date: {orderedDate.slice(0, 10)}</div>
                    <div>Ordered Status: {status}</div>
                    <div>Event: {occasion}</div>
                </div>
            </div>
            {compare > 3 ? <button class="btn btn-primary cancle__button" data-toggle="tooltip" data-placement="bottom" title="The order was placed more than 3 days ago" disabled>Cancel order</button> : <button class="btn btn-primary cancle__button" onClick={removeOrder}>Cancel order</button>}
        </div>
    );
}

export default HistoryProducts;