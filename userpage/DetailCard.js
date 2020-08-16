import React from 'react'
import "./DetailCard.css"
import {Link } from 'react-router-dom'
function DetailCard({image,name,details}) {
    return (
        <div className="detailCard">
                <img src={image} alt={name} className="detailCard__image" />
            <div className="detailCard__detail">
                <h2>{name}</h2>
                <p>{details.substr(0,250)} <Link>...See More</Link></p>
            </div>            
        </div>
    )
}

export default DetailCard 
