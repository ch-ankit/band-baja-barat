import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format'
import './Subtotal.css'
import { useSelector } from 'react-redux';
import { useStateValue } from './StateProvider';



function Subtotal({ data, message }) {
    const [{ }, dispatch] = useStateValue()
    const updateMessage = useSelector(state => state.updateMessage)
    const paid = useSelector(state => state.paid)
    const userData = useSelector(state => state.userData)
    const [userPoints, setUserPoints] = useState(0)
    const { userName, email } = userData[0]
    const [basketData, setBasketData] = useState([]);
    let totalValue = 0
    let totalQuantity = 0
    let basketDataValues = []
    let basketValues = []


    useEffect(() => {
        async function getUserData() {
            const response = await fetch('http://localhost:9000/login/user', {
                body: JSON.stringify({
                    email: email
                }),
                headers: { "Content-type": "application/json" },
                method: "post"
            });
            const { data } = await response.json();
            setUserPoints(data[0].points)
        }
        getUserData();
    }, [paid])

    useEffect(() => {
        async function getBasket() {
            const response = await fetch(`http://localhost:9000/giftstore/basket?userName=${userName}`)
            const { data } = await response.json()
            setBasketData(data)
        }
        getBasket()
    }, [updateMessage, message, paid])

    if (basketData.length !== 0) {
        basketData.forEach(element => {
            const index = Object.keys(data).findIndex(product => element.modelNo === data[product].modelNo)
            basketDataValues.push({ ...data[index], quantity: element.quantity, eventId: element.eventId })
        })
        basketValues = basketDataValues
    }

    if (basketValues.length !== 0) {
        basketValues.forEach((element) => {
            totalValue = (element.price * element.quantity) + totalValue
            totalQuantity = element.quantity + totalQuantity
        })
    }
    const updatePoints = async () => {
        const data = {
            userName: userName,
            points: parseInt(userPoints - totalValue)
        }
        const response = await fetch('http://localhost:9000/userhome/user',
            {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        const { status } = await response.json();
        if (status === "success") {
            dispatch({ type: "EMPTY_BASKET", items: {} })
            //Fetch to order
            basketValues.forEach(element => {
                const values = {
                    giftId: element.modelNo,
                    quantity: element.quantity,
                    price: element.price,
                    eventId: element.eventId,
                    orderStatus: 'SHIPPING',
                    userName: userName,
                    orderedDate: (new Date().getFullYear() + `-${new Date().getMonth() + 1}` + `-${new Date().getDate()}`)
                }
                async function postProduct(items) {
                    const response = await fetch(`http://localhost:9000/giftstore/orders`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(items)
                    })
                }
                postProduct(values)
            })


            await fetch(`http://localhost:9000/giftstore/basket?checkout=1`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userName: userName })
            })
            window.location.reload()
        }
    }
    const conditionalButton = (userPoints < totalValue) ? <button className="disabled__subtotal" data-toggle="tooltip" data-placement="bottom" title="You don't have enough store points to checkout" disabled>Proceed to Checkout</button> : <button onClick={updatePoints}>Proceed to Checkout</button>

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