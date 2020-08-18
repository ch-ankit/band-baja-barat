import React, { useEffect, useState } from 'react';
import './Product.css'
import ReactStars from "react-rating-stars-component";
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom'

function Product({ id, title, price, rating, image, description, removeFun }) {
    const [{ basket, isAdmin }, dispatch] = useStateValue();
    const [rates, setRates] = useState()
    // useEffect(() => {
    //     async function getBasket() {
    //         const response = await fetch('http://localhost:9000/giftstore/basketdata')
    //         const data = await response.json();
    //         console.log(data)
    //         dispatch({
    //             type: 'ADD_TO_BASKET',
    //             item: {
    //                 id: id,
    //                 title: title,
    //                 image: image,
    //                 price: price,
    //                 rating: rating
    //             },
    //         })
    //     }
    //     async function updateBasket() {
    //         await fetch('http://localhost:9000/giftstore/updatebasket',
    //             {
    //                 method: 'POST', headers: { 'Content-type': 'application/json' },
    //                 body: JSON.stringify(basket)
    //             }).then(res => {
    //                 res.json()
    //                 console.log(res)
    //             })
    //     }

    //     updateBasket();
    //     getBasket();
    // }, [])

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            },
        })
    }
    const addProducts = () => {
        dispatch({
            type: 'ADD_PRODUCTS',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
                description: description
            },
        })
    }
    const removeGift = async (event) => {
        console.log(event)
        // const data = { modelNo: id }
        // console.log(data)
        // const returned = await fetch('http://localhost:9000/giftstore/product/removeGift', {
        //     method: 'POST', headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // const response = await returned.json()
        // console.log(response)
    }
    const updateRating = async (data) => {
        const returned = await fetch('http://localhost:9000/giftstore/product',
            {
                method: 'PATCH', headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })
        const response = await returned.json();
        console.log(response)
    }
    return (
        <div className="product">
            <div className="product__info">
                <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'black' }} onClick={addProducts}>
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
                    size='50px'
                    edit={true}
                    isHalf={true}
                    onChange={(newRating) => {
                        setRates(newRating)
                        const data = { modelNo: id, rating: newRating }
                        updateRating(data)
                    }}
                />
            </div>
            <div style={{ textDecoration: 'none', color: 'black', height: '200px', marginBottom: '15px' }}>
                <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'black' }} onClick={addProducts}>
                    <img className="image" src={image} alt="product" />
                </Link>
            </div>
            {isAdmin ? <button onClick={() => removeFun({ modelNo: id })}>Remove Gift</button> : <button onClick={addToBasket}>Add to Basket</button>}
        </div >
    );
}

export default Product;