import React from 'react';
import './SearchDrop.css'
import { Link } from 'react-router-dom';

function SearchDrop({ image, name, modelNo }) {
    return (
        <Link className="searchdrop" to={`/giftstore/products/details?modelNo=${modelNo}`}>
            <img className="searchdrop__image" src={image} alt='product' />
            <span>{name}</span>
        </Link>
    );
}

export default SearchDrop;