import React from 'react';
import explore3 from './images/explore3.jpg'
import {useParams} from 'react-router-dom'
import './BandDetail.css'
function BandDetail() {
    let bandName=useParams();
    
    return (
        <div className="bandDetail">
            <img src={explore3} className='bandDetail__image' />
            <h1>{bandName['band']}</h1>
            <div className='bandDetail__detail'>
                <h4>Details</h4>
                <div className="bandDetail__contact">
                    <h4>Contact Info</h4>
                        9879687750
                </div>
            </div>
        </div>
    )
}

export default BandDetail
