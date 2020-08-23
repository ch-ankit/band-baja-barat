import React from 'react';
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';
import ReactStars from "react-rating-stars-component";


function CheckoutProduct({ id, title, image, price, rating, quantity }) {
    const [{ basket }, dispatch] = useStateValue()
    console.log(quantity)
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt="" />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>Rs.</small>
                    <strong>{price}</strong>
                </p>
                <span>Quantity: {quantity}</span>
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