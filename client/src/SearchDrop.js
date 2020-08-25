import React from 'react';
import './SearchDrop.css'
import { Link } from 'react-router-dom';

function SearchDrop({ image, name, modelNo }) {
    return (
        <Link className="searchdrop" to={`/products/${modelNo}`}>
            <img className="searchdrop__image" src={image} />
            <span>{name}</span>
        </Link>
    );
}

export default SearchDrop;