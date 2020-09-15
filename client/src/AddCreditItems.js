import React, { useState } from 'react';
import './AddCreditItems.css'
import KhaltiCheckout from "khalti-checkout-web";

function AddCreditItems(props) {
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
    const options = Object.keys(coins).map(items => <option value={coins[items].price}>{coins[items].storePoints}</option>)
    const handleChange = (evt) => {
        setValue(evt.target.value)
    }
    let config = {
        // replace this key with yours
        "publicKey": "test_public_key_dc78e3fd24cb34cd89123aee8a5569",
        "productIdentity": "1234567890",
        "productName": "Drogon",
        "productUrl": "http://gameofthrones.com/buy/Dragons",
        "eventHandler": {
            onSuccess(payload) {
                // hit merchant api for initiating verfication
                console.log(payload);
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
            <div className="product__info">
                {/* <p>{title}</p>
                <p className="product__price">
                    <small>Rs.</small>
                    <small>{price}</small>
                </p> */}
            </div>
            <div style={{ textDecoration: 'none', color: 'black', height: '200px', marginBottom: '15px' }}>
                <img className="image" src="https://www.snopes.com/tachyon/2020/07/coins_fran_trudeau_flickr.jpg" alt="coins" />
            </div>
            Select Store Points:
            <select value={value} className="custom-select" onChange={handleChange}>
                {options}
            </select>
            <button className="payment__button" onClick={() => handleClick(value)}>Pay With Khalti</button>
        </div >
    );
}

export default AddCreditItems;