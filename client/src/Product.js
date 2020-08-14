import React from 'react';
import './Product.css'
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom'

function Product({ id, title, price, rating, image, description, removeFun }) {
    const [{ basket, isAdmin }, dispatch] = useStateValue();

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
                <div className="product__rating">
                    {
                        Array(rating)
                            .fill()
                            .map((_) =>
                                <span>⭐</span>
                            )
                    }
                </div>
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