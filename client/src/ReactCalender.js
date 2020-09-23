import React ,{useState} from 'react'
import Calender from 'react-calendar'
import {Inject,ScheduleComponent,Day,Week,Month,WorkWeek,Agenda} from '@syncfusion/ej2-react-schedule'


function ReactCalender() {

    return (
        <div className='reactCalender'>
            <ScheduleComponent currentView='Month'>
                <Inject services={[Day,Month]} />
            </ScheduleComponent>
        </div>
        
    )
}

export default ReactCalender
