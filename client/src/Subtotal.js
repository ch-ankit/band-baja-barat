import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format'
import './Subtotal.css'
import { useSelector } from 'react-redux';
import { useStateValue } from './StateProvider';

function Subtotal({ basketValues }) {
    const [{ }, dispatch] = useStateValue()
    const userData = useSelector(state => state.userData)
    const { userName, points } = userData[0]
    let totalValue = 0
    let totalQuantity = 0
    if (basketValues.length !== 0) {
        basketValues.forEach((element) => {
            totalValue = (element.price * element.quantity) + totalValue
            totalQuantity = element.quantity + totalQuantity
        })
    }

    const updatePoints = async () => {
        const data = {
            userName: userName,
            points: parseInt(points - totalValue)
        }
        const response = await fetch('http://localhost:9000/userhome/user',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        const { status } = await response.json();
        if (status === "success") {
            dispatch({ type: "EMPTY_BASKET", items: {} })
            //Fetch to order

            await fetch(`http://localhost:9000/giftstore/basket?checkout=1`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userName: userName })
            })
        }
    }
    const conditionalButton = (points < totalValue) ? <button className="disabled__subtotal" disabled>Proceed to Checkout</button> : <button onClick={updatePoints}>Proceed to Checkout</button>

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({totalQuantity} items): <strong>{`${value} Store Points`}</strong>
                        </p>
                    </>
                )}
                decimaScale={2}
                value={totalValue}
                displayType={"text"}
                thousandSeparator={true}
            />
            {conditionalButton}
        </div>
    );
}

export default Subtotal;