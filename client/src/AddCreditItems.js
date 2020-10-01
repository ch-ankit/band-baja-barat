import React, { useEffect, useState } from 'react';
import './AddCreditItems.css'
import { v4 as uuidv4 } from 'uuid'
import KhaltiCheckout from "khalti-checkout-web";
import { useSelector } from 'react-redux';

function AddCreditItems(props) {
    const userData = useSelector(state => state.userData)
    const { userName, email } = userData[0]
    const [points, setPoints] = useState(0)
    const [userPoints, setUserPoints] = useState(0)
    useEffect(() => {
        async function getPoints() {
            const response = await fetch(`http://localhost:9000/login/user`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
            const { data } = await response.json()
            const { points } = data[0]
            setUserPoints(points)
        }
        getPoints()
    }, [points])
    const coins = [
        { storePoints: 10000, price: 100000 },
        { storePoints: 9000, price: 90000 },
        { storePoints: 8000, price: 80000 },
        { storePoints: 7000, price: 70000 },
        { storePoints: 6000, price: 60000 },
        { storePoints: 5000, price: 50000 },
        { storePoints: 4000, price: 40000 },
        { storePoints: 3000, price: 30000 },
        { storePoints: 2000, price: 20000 },
        { storePoints: 1000, price: 10000 },
        { storePoints: 500, price: 5000 },
        { storePoints: 100, price: 1000 },
    ]
    const [value, setValue] = useState(coins[0].price)
    const [pointToAdd, setPointToAdd] = useState(0)
    const options = Object.keys(coins).map(items => <option key={uuidv4()} value={coins[items].price}>{coins[items].storePoints}</option>)

    let config = {
        // replace this key with yours
        "publicKey": "test_public_key_3dfbf001a2144170ad9c0007c1d3c778",
        "productIdentity": "1234567890",
        "productName": `Points brought from store ${value}`,
        "productUrl": "https://www.snopes.com/tachyon/2020/07/coins_fran_trudeau_flickr.jpg",
        "eventHandler": {
            onSuccess(payload) {
                // hit merchant api for initiating verfication
                async function addPaid(payload) {
                    const updatedPoint = parseInt(value / 10) + userPoints
                    const response = await fetch(`http://localhost:9000/userhome/user`, {
                        method: 'PATCH',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({ userName: userName, points: updatedPoint })
                    })
                    const { detail, tries_remaining } = payload
                    if (detail !== undefined) {
                        alert(`${detail}. Tries remaining :${tries_remaining}`)
                    }
                    setTimeout(() => {
                        alert('Payment Successful!!')
                        window.location.reload()
                    }, 1000)
                }
                addPaid(payload);
                console.log(payload)
            },
            // onError handler is optional
            onError(error) {
                // handle errors

                console.log(error);
            },
            onClose() {
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI"],
    };

    let checkout = new KhaltiCheckout(config);
    const handleClick = (pricePaid) => {
        // minimum transaction amount must be 10, i.e 1000 in paisa.
        checkout.show({ amount: pricePaid * 100 });
    }
    return (
        <div className="product" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div style={{ textDecoration: 'none', color: 'black', height: '200px', marginBottom: '15px' }}>
                <img className="image" src="https://www.snopes.com/tachyon/2020/07/coins_fran_trudeau_flickr.jpg" alt="coins" />
            </div>
            Select Store Points:
            <select value={value} className="custom-select" onChange={(evt) => setValue(evt.target.value)}>
                {options}
            </select>
            <button className="payment__button" onClick={() => handleClick(value)}>Pay With Khalti</button>
        </div >
    );
}

export default AddCreditItems;