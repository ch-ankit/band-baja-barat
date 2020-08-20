import React, { useEffect, useState } from 'react';
import './Product.css'
import ReactStars from "react-rating-stars-component";
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom'

function Product({ id, title, price, rating, image, quantity, description, removeFun }) {
    let [{ basket, isAdmin, user }, dispatch] = useStateValue();
    const [ratingDetails, setratingDetails] = useState()
    useEffect(() => {
        async function getUserRatings() {
            const response = await fetch(`http://localhost:9000/giftstore/rating/all?userName=${user.userName}`)
            const allRating = await response.json()
            setratingDetails(allRating.data)
        }
        getUserRatings()
    }, [])
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

    const updateRating = async (data) => {
        let name = 'POST'
        if (ratingDetails.length !== 0) {
            const index = Object.keys(ratingDetails).findIndex((rows) => ratingDetails[rows].modelNo === data.modelNo)
            name = index === -1 ? 'POST' : 'PATCH'
        }
        const returned = await fetch(`http://localhost:9000/giftstore/rating?modelNo=${data.modelNo}&userName=${user.userName}`,
            {
                method: name, headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ value: data.rating })
            })
        const response = await returned.json();
        console.log(response)
    }
    return (
        <div className="product">
            <div className="product__info">
                <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'black' }} onClick={addProductDetail}>
                    <p>{title}</p>
                </Link>
                <p className="product__price">
                    <small>Rs.</small>
                    <small>{price}</small>
                </p>
                <ReactStars
                    count={5}
                    value={rating}
                    color='gray'
                    activeColor='#ffd700'
                    edit={true}
                    isHalf={true}
                    onChange={(newRating) => {
                        const data = { modelNo: id, rating: newRating }
                        updateRating(data)
                    }}
                />
            </div>
            <div style={{ textDecoration: 'none', color: 'black', height: '200px', marginBottom: '15px' }}>
                <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'black' }} onClick={addProductDetail}>
                    <img className="image" src={image} alt="product" />
                </Link>
            </div>
            {isAdmin && <button onClick={() => removeFun({ modelNo: id })}>Remove Gift</button>}
        </div >
    );
}

export default Product;