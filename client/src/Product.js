import React, { useEffect, useState } from 'react';
import './Product.css'
import ReactStars from "react-rating-stars-component";
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Product(props) {
    const { id, title, price, rating, image, quantity, description, removeFun } = props
    let [{ }, dispatch] = useStateValue();
    const admin = useSelector(state => state.isAdmin)
    const uid = useSelector(state => state.uid)
    const addProductDetail = () => {
        dispatch({
            type: 'ADD_PRODUCTS',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
                description: description,
                quantity: quantity
            },
        })
    }
    return (
        <div className="product">
            <div className="product__info">
                <Link to={uid ? `/giftstore/products/details?modelNo=${id}` : '/SignUp'} style={{ textDecoration: 'none', color: 'black' }} onClick={addProductDetail}>
                    <p>{title}</p>
                </Link>
                <p className="product__price">
                    <small>{price} store points</small>
                </p>
                <ReactStars
                    count={5}
                    value={rating}
                    color='gray'
                    activeColor='#ffd700'
                    edit={false}
                    isHalf={true}
                />
            </div>
            <div style={{ textDecoration: 'none', color: 'black', height: '200px', marginBottom: '15px' }}>
                <Link to={uid ? `/giftstore/products/details?modelNo=${id}` : '/SignUp'} style={{ textDecoration: 'none', color: 'black' }} onClick={addProductDetail}>
                    <img className="image" src={image} alt="product" />
                </Link>
            </div>
            {admin && <button onClick={() => removeFun({ modelNo: id })}>Remove Gift</button>}
        </div >
    );
}

export default Product;