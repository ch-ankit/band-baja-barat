import React from 'react'
import { useDispatch } from 'react-redux';
import { Hostuid } from './redux/action.js';
import {Hauth} from './hostFirebaseConfig'
import './HostHeader.css'
import { useHistory } from 'react-router-dom';

function HostHeader() {
    const dispatch=useDispatch();
    const history=useHistory();
    return (
            <div className='hostHeader'>
                <h1 onClick={()=>history.push('/host')}>BBB</h1>
                <button onClick={()=>{Hauth.signOut(); dispatch(Hostuid(null))}} className='host__headerButton'>Log Out</button>
            </div>
    )
}

export default HostHeader;