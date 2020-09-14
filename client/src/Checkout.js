import React, { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct'
import { v4 as uuidv4 } from 'uuid'

import './Checkout.css'
import Subtotal from './Subtotal';
import { useSelector } from 'react-redux';
function Checkout(props) {
    const [{ user }, dispatch] = useStateValue();
    const userData = useSelector(state => state.userData)
    const { userName } = userData[0]
    let [data, setData] = useState([]);
    const [basketData, setBasketData] = useState([]);
    let [message, setMessage] = useState('')
    let basketDataValues = []
    useEffect(() => {
        async function getBasket() {
            const response = await fetch(`http://localhost:9000/giftstore/basket?userName=${userName}`)
            const { data } = await response.json()
            setBasketData(data)
        }
        async function fetchData() {
            const res = await fetch("http://localhost:9000/giftstore/product");
            const send = await res.json();
            setData(send.data);
        }
        fetchData();
        getBasket()
    }, [message, userData])


    if (basketData.length !== 0) {
        basketData.forEach(element => {
            const index = Object.keys(data).findIndex(product => (element.modelNo === data[product].modelNo))
            basketDataValues.push({ ...data[index], quantity: element.quantity, eventId: element.eventId })
        })
    }

    const removeFromBasket = async ({ id, eventId }) => {
        const dbBody = {
            userName: userName,
            modelNo: id,
            eventId: eventId
        }
        const response = await fetch('http://localhost:9000/giftstore/basket',
            {
                method: 'DELETE', headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(dbBody)
            })
        const { message } = await response.json()
        setMessage(message)
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    let hello;
    if (basketDataValues[0] !== undefined) {
        hello = Object.keys(basketDataValues).map(item => (
            <CheckoutProduct
                key={uuidv4()}
                id={basketDataValues[item].modelNo}
                title={basketDataValues[item].name}
                image={basketDataValues[item].photo}
                price={basketDataValues[item].price}
                rating={basketDataValues[item].rating}
                quantity={basketDataValues[item].quantity}
                eventId={basketDataValues[item].eventId}
                removeFun={removeFromBasket}
                userName={userName}
            />
        )
        )
    }
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt="ad"
                />
                {basketData.length === 0 ? (
                    <div>
                        <h2>Your basket is empty</h2>
                        <p>
                            You have no items in your basket. To buy one go to home and click "Add to Basket" next to the item
                    </p>
                    </div>
                ) : (
                        <div>
                            <h2 className="checkout__title">Your Shopping Basket</h2>
                            {/* List out all checkout Product */}
                            {hello}
                        </div>
                    )}
            </div>
            {(basketDataValues[0] !== undefined) &&
                <div className="checkout__right">
                    <Subtotal data={data} message={message} />
                </div>
            }

        </div>
    );
}

export default Checkout;