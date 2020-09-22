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
import {Link} from 'react-router-dom'
import UserHeader from './UserHeader.js';
function PartyDetail() {
    let name=useParams();
    const [book, setbook] = useState(false);
    const vatNo=useSelector(state=>state.vatNo);
    const [Photo, setPhoto] = useState([]);
    const [data, setdata] = useState([]);
    const [contact, setcontact] = useState(false)
    useEffect(() => {
        async function getHostData() {
            const response = await fetch(`http://localhost:9000/host?vatNo=${vatNo}`);
            const allData = await response.json();
            setdata(allData.rows ?? []);
            setPhoto(allData.rows2);
            console.log(data)
        }
        getHostData();
    }, [])
    
    return (
         <div>
             <UserHeader />
            {Object.keys(data).map((keys)=>{
            return(<div className='partyDetail'>
                <div className='partyDetail__leftPart'>
                    {book? <Booking />: (
                    <div>
                    <div className="partyDetail__infoHeader">
                        <h3>{data[keys].hostName}</h3>
                        <p>Wedding venue</p>
                        <Carousel className='partyDetail__Carousel'>
                        {Object.keys(Photo).map((keys)=>{
                        if(keys<3){
                        return(
                            <Carousel.Item>
                                <img src={Photo[keys].photo} className='partyDetail__CImage' />
                                <Carousel.Caption>
                                    {Photo[keys].caption}
                                </Carousel.Caption>
                            </Carousel.Item>
                        )}})}
                        </Carousel>
                        <div className='partyDetail__info1'>
                            <h6>{data[keys].city}</h6>
                        </div>
                        <div className='partyDetail__info2'>
                            <h6>Price per Plate</h6>
                        </div>
                    </div>
                    <div className='partyDetail__details'>
                        <h4>About us</h4>
                        <hr/>
                        {data[keys].description}
                    </div>
                    </div>)}
                </div>
                <div className='partyDetail__rightPart'>
                    <div className='partyDetail__book'>
                        <h4>Connect with this vendor</h4>
                        <hr/>
                        <button className='partyDetail__button' onClick={()=>setbook(!book)}>{book?(<h2>Host page</h2>):(<h2>Book now</h2>)}</button>
                        <button className='partyDetail__button' onClick={()=>setcontact(!contact)}>{contact?(<h2>Booked Date</h2>):(<h2>Get Contact Info</h2>)}</button>
                        <hr/>
                        {contact? (<div>
                            <h5>Contact Info</h5>
                            <ul>
                        <li>{data[keys].contactInfo}</li>
                        <li>{data[keys].email}</li>
                            </ul>
                        </div>) :(<div>
                        <h5>Booked Date</h5>
                        <ul>
                            <li>29 September</li>
                            <li>21 October</li>
                            <li>09 November</li>
                            <li>2 December</li>
                        </ul></div>)}
                    </div>
                    <div className='partyDetail__googleMap'>
                        <iframe src={`https://maps.google.com/maps?q= ${data[keys].latitude}, ${data[keys].longitude}&z=15&output=embed`} width="100%" height="200px" frameborder="0" style={{border:"0"}}></iframe>
                    </div>
                    <div className='partyDetail__Gallery'>
                            <h4>Top photos</h4>
                            <hr />
                            <div className="partyDetail__images">
                                {Object.keys(Photo).map((keys)=>{
                                    if(keys < 5){
                                    return(
                                        <img src={Photo[keys].photo} alt="image"  className='partyDetail__GImage'/>
                                    );}
                                })}
                            </div>
                    </div>
                </div>
                
            </div>
            )})}
        </div>
    )
}

export default PartyDetail
