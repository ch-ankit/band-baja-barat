import React, { useEffect } from 'react';
import CurrencyFormat from 'react-currency-format'
import './Subtotal.css'
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';

function Subtotal({ basketValues }) {
    const [{ basket }, dispatch] = useStateValue()
    let totalValue = 0
    let totalQuantity = 0
    useEffect(() => { }, [basketValues])
    if (basketValues.length !== 0) {
        basketValues.forEach((element, index) => {
            totalValue = (element.price * element.quantity) + totalValue
            totalQuantity = element.quantity + totalQuantity
        })
    }

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({totalQuantity} items): <strong>{`${value}`}</strong>
                        </p>
                    </>
                )}
                decimaScale={2}
                value={totalValue}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs."}

            />
            <button>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;