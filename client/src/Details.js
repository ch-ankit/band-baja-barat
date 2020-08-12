import React from 'react';
import Header from './Header';
import './Details.css'
import { useStateValue } from './StateProvider';

function Details(props) {
    const [{ product }] = useStateValue()
    const { id, image, description, price, title, rating } = product
    return (
        <div className="details">
            <Header />
            <div className="details__body">
                <img className="details__image" src={image} />
                <div className="details__description">
                    <h2>{title}</h2>
                    <div className="product__rating">
                        {
                            Array(rating)
                                .fill()
                                .map((_) =>
                                    <span>⭐</span>
                                )
                        }
                    </div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default Details;