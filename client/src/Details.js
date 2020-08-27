import React, { useState, useEffect } from 'react';
import Header from './Header';
import ReactStars from "react-rating-stars-component";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import './Details.css'
import { useStateValue } from './StateProvider';

function Details(props) {
    const [{ product, isAdmin, user }, dispatch] = useStateValue()
    const { id, image, description, price, title, rating } = product
    const [addedQuantity, setAddedQuantity] = useState(1)
    const [productRating, setproductRating] = useState([])
    const [userBasket, setUserBasket] = useState([])
    const [edit, setEdit] = useState(false)
    const [prodRating, setProdRating] = useState(0)
    const [editableDescription, setEditabledescription] = useState(description)
    let rated = 0.0;

    useEffect(() => {
        async function productRating() {
            const response = await fetch(`http://localhost:9000/giftstore/rating?userName=${user.userName}&modelNo=${id}`)
            const newRating = await response.json()
            if (newRating.data.length !== 0) {
                setproductRating(newRating.data)
            }
        }
        productRating()
    }, [prodRating])
    useEffect(() => {
        async function getBasket() {
            const response = await fetch(`http://localhost:9000/giftstore/basket?userName=${user.userName}`)
            const { status, data } = await response.json();
            setUserBasket(data)
        }
        getBasket();
    }, [addedQuantity])

    const updateRating = async (data) => {
        let name = 'POST'
        if (productRating.length !== 0) {
            name = 'PATCH'
        }
        await fetch(`http://localhost:9000/giftstore/rating?modelNo=${data.modelNo}&userName=${user.userName}`,
            {
                method: name, headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ value: data.rating })
            })
    }


    const addToBasket = async () => {
        let totalPrice = addedQuantity * price;
        let name = 'POST'
        let prevQuantity = 0
        if (userBasket.length !== 0) {
            const index = Object.keys(userBasket).findIndex((item) => userBasket[item].modelNo === id)
            index === -1 ? name = 'POST' : name = 'PATCH'
            index === -1 ? prevQuantity = 0 : prevQuantity = userBasket[index].quantity
        }
        const basketToDb = {
            userName: user.userName,
            modelNo: id,
            quantity: addedQuantity + prevQuantity
        }
        await fetch('http://localhost:9000/giftstore/basket',
            {
                method: name, headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(basketToDb)
            }).then(res => {
                res.json()
                console.log(res)
            })
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
        setAddedQuantity(1)
    }
    const addQuantity = () => {
        let newQuantity = addedQuantity + 1;
        setAddedQuantity(newQuantity)
    }

    const removeQuantity = () => {
        let newQuantity = (addedQuantity <= 1) ? 1 : (addedQuantity - 1);
        setAddedQuantity(newQuantity)
    }

    const removeIcon = addedQuantity <= 1 ? <div onClick={removeQuantity} className='disabled'><RemoveIcon /></div> : <div onClick={removeQuantity}><RemoveIcon /></div>
    if (productRating.length !== 0) { rated = productRating[0].value }
    const star = Object.keys(productRating).map((item) =>
        <ReactStars
            count={5}
            value={productRating[item].value}
            color='gray'
            activeColor='#ffd700'
            edit={true}
            isHalf={true}
            onChange={(newRating) => {
                const data = { modelNo: id, rating: newRating }
                setProdRating(newRating)
                updateRating(data)
            }}
        />)
    const handleSubmit = async () => {
        const response = await fetch('http://localhost:9000/giftstore/product',
            {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                // body: JSON.stringify()
            }
        )
    }
    return (
        <div className="details">
            <div className="details__body">
                <img className="details__image" src={image} />
                <div className="details__description">
                    <h2>{title}</h2>
                    <div className="rating">
                        {!isAdmin && (productRating.length !== 0 ? star :
                            <ReactStars
                                count={5}
                                value={0}
                                color='gray'
                                activeColor='#ffd700'
                                edit={true}
                                isHalf={true}
                                onChange={(newRating) => {
                                    const data = { modelNo: id, rating: newRating }
                                    setProdRating(newRating)
                                    updateRating(data)
                                }}
                            />)}
                        <span>Average Rating: {rating}</span>
                    </div>
                    {edit ? <form onSubmit={handleSubmit}><textarea type='text' value={editableDescription} onChange={e => setEditabledescription(e.target.value)} /></form> : <p>{description}</p>}
                    {isAdmin && <button type='submit' onClick={() => setEdit(!edit)}>{edit ? 'Save' : 'Edit'}</button>}
                    <p className="price">
                        <small>Rs.</small>
                        <small>{price}</small>
                    </p>
                    <div className="product__quantity">
                        <p>Quantity:</p>
                        <div className="product__quantityView">
                            {removeIcon}
                            <span>{addedQuantity}</span>
                            <div onClick={addQuantity}><AddIcon /></div>
                        </div>
                    </div>
                    {!isAdmin && <button onClick={addToBasket}>Add to Basket</button>}
                </div>
            </div>
        </div>
    );
}

export default Details;