import React, { useState } from 'react';
import './Host.css'
import Carousel from 'react-bootstrap/Carousel'
import binvite from './images/binvite.jpg'
import explore from './images/explore.jpeg'
import explore1 from './images/explore1.jpeg';
import TextField from '@material-ui/core/TextField'
import { useParams } from 'react-router-dom';
import Gallery from './Gallery.js'
import Booking from './Booking.js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import UserHeader from './UserHeader.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Hauth } from './hostFirebaseConfig'
import { useDispatch } from 'react-redux';
import { Hostuid, EventData } from './redux/action.js';
import { useHistory } from 'react-router-dom'
import EventDetail from './EventDetail.js';
import HostHeader from './HostHeader.js';
function Host() {
    const history = useHistory();
    const [book, setbook] = useState(false);
    const [Photo, setPhoto] = useState([]);
    const [data, setdata] = useState([]);
    const [RequestData, setRequestData] = useState([]);
    const [UpcomingData, setUpcomingData] = useState([]);
    const [ApprovedData, setApprovedData] = useState([]);
    const hostUid = useSelector(state => state.hostUid);
    const dispatch = useDispatch();
    useEffect(() => {
        async function getHostData() {
            const response = await fetch('http://localhost:9000/host?email=presentator7@gmail.com');
            const allData = await response.json();
            setdata(allData.rows);
            setPhoto(allData.rows2);
            console.log(data)
        }
        getHostData();
    }, [])
    useEffect(() => {
        async function getRequestData() {
            const response = await fetch("http://localhost:9000/host/requests?vatNo=771982")
            const allData = await response.json();
            setRequestData(allData.data)
        }
        getRequestData();
        async function getUpcomingData() {
            const response = await fetch("http://localhost:9000/host/upcoming?vatNo=771982")
            const allData = await response.json();
            setUpcomingData(allData.data)
        }
        getUpcomingData();
        async function getApprovedData() {
            const response = await fetch("http://localhost:9000/host/approved?vatNo=771982")
            const allData = await response.json();
            setApprovedData(allData.data)
        }
        getApprovedData();
    }, [data])

    return (
        <div>
            {hostUid ? '' : history.push('/')}
            <HostHeader />
            {Object.keys(data ?? []).map((keys) => {
                return (<div className='host'>
                    <div className='host__leftPart'>
                        {book ? <Booking /> : (
                            <div>
                                <div className="host__infoHeader">
                                    <h3>{data[keys].hostName}</h3>
                                    <p>Wedding venue</p>
                                    <Carousel className='host__Carousel'>
                                        {Object.keys(Photo).map((keys) => {
                                            if (keys < 3) {
                                                return (
                                                    <Carousel.Item>
                                                        <img src={Photo[keys].photo} className='host__CImage' />
                                                        <Carousel.Caption>
                                                            {Photo[keys].caption}
                                                        </Carousel.Caption>
                                                    </Carousel.Item>
                                                )
                                            }
                                        })}
                                    </Carousel>
                                    <div className='host__info1'>
                                        <h6>{data[keys].city}</h6>
                                    </div>
                                    <div className='host__info2'>
                                        <h6>Price per Plate</h6>
                                    </div>
                                </div>
                                <div className='host__details'>
                                    <h4>About us</h4>
                                    <hr />
                                    {data[keys].description}
                                </div>

                                <div className='host__fullGallery'>
                                    <Gallery />
                                </div>
                            </div>)}
                    </div>
                    <div className='host__rightPart'>
                        <div className='host__request'>
                            <h4>Requested</h4>
                            <List>
                                {Object.keys(RequestData).map((keys) => {
                                    return (
                                        <Link to='host/events'>
                                            <ListItem button key={keys} onClick={() => dispatch(EventData(RequestData[keys]))}>
                                                <ListItemText>
                                                    {RequestData[keys].eventName}
                                                </ListItemText>
                                            </ListItem>
                                        </Link>
                                    )
                                })
                                }
                            </List>
                        </div>
                        <div className='host__upcomingEvents'>
                            <h4>Upcoming Events</h4>
                            <List>
                                {Object.keys(UpcomingData).map((keys) => {
                                    return (
                                        <Link to='host/events'>
                                            <ListItem button key={keys} onClick={() => dispatch(EventData(UpcomingData[keys]))} >
                                                <ListItemText>
                                                    {UpcomingData[keys].eventName}
                                                </ListItemText>
                                            </ListItem>
                                        </Link>
                                    )
                                })
                                }
                            </List>
                        </div>
                        <div className='host__approvedEvents'>
                            <h4>Approved Events</h4>
                            <List>
                                {Object.keys(ApprovedData).map((keys) => {
                                    return (
                                        <ListItem button key={keys}>
                                            <ListItemText>
                                                {ApprovedData[keys].eventName}
                                            </ListItemText>
                                        </ListItem>
                                    )
                                })
                                }
                            </List>
                        </div>
                        <div className='host__Gallery'>
                            <h4>Top photos</h4>
                            <hr />
                            <div className="host__images">
                                {Object.keys(Photo).map((keys) => {
                                    if (keys < 5) {
                                        return (
                                            <img src={Photo[keys].photo} alt="image" className='host__GImage' />
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default Host
