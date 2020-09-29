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
function BookingStatus() {
    const [data, setdata] = useState([])
    const Username=useSelector(state => state.userData[0].userName)
    const admin=useSelector(state=>state.admin1);
    const history=useHistory();
    const dispatch=useDispatch();
    alert(Username)
    useEffect(() => {
        async function getBookingData() {
            const response = await fetch(`http://localhost:9000/userhome/myevents?userName=Presentator39`);
            const allData = await response.json();
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
                <ListItem button className='bookingStatus__list' style={Conditionstyle}>
                    <ListItem key={keys} onClick={()=>{invitationDraft(data[keys])}} >
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
