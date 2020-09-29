import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import './UserInfo.css'
import UserHeader from './UserHeader.js';
function UserInfo() {
    const UserData = useSelector(state => state.userData) ?? [];
    return (
        <div>
            <UserHeader />
            <div className='userInfo'>
                <h1>Profile Details</h1>
                {Object.keys(UserData).map((keys) => {
                    return (
                        <div>
                            <Avatar src={UserData[keys].photo} alt={UserData[keys].userName} className='userInfo__avatar' />
                            <strong style={{ display: 'flex', justifyContent: 'center', fontSize: '2rem' }}>{UserData[keys].userName}</strong>
                            <hr />
                            <h4>Full Name</h4>
                            <p style={{ fontStyle: 'italic' }}>{UserData[keys].firstName} {UserData[keys].middleName ?? ''} {UserData[keys].lastName}</p>
                            <hr />
                            <h4>Email</h4>
                            <p style={{ fontStyle: 'italic' }}>{UserData[keys].email}</p>
                            <hr />
                            <h4>Contact Info</h4>
                            <p style={{ fontStyle: 'italic' }}>{UserData[keys].mobileNo}</p>
                            <hr />
                            <h4>Address</h4>
                            <p style={{ fontStyle: 'italic' }}>{UserData[keys].street}, {UserData[keys].city}, {UserData[keys].provience} </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserInfo
