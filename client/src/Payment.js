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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', backgroundColor: 'white' }}>
                <p>
                    Currency Exchange Rate: <strong>Rs. 10 = 1 Store Point</strong><br />
                    Once the money is exchanged for store points it is not redeemable back to currency.
                </p>
                <strong>Please read this carefully!!</strong>
                Thank You
            </div>
            <div>
                <AddCreditItems />
            </div>
        </div>
    );
}

export default Payment;