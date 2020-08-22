import React, { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct'
import { v4 as uuidv4 } from 'uuid'

import './Checkout.css'
import Subtotal from './Subtotal';
function Checkout(props) {
    const [{ basket, user }, dispatch] = useStateValue();
    let [data, setData] = useState([]);
    const [basketData, setBasketData] = useState([]);
    const [basketQuantity, setBasketQuantity] = useState([])
    let basketDataValues = []
    useEffect(() => {
        async function getBasket() {
            const response = await fetch(`http://localhost:9000/giftstore/basket?userName=${user.userName}`)
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
    }, [])
    if (basketData.length !== 0) {
        basketData.forEach(element => {
            const index = Object.keys(data).findIndex(product => element.modelNo === data[product].modelNo)
            basketDataValues.push(data[index])
            basketQuantity.push(element.quantity)
        })
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
                            {(basketDataValues.length !== 0 && basketDataValues !== undefined) && Object.keys(basketDataValues).map(item => (
                                <CheckoutProduct
                                    key={uuidv4()}
                                    id={basketDataValues[item].modelNo}
                                    title={basketDataValues[item].name}
                                    image={basketDataValues[item].photo}
                                    price={basketDataValues[item].price}
                                    rating={basketDataValues[item].rating}
                                    quantity={basketQuantity[item]}
                                />
                            )
                            )}
                        </div>
                    )}
            </div>
            {basket.length > 0 &&
                <div className="checkout__right">
                    <Subtotal />
                </div>
            }

        </div>
    );
}

export default Checkout;