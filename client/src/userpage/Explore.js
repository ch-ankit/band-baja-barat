import React from 'react'
import ExploreCard from './ExploreCard'
import './Explore.css'
import {Link,BrowserRouter as Router} from "react-router-dom"

function Explore() {
    
    return (
        <Router>
        <div className="explore">
            <h1>Explore BBB</h1>
            <div className='explore__card'>
                <Link to="/party">
                    <ExploreCard image="https://suvadin.com/uploads/info/thumbnail-1483159012_partypalace.jpg" title="Party Palace" />            
                </Link>
                <Link to="/Bands">
                    <ExploreCard image="https://royalwed.in/images/vendor/band1.jpg" title="Bands" />
                </Link>
                <Link to="/gifts">
                    <ExploreCard image="https://komarketing.com/images/2016/12/Gifts-on-Floor-640x417.jpg" title="Gift Store" />
                </Link>
            </div>
        </div>
        </Router>
    )
}

export default Explore
