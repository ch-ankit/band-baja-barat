import React from 'react';
import Header from './Header';
import ReactStars from "react-rating-stars-component";
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
                        <ReactStars
                            count={5}
                            value={rating}
                            color='gray'
                            activeColor='#ffd700'
                            size='50px'
                            edit={true}
                            isHalf={true}
                        />
                    </div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default Details;