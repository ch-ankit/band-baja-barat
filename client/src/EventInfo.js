import React from 'react'
import {useSelector} from 'react-redux'
import UserHeader from './UserHeader'
import './EventInfo.css'

function EventInfo() {
    const eventData=useSelector(state => state.eventData);
    return (
            <div>
            <UserHeader />
            {console.log(eventData)}
        <div className='eventInfo'>
                <h1>{eventData.eventName}</h1>
                <div className='eventInfo__coupleDetail'>
                    <div>
                    <label>Groom</label><br />
                    {eventData.groomName}
                    </div>
                    <div>
                    <label>Bride</label><br />
                    {eventData.brideName}
                    </div>
                </div>
                <div className='eventInfo__eventTime'>
                    <div>
                        <label>Event Date</label><br />
                        {eventData.eventDate.slice(0,10)}
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
                    </div>
            </div>
    )

}

export default EventInfo
