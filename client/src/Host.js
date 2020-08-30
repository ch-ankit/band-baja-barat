import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Hauth } from './hostFirebaseConfig.js';

function Host() {
    const [data, setdata] = useState([]);
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
            {console.log(data)}
            {Object.keys(data).map((keys)=>{
                return(
                <h1>{data[keys].hostName}</h1>
                );
            })}

            <button onClick={()=>Hauth.signOut()}>Log Out</button>
            
        </div>
    )
}

export default Host
