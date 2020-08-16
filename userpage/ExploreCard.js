import React from 'react'
import './ExploreCard.css'
function ExploreCard({image,title}) {
    return (
        <div className="exploreCard">
            <img src={image} alt={title} className='exploreCard__image'/>
            <h1>{title}</h1>
        </div>
    )
}

export default ExploreCard
