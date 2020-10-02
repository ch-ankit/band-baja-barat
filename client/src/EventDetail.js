import React from 'react'
import { useSelector } from 'react-redux'
import HostHeader from './HostHeader.js';
import './EventDetail.css'
import {useHistory} from 'react-router-dom'
import Table from 'react-bootstrap/Table'
function EventDetail() {
    const eventData=useSelector(state => state.eventData);
    console.log(eventData);
    const history=useHistory();
    const datae=new Date(eventData.eventDate);
    const updateStatus=()=>{
        alert('Hello')
        async function updateStatus1(){
            fetch('http://localhost:9000/event',{
                body: JSON.stringify({
                    "eventId":eventData.eventId,
                    "hostStatus":"APPROVED",
                    "eventDate":datae
            }),
            headers: { "Content-type": "application/json" },
            method:'PATCH'});
    }
    updateStatus1();
    history.push('/host');

}
const rejectStatus=()=>{
    async function rejectStatus1(){
        fetch('http://localhost:9000/event',{
            body: JSON.stringify({
                "eventId":eventData.eventId,
                "hostStatus":"REJECTED",
                "eventDate":datae
        }),
        headers: { "Content-type": "application/json" },
        method:'PATCH'});
}
rejectStatus1();
history.push('/host');

}
    return (
        <div>
            <HostHeader />
        <div className='eventDetail'>
                <h1>{eventData.eventName}</h1>
                    <Table striped className='eventDetail__table'>
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
                                <td>{datae.toString().slice()}</td>
                                <td>{eventData.hallNo}</td>
                                <td>{eventData.shift}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <br/><br/>
                    <h2> Menu </h2>
                    <Table striped bordered hover size='md'>
                        <tbody>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                                Main Dish 1
                            </td>
                            <td>
                                {eventData.mainDish1}
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                                Main Dish 2
                            </td>
                            <td>
                                {eventData.mainDish2}
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                                Side Dish 1
                            </td>
                            <td>
                                {eventData.sideDish1}
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                                Side Dish 2
                            </td>
                            <td>
                                {eventData.sideDish2}
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                            Snacks 1
                            </td>
                            <td>
                                {eventData.snacks1}
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                            Snacks 2
                            </td>
                            <td>
                                {eventData.snacks2}
                            </td>
                        </tr><tr>
                            <td  style={{fontWeight:'bold'}}>
                            Snacks 3
                            </td>
                            <td>
                                {eventData.snacks3}
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                            Desert 1
                            </td>
                            <td>
                                {eventData.desert1}
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                                Desert 2
                            </td>
                            <td>
                                {eventData.desert2}
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                                Drinks
                            </td>
                            <td>
                                {eventData.drinks}
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                               Cold Drinks
                            </td>
                            <td>
                                {eventData.coldDrinks}
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                                Special Dish
                            </td>
                            <td>
                                {eventData.specialDish}
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>
                                Extra
                            </td>
                            <td>
                                {eventData.extra}
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <br/>
                    {eventData.hostStatus=='APPROVED' ? '' :<div className='eventDetail__buttons'>
                        <button className='eventDetail__Accept' onClick={updateStatus}>Accept</button>
                        <button className='eventDetail__Reject' onClick={rejectStatus}>Reject</button>
                    </div>}
            </div>
            
        </div>
    )
}

export default EventDetail
