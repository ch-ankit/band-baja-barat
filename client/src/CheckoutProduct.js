import React, { useState, useEffect } from 'react';
import './CheckoutProduct.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useStateValue } from './StateProvider';
import ReactStars from "react-rating-stars-component";


function CheckoutProduct({ id, title, image, price, rating, quantity, removeFun, renSubtotal }) {
    const [{ basket, user }, dispatch] = useStateValue()
    let [addedQuantity, setAddedQuantity] = useState(quantity)
    const addQuantity = async () => {
        let newQuantity = addedQuantity + 1;
        setAddedQuantity(newQuantity)
        renSubtotal(`${id} has been set to:${newQuantity}`)
        const sendBody = {
            userName: user.userName,
            modelNo: id,
            quantity: newQuantity
        }
        await fetch('http://localhost:9000/giftstore/basket',
            {
                method: 'PATCH', headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(sendBody)
            })

    }

    const removeQuantity = async () => {
        let newQuantity = (addedQuantity <= 1) ? 1 : (addedQuantity - 1);
        setAddedQuantity(newQuantity)
        renSubtotal(`${id} has been set to:${newQuantity}`)
        const sendBody = {
            userName: user.userName,
            modelNo: id,
            quantity: newQuantity
        }
        await fetch('http://localhost:9000/giftstore/basket',
            {
                method: 'PATCH', headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(sendBody)
            })
    }


    const removeIcon = addedQuantity <= 1 ? <div onClick={removeQuantity} className='disabled'><RemoveIcon /></div> : <div onClick={removeQuantity}><RemoveIcon /></div>
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt="" />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>Rs.</small>
                    <strong>{price * addedQuantity}</strong>
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
                <button onClick={() => removeFun({ id })}>Remove from Basket</button>
            </div>
        </div>
    );
}

export default CheckoutProduct;