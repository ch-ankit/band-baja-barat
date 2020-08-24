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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
function PartyDetail() {
    let name=useParams();
    const [book, setbook] = useState(false);
    const vatNo=useSelector(state=>state.vatNo);
    const [Photo, setPhoto] = useState([]);
    const [data, setdata] = useState([]);
    useEffect(() => {
        async function getHostData() {
            const response = await fetch(`http://localhost:9000/host?vatNo=${vatNo}`);
            const allData = await response.json();
            setdata(allData.rows);
            setPhoto(allData.rows2);
            console.log(data)
        }
        getHostData();
    }, [])
    
    return (
        <div className="partyDetail">
            <Carousel className='partyDetail__Carousel'> 
            {Object.keys(Photo).map((keys)=>{
                    if(keys < 3){
                      return(  <Carousel.Item key={keys}>
                            <img src={Photo[keys].photo}  className='partyDetail__CImage' />
                            <Carousel.Caption>
                                {Photo[keys].caption}
                            </Carousel.Caption>
                        </Carousel.Item>)
                    }
                })}
            </Carousel>
            <div className='partyDetail__Detail'>
                <div className="partyDetail__detailPart">
                    {Object.keys(data).map((keys)=>{
                        return(< div keys={keys}>
                            <h1>{data[keys].hostName}</h1>
                            {data[keys].description}
                            <hr/>
                            <h2><u>Gallery</u></h2>
                            <div className='partyDetail__gallery'>
                                {Object.keys(Photo).map((keys)=>{
                                    return(<img key={keys} src={Photo[keys].photo} className='partyDetail__galleryImage' />
                                    )
                                })}
                            </div>
                        </div>
                        );
                    })}
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
