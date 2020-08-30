import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Hauth } from './hostFirebaseConfig.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Hostuid } from './redux/action.js';
import {useHistory} from 'react-router-dom';
function Host() {
    const [data, setdata] = useState([]);
    const hostUid = useSelector(state => state.hostUid)
    const dispatch = useDispatch();
    const history=useHistory();
    useEffect(() => {
        async function getHostData() {
            const response = await fetch('http://localhost:9000/host?vatNo=771982');
            const allData = await response.json()
            setdata(allData.rows)
        }
        getHostData(); 
    }, [])

    return (
        <div className='host'>
            {hostUid ? '' : history.push('/')}
            {console.log(data)}
            {Object.keys(data).map((keys)=>{
                return(
                <h1>{data[keys].hostName}</h1>
                );
            })}

            <button onClick={()=>{Hauth.signOut(); dispatch(Hostuid(null))}}>Log Out</button>
            
        </div>
    )
}

export default Host
