import React from 'react'
import UserHeader from './UserHeader'
import SimpleMap from './GoogleMap'
import './UserPage.css'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
function UserPage() {
    const data=useSelector(state=>state.uid);
    const history=useHistory();
    return (
        <div className="userPage">
            {data ? '': history.push('/') }
            <div className="userPage__header">
                <UserHeader />
            </div>
            <div className="userPage__rest">
                <SimpleMap />
            </div>
        </div>
    )
}

export default UserPage
