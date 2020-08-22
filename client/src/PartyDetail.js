import React, {useState} from 'react';
import './PartyDetail.css'
import Carousel from 'react-bootstrap/Carousel'
import binvite from './images/binvite.jpg'
import explore from './images/explore.jpeg'
import explore1 from './images/explore1.jpeg';
import TextField from '@material-ui/core/TextField'
import {useParams} from 'react-router-dom';
import Gallery from './Gallery.js'
import Booking from './Booking.js';
function PartyDetail() {
    let name=useParams();
    const [gallery, setgallery] = useState(false);
    const [book, setbook] = useState(false);
    console.log(name);
    return (
        <div className="partyDetail">
            <Carousel className='partyDetail__Carousel'> 
                <Carousel.Item>
                    <img src={binvite} className='partyDetail__CImage'/>
                <Carousel.Caption>
                    Hello
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={explore}  className='partyDetail__CImage'/>
                <Carousel.Caption>
                    there
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={explore1}  className='partyDetail__CImage'/>
                <Carousel.Caption>
                    Hello
                </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className='partyDetail__Detail'>
                <div className="partyDetail__leftPart">
                    <div onClick={()=>{setgallery(false); setbook(false)}}>Home</div>
                    <div onClick={()=>{setgallery(true); setbook(false)}}>Gallery</div>
                    <div onClick={()=>{setgallery(false); setbook(true)}}>Book now</div>
                </div>
                <div className='partyDetail__centerPart'>
                    {gallery ? <Gallery/> :(book ? <Booking />:<h1>{name['party']}</h1>)};
                </div>
                <div className="partyDetail__rightPart">
                    <h2>Booked Date</h2>
                    <ul>
                        <li>2020-01-20</li>
                        <li>2020-10-20</li>
                        <li>2020-11-10</li>
                        <li>2020-09-01</li>
                        <li>2020-01-30</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PartyDetail
