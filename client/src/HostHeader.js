import React from 'react'
import { useDispatch } from 'react-redux';
import { Hostuid } from './redux/action.js';
import {Hauth} from './hostFirebaseConfig'
import './HostHeader.css'

function HostHeader() {
    const dispatch=useDispatch();
    return (
            <div className='hostHeader'>
                <h1>BBB</h1>
                <button onClick={()=>{Hauth.signOut(); dispatch(Hostuid(null))}} className='host__headerButton'>Log Out</button>
            </div>
    )
}

export default HostHeader;