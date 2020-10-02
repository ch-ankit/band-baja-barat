import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import './BookingStatus.css'
import UserHeader from './UserHeader.js';
import { useHistory } from 'react-router-dom';
import { EventData } from './redux/action';
import DraftsIcon from '@material-ui/icons/Drafts';
import InfoIcon from '@material-ui/icons/Info';
import GroupIcon from '@material-ui/icons/Group';
function BookingStatus() {
    const [data, setdata] = useState([])
    const Username=useSelector(state => state.userData[0].userName)
    const admin=useSelector(state=>state.admin1);
    const history=useHistory();
    const dispatch=useDispatch();
    useEffect(() => {
        async function getBookingData() {
            const response = await fetch(`http://localhost:9000/userhome/myevents?userName=${Username}`);
            const allData = await response.json();
            console.log(allData)
            setdata(allData.data)
        }
        getBookingData(); 
    }, [])
    const invitationDraft=(eventData)=>{
        if(eventData.hostStatus=="APPROVED"){
        dispatch(EventData(eventData));
        history.push('/invitationDraft');
        }
    }
    const guestList=(eventData)=>{
        if(eventData.hostStatus=="APPROVED"){
        dispatch(EventData(eventData));
        history.push('/guestList');
        }
    }
    const eventInfo=(eventData)=>{
        dispatch(EventData(eventData));
        history.push('/eventInfo');
        
    }
    return (
        <div>
        <UserHeader />
        <div className='bookingStatus'>
            <List>
                {console.log(data)}
            {Object.keys(data).map((keys)=>{
                let Conditionstyle;
                switch(data[keys].hostStatus){
                        case 'PENDING':
                            Conditionstyle= {backgroundColor:'white',marginTop: '15px'}

                            break;
                        case 'APPROVED':
                            Conditionstyle= {backgroundColor:'green',marginTop: '15px'}

                                break;
                        default:
                            Conditionstyle= {backgroundColor:'red',marginTop: '15px'}
                    }
                
                return(
                <ListItem className='bookingStatus__list' style={Conditionstyle}>
                    <ListItem key={keys}  className='bookingStatus__item'>
                        {data[keys].eventName}
                        <div className='bookingStatus__icons'>
                            <DraftsIcon onClick={()=>{invitationDraft(data[keys])}} className='bookingStatus__icon' />
                            <GroupIcon onClick={()=>{guestList(data[keys])}} className='bookingStatus__icon' />
                            <InfoIcon onClick={()=>{eventInfo(data[keys])}} className='bookingStatus__icon' />
                        </div>
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
