import React from 'react'
import { useSelector } from 'react-redux'
import HostHeader from './HostHeader.js';
import './EventDetail.css'
import {useHistory} from 'react-router-dom'
function EventDetail() {
    const eventData=useSelector(state => state.eventData);
    console.log(eventData);
    const history=useHistory();
    const updateStatus=()=>{
        alert('Hello')
        async function updateStatus1(){
            fetch('http://localhost:9000/event',{
                body: JSON.stringify({
                    "eventId":eventData.eventId,
                    "hostStatus":"APPROVED"
            }),
            headers: { "Content-type": "application/json" },
            method:'PATCH'});
            alert('Hello')
    }
    updateStatus1();
    history.push('/host');

}
    return (
        <div>
            <HostHeader />
        <div className='eventDetail'>
                <h1>{eventData.eventName}</h1>
                <div className='eventDetail__coupleDetail'>
                    <div>
                    <label>Groom</label><br />
                    {eventData.groomName}
                    </div>
                    <div>
                    <label>Bride</label><br />
                    {eventData.brideName}
                    </div>
                </div>
                <div className='eventDetail__eventTime'>
                    <div>
                        <label>Event Date</label><br />
                        {eventData.eventDate}
                    </div>
                    <div>
                        <label>Expected Guest No</label><br />
                        {eventData.expectedGuestNo}
                    </div>
                    <div>
                        <label>Shift</label><br />
                        {eventData.shift}
                    </div>
                </div>
                    {eventData.hostStatus=='APPROVED' ? '' :<div className='eventDetail__buttons'>
                        <button className='eventDetail__Accept' onClick={updateStatus}>Accept</button>
                        <button className='eventDetail__Reject'>Reject</button>
                    </div>}
            </div>
            
        </div>
    )
}

export default EventDetail
