import React, { useState } from 'react';
import './PartyDetail.css'
import Carousel from 'react-bootstrap/Carousel'
import binvite from './images/binvite.jpg'
import explore from './images/explore.jpeg'
import explore1 from './images/explore1.jpeg';
import TextField from '@material-ui/core/TextField'
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Gallery from './Gallery.js'
import Booking from './Booking.js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import UserHeader from './UserHeader.js';
import ReactCalender from './ReactCalender';
import UserGallery from './UserGallery'

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
function PartyDetail({ history }) {
    let name = useParams();
    const classes = useStyles();
    const admin = useSelector(state => state.isAdmin)
    const [book, setbook] = useState(false);
    const vatNo = useSelector(state => state.vatNo);
    const [Photo, setPhoto] = useState([]);
    const [data, setdata] = useState([]);
    const [contact, setcontact] = useState(false)
    const [pending, setPending] = useState([])
    const [pendingPhoto, setPendingPhoto] = useState([])
    const [status, setStatus] = useState('')
    const [bookedDate,setbookedDate]=useState([]);
    const date=new Date();
    const [Halls, setHalls] = useState([]);

    useEffect(() => {
        async function getHostData() {
            const response = await fetch(`http://localhost:9000/host?vatNo=${vatNo}`);
            const allData = await response.json();
            setdata(allData.rows ?? []);
            setPhoto(allData.rows2);
            setHalls(allData.rows1)
            console.log(data)
            console.log(allData)
        }
        getHostData();
    }, [vatNo])
    useEffect(() => {
        async function pendingHost() {
            const response = await fetch(`http://localhost:9000/admin/partypalace?vatNo=${vatNo}`)
            const allData = await response.json()
            setPending(allData.rows ?? [])
            setPendingPhoto(allData.rows2);
            setStatus(allData.rows[0].status)
            
        }
        pendingHost();
    }, [])

    const handleApprove = async () => {
        await fetch(`http://localhost:9000/host`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ vatNo: pending[0].vatNo, status: 'APPROVED' })
        })
        setTimeout(() => window.location.reload(), 1000)
    }
    const handleDelete = async () => {
        await fetch(`http://localhost:9000/host?vatNo=${vatNo}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        history.push('/admin')
    }

    const display = !admin ? Object.keys(data).map((keys) => {
        return (<div className='partyDetail'>
            <div className='partyDetail__leftPart'>{console.log(data,Halls)}
                {book ? <Booking /> : (
                    <div>
                        <div className="partyDetail__infoHeader">
                            <h3>{data[keys].hostName}</h3>
                            <p>Wedding venue</p>
                            <Carousel className='partyDetail__Carousel'>
                                {Object.keys(Photo).map((keys) => {
                                    if (keys < 3) {
                                        return (
                                            <Carousel.Item>
                                                <img src={Photo[keys].photo} className='partyDetail__CImage' />
                                                <Carousel.Caption>
                                                    {Photo[keys].caption}
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        )
                                    }
                                })}
                            </Carousel>
                            <div className='partyDetail__info'>
                                <div>
                                    <div className='partyDetail__info1'>
                                        <h6>{data[keys].city}</h6>
                                    </div>
                                    <div className='partyDetail__info2'>
                                        <h6>Price per Plate</h6>
                                    </div>
                                </div>
                                <div className='partyDetail__info3'>
                                <h6>Total Halls:{data[keys].totalHalls + 1}</h6>
                                </div>
                            </div>
                        </div>
                        <div className='partyDetail__details'>
                            <h4>About us</h4>
                            <hr />
                            <pre style={{whiteSpace:'pre-wrap'}}>{data[keys].description}</pre>
                        </div>
                        <div className='partyDetail__halls'>
                            <h4>Halls</h4>
                            <hr />
                            <div className='partyDetail__hallDetail'>  
                            {Object.keys(Halls).map((keys)=>{
                              return( 
                                   <div>
                                    Hall No :{Halls[keys].hallNo} <br />
                                    Capacity:{Halls[keys].capacity}
                                    </div>)
                                
                            })}
                            </div>
                        </div>
                        <div className='partyDetail__userGallery'>
                            <UserGallery />
                        </div>
                    </div>)}
            </div>
            <div className='partyDetail__rightPart'>
                <div className='partyDetail__book'>
                    <h4>Connect with this vendor</h4>
                    <hr />
                    <button className='partyDetail__button' onClick={() => setbook(!book)}>{book ? (<h2>Host page</h2>) : (<h2>Book now</h2>)}</button>
                    <button className='partyDetail__button' onClick={() => setcontact(!contact)}>{contact ? (<h2>Booked Date</h2>) : (<h2>Get Contact Info</h2>)}</button>
                    <hr />
                    {contact ? (<div>
                        <h5>Contact Info</h5>
                        <ul>
                            <li>{data[keys].contactInfo}</li>
                            <li>{data[keys].email}</li>
                        </ul>
                    </div>) : (<div>
                        <h5>Booked Date</h5>
                            <ReactCalender className='partyDetail__bookedDate' />
                        </div>)}
                        <div className='partyDetail__googleMap'>
                    <iframe src={`https://maps.google.com/maps?q= ${data[keys].latitude}, ${data[keys].longitude}&z=15&output=embed`} width="100%" height="200px" frameborder="0" style={{ border: "0" }}></iframe>
                </div>
                <div className='partyDetail__Gallery'>
                    <h4>Top photos</h4>
                    <hr />
                    <div className="partyDetail__images">
                        {Object.keys(Photo).map((keys) => {
                            if (keys < 5) {
                                return (
                                    <img src={Photo[keys].photo} alt="image" className='partyDetail__GImage' />
                                );
                            }
                        })}
                    
                </div>
            </div>
                    </div>
                
            </div>


        </div>
        )
    }) : (
            Object.keys(pending).map((keys) => {
                return (<div className='partyDetail'>
                    <div className='partyDetail__leftPart'>
                        {book ? !admin && <Booking /> : (
                            <div>
                                <div className="partyDetail__infoHeader">
                                    <h3>{pending[keys].hostName}</h3>
                                    <p>Wedding venue</p>
                                    <Carousel className='partyDetail__Carousel'>
                                        {Object.keys(pendingPhoto).map((keys) => {
                                            if (keys < 3) {
                                                return (
                                                    <Carousel.Item>
                                                        <img src={pendingPhoto[keys].photo} className='partyDetail__CImage' />
                                                        <Carousel.Caption>
                                                            {pendingPhoto[keys].caption}
                                                        </Carousel.Caption>
                                                    </Carousel.Item>
                                                )
                                            }
                                        })}
                                    </Carousel>
                                    <div className='partyDetail__info1'>
                                        <h6>{pending[keys].city}</h6>
                                    </div>
                                    <div className='partyDetail__info2'>
                                        <h6>Price per Plate</h6>
                                    </div>
                                </div>
                                <div className='partyDetail__details'>
                                    <h4>About us</h4>
                                    <hr />
                                    {pending[keys].description}
                                </div>
                            </div>)}
                    </div>
                    <div className='partyDetail__rightPart'>
                        <div className='partyDetail__book'>
                            <h4>Connect with this vendor</h4>
                            <hr />
                            <button className='partyDetail__button' onClick={() => setcontact(!contact)}>{(<h2>Get Contact Info</h2>)}</button>
                            <hr />
                            {contact && (<div>
                                <h5>Contact Info</h5>
                                <ul>
                                    <li>{pending[keys].contactInfo}</li>
                                    <li>{pending[keys].email}</li>
                                </ul>
                            </div>)}
                        </div>
                        <div className='partyDetail__googleMap'>
                            <iframe src={`https://maps.google.com/maps?q= ${pending[keys].latitude}, ${pending[keys].longitude}&z=15&output=embed`} width="100%" height="200px" frameborder="0" style={{ border: "0" }}></iframe>
                        </div>
                        <div className='partyDetail__Gallery'>
                            <h4>Top photos</h4>
                            <hr />
                            <div className="partyDetail__images">
                                {Object.keys(pendingPhoto).map((keys) => {
                                    if (keys < 5) {
                                        return (
                                            <img src={pendingPhoto[keys].photo} alt="image" className='partyDetail__GImage' />
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>

                </div>
                )
            })
        )

    return (
        <div>
            <UserHeader />
            {(admin && status === "PENDING") && (
                <div className='adminHost__accept'>
                    <p>The Party Palace has requested to be a part of our application:</p>
                    <Button
                        style={{ height: '30px' }}
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={handleApprove}
                    >
                        Approve Request
                    </Button>
                    <Button
                        style={{ height: '30px' }}

                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                    >
                        Delete Request
                    </Button>

                </div>

            )}
            {display}
        </div>
    )
}

export default PartyDetail
