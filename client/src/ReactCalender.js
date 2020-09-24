import React ,{useState} from 'react'
import Calender from 'react-calendar'
import {Inject,ScheduleComponent,Day,Week,Month,WorkWeek,Agenda,EventSettingsModel} from '@syncfusion/ej2-react-schedule'
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data'
import { Data } from '@react-google-maps/api'

function ReactCalender() {
    const localData:EventSettingsModel={
        dataSource:[{
            EndTime:new Date(2020,0,11,10,30),
            StartTime:new Data(2020,0,11,8,0)
        }]
    }
    const remoteData=new DataManager({
        url:'http://localhost:9000/host/bookeddates?vatNo=771982&&month=9&&year=2020&&hallNo=2',
        adaptor:new WebApiAdaptor,
        crossDomain:true
    }  
    )
    return (
        <div className='reactCalender'>
            <ScheduleComponent currentView='Month' selectedDate={new Date(2020,0,11,9)}
             eventSettings={{dataSource:remoteData}}
            >
                <Inject services={[Day,Month]} />
            </ScheduleComponent>
        </div>
        
    )
}

export default ReactCalender
