import React from 'react';
import AddCreditItems from './AddCreditItems';
import Header from './Header'
import './Payment.css'

function Payment(props) {
    return (
        <div className="payment">
            <div className="payment__header"><Header /></div>
            <div className="payment__giftstore">
                <h1>BBB Giftstore</h1>
                <h3>Add Credits to Your Account</h3>
            </div>
            <div>
                <AddCreditItems />
            </div>
        </div>
    );
}

export default Payment;