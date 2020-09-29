import React ,{useState, useEffect} from 'react'
import Calender from 'react-calendar'
import {Inject,ScheduleComponent,Day,Week,Month,WorkWeek,Agenda,EventSettingsModel} from '@syncfusion/ej2-react-schedule'
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data'
import { Data } from '@react-google-maps/api'
import { useSelector } from 'react-redux'

function ReactCalender() {
    const [bookedDate, setbookedDate] = useState('');
    const vatNo = useSelector(state => state.vatNo)
    const [bookDate, setbookDate] = useState([])
    const date = new Date();
    const month=date.getMonth();
    const year=date.getFullYear()
    useEffect(()=>{
       const datte=[ Object.keys(bookedDate).map((keys)=>{
           console.log(new Date(parseInt(bookedDate[keys].eventDate.slice(0,4)),parseInt(bookedDate[keys].eventDate.slice(6,7))-1, parseInt(bookedDate[keys].eventDate.slice(8,10))+1))
            return {
                Id: keys,
                Subject: `Wedding, hallNo=${bookedDate[keys].hallNo}`,
                StartTime: new Date(bookedDate[keys].eventDate.slice(0,4),bookedDate[keys].eventDate.slice(6,7)-1, bookedDate[keys].eventDate.slice(8,10)),
                EndTime: new Date(bookedDate[keys].eventDate.slice(0,4),bookedDate[keys].eventDate.slice(6,7)-1, parseInt(bookedDate[keys].eventDate.slice(8,10))+1),
                IsAllDay: true
            }
        })]
        setbookDate(datte);
    },[bookedDate])
    useEffect(() => {
        async function bookedDate() {
            const response = await fetch(`http://localhost:9000/host/bookeddates?vatNo=${vatNo}&&month=${month+1}&&year=${year}`)
            const allData = await response.json()
            console.log(allData,vatNo)
            setbookedDate(allData.data);
        }
        bookedDate();
    }, [])
    return (
        <div className='reactCalender'>
            <ScheduleComponent currentView='Month' selectedDate={new Date(2020,10,9)}
             eventSettings={{ dataSource: bookDate[0],
                fields: {
                    id: 'Id',
                    subject: { name: 'Subject' },
                    isAllDay: { name: 'IsAllDay' },
                    startTime: { name: 'StartTime' },
                    endTime: { name: 'EndTime' }
                }
            }}
            >
                <Inject services={[Day,Month]} />
            </ScheduleComponent>
        </div>
        
    )
}

export default ReactCalender
