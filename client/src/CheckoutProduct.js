import React, { useState, useEffect } from 'react';
import './CheckoutProduct.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useStateValue } from './StateProvider';
import ReactStars from "react-rating-stars-component";


function CheckoutProduct({ id, title, image, price, rating, quantity }) {
    const [{ basket }, dispatch] = useStateValue()
    let [addedQuantity, setAddedQuantity] = useState(quantity)
    const unitPrice = price / quantity
    useEffect(() => {

    }, [])

    useEffect(() => {

    }, [addedQuantity])

    const addQuantity = () => {
        let newQuantity = addedQuantity + 1;
        setAddedQuantity(newQuantity)
    }

    const removeQuantity = () => {
        let newQuantity = (addedQuantity <= 1) ? 1 : (addedQuantity - 1);
        setAddedQuantity(newQuantity)
    }
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
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
                    <strong>{addedQuantity * unitPrice}</strong>
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
                <button onClick={removeFromBasket}>Remove from Basket</button>
            </div>
        </div>
    );
}

export default CheckoutProduct;