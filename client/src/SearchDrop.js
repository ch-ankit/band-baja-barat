import React from 'react';
import './SearchDrop.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SearchDrop({ image, name, modelNo }) {
    const uid = useSelector(state => state.uid)
    return (
        <Link className="searchdrop" to={uid ? `/giftstore/products/details?modelNo=${modelNo}` : '/SignUp'}>
            <img className="searchdrop__image" src={image} alt='product' />
            <span>{name}</span>
        </Link>
    );
}

export default SearchDrop;