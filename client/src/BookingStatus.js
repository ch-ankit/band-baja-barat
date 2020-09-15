import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import './BookingStatus.css'
import UserHeader from './UserHeader.js';
function BookingStatus() {
    const [data, setdata] = useState([])
    const Username=useSelector(state => state.userData[0].userName)
    const admin=useSelector(state=>state.admin1);
    useEffect(() => {
        async function getBookingData() {
            const response = await fetch(`http://localhost:9000/userhome/myevents?userName=${Username}`);
            const allData = await response.json();
            setdata(allData.data)
        }
        getBookingData();
   
        
    }, [])
    return (
        <div>
        <UserHeader />
        <div className='bookingStatus'>
            <List>
                {console.log(data)}
            {Object.keys(data).map((keys)=>{
                return(
                <ListItem button className='bookingStatus__list' style={{backgroundColor:'green',marginTop:'15px'}}>
                    <ListItem key={keys} >
                        {data[keys].eventName}
                    </ListItem>
                </ListItem>
                )
            })}
            </List>        
        </div>
        </div>
    )
}

export default BookingStatus
