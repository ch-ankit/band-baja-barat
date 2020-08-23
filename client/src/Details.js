import React, { useState, useEffect } from 'react';
import Header from './Header';
import ReactStars from "react-rating-stars-component";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import './Details.css'
import { useStateValue } from './StateProvider';

function Details(props) {
    const [{ basket, product, isAdmin, user }, dispatch] = useStateValue()
    const { id, image, description, price, title, rating } = product
    let [addedQuantity, setAddedQuantity] = useState(1)
    let [productRating, setproductRating] = useState()
    let rated = 0.0;

    useEffect(() => {
        async function productRating() {
            const response = await fetch(`http://localhost:9000/giftstore/rating?userName=${user.userName}&modelNo=${id}`)
            const rating = await response.json()
            setproductRating(rating.data)
        }

        // async function getBasket() {
        //     const response = await fetch('http://localhost:9000/giftstore/basketdata')
        //     const data = await response.json();
        //     console.log(data)
        //     dispatch({
        //         type: 'ADD_TO_BASKET',
        //         item: {
        //             id: id,
        //             title: title,
        //             image: image,
        //             price: price,
        //             rating: rating
        //         },
        //     })
        // }
        // async function updateBasket() {
        //     await fetch('http://localhost:9000/giftstore/updatebasket',
        //         {
        //             method: 'POST', headers: { 'Content-type': 'application/json' },
        //             body: JSON.stringify(basket)
        //         }).then(res => {
        //             res.json()
        //             console.log(res)
        //         })
        // }
        productRating()
        // updateBasket();
        // getBasket();
    }, [])

    if (productRating !== undefined) { rated = productRating[0].value } else { rated = `${0.0}` }
    const addToBasket = () => {
        let totalPrice = addedQuantity * price;
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: totalPrice,
                rating: rating,
                quantity: addedQuantity
            },
        })

    }
    const addQuantity = () => {
        let newQuantity = addedQuantity + 1;
        setAddedQuantity(newQuantity)
    }

    const removeQuantity = () => {
        let newQuantity = (addedQuantity === 0) ? 0 : (addedQuantity - 1);
        setAddedQuantity(newQuantity)
    }
    let addButton = (addedQuantity === 0) ? <button onClick={addToBasket} disabled>Add to Basket</button> : <button onClick={addToBasket}>Add to Basket</button>
    return (
        <div className="details">
            <Header />
            <div className="details__body">
                <img className="details__image" src={image} />
                <div className="details__description">
                    <h2>{title}</h2>
                    <div className="rating">
                        <ReactStars
                            count={5}
                            value={rating}
                            color='gray'
                            activeColor='#ffd700'
                            size='50px'
                            edit={true}
                            isHalf={true}
                        />
                        <span>You have rated: {rated}</span>
                    </div>
                    <p>{description}</p>
                    <p className="price">
                        <small>Rs.</small>
                        <small>{price}</small>
                    </p>
                    <div className="product__quantity">
                        <p>Quantity:</p>
                        <div className="product__quantityView">
                            <div onClick={removeQuantity}><RemoveIcon /></div>
                            <span>{addedQuantity}</span>
                            <div onClick={addQuantity}><AddIcon /></div>
                        </div>
                    </div>
                    {addButton}
                </div>
            </div>
        </div>
    );
}

export default Details;