import React, { useState, useEffect } from 'react';
import './CheckoutProduct.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateSubtotal } from './redux/action';


function CheckoutProduct({ id, eventId, title, image, price, rating, quantity, removeFun, eventName }) {
    const userData = useSelector(state => state.userData)
    const { userName } = userData[0]
    const dispatch = useDispatch()
    let [addedQuantity, setAddedQuantity] = useState(quantity)
    let newQuantity = 0;

    const addQuantity = async () => {
        newQuantity = addedQuantity + 1;
        setAddedQuantity(newQuantity)
        const sendBody = {
            userName: userName,
            modelNo: id,
            eventId: eventId,
            quantity: newQuantity
        }
        await fetch('http://localhost:9000/giftstore/basket',
            {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(sendBody)
            })
        dispatch(UpdateSubtotal(`${id} has been set to:${newQuantity}`))

    }

    const removeQuantity = async () => {
        newQuantity = (addedQuantity - 1);
        setAddedQuantity(newQuantity)
        const sendBody = {
            userName: userName,
            modelNo: id,
            eventId: eventId,
            quantity: newQuantity
        }
        await fetch('http://localhost:9000/giftstore/basket',
            {
                method: 'PATCH', headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(sendBody)
            })
        dispatch(UpdateSubtotal(`${id} has been set to:${newQuantity}`))

    }



    const removeIcon = addedQuantity <= 1 ? <div className='disabled'><RemoveIcon /></div> : <div onClick={removeQuantity}><RemoveIcon /></div>
    return (
        <div className="overall">
            <div className="checkoutProduct">
                <img className="checkoutProduct__image" src={image} alt="" />

                <div className="checkoutProduct__info">
                    <p className="checkoutProduct__title">{title}</p>
                    <p className="checkoutProduct__price">
                        <strong>{price * addedQuantity}</strong>
                        <small> Store Points</small>
                    </p>
                    <span>Quantity: <div className="product__quantityView">
                        {removeIcon}
                        <span>{addedQuantity}</span>
                        <div onClick={addQuantity}><AddIcon /></div>
                    </div></span>
                    <div className="checkoutProduct__rating">
                        <ReactStars
                            count={5}
                            value={rating}
                            color='gray'
                            activeColor='#ffd700'
                            edit={false}
                            isHalf={true}
                        />
                    </div>
                    <button onClick={() => removeFun({ id, eventId })}>Remove from Basket</button>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 'auto', marginTop: 'auto' }}><label htmlFor="event">Event Id:</label><input class="form-control" id="event" disabled value={`${eventId}.  ${eventName}`} /></div>
        </div>
    );
}

export default CheckoutProduct;