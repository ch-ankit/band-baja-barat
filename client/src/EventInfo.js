import React from 'react'
import {useSelector} from 'react-redux'
import UserHeader from './UserHeader'
import './EventInfo.css'
import Table from 'react-bootstrap/Table';

function EventInfo() {
    const eventData=useSelector(state => state.eventData);
    return (
            <div>
            <UserHeader />
            {console.log(eventData)}
        <div className='eventInfo'>
                <h1>{eventData.eventName}</h1>
                    <Table striped className='eventInfo__table'>
                        <thead>
                            <th>GroomName</th>
                            <th>BrideName</th>
                            <th>ExpectedGuest No</th>
                            <th>Event Date</th>
                            <th>Hall No</th>
                            <th>Shift</th>
                        </thead>
                        <tbody>
                            <tr>{console.log(eventData)}
                                <td>{eventData.groomName}</td>
                                <td>{eventData.brideName}</td>
                                <td>{eventData.expectedGuestNo}</td>
                                <td>{new Date(eventData.eventDate).toString()}</td>
                                <td>{eventData.hallNo}</td>
                                <td>{eventData.shift}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </div>
            </div>
    )

}

export default EventInfo
