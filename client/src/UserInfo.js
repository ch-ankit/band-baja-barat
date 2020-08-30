import React from 'react'
import {useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import './UserInfo.css'
import UserHeader from './UserHeader.js';
function UserInfo() {
    const UserData = useSelector(state => state.userData) ?? [];
    return (
        <div>
            <UserHeader />
        <div className='userInfo'>
            <h1>Hello there</h1>
            {Object.keys(UserData).map((keys)=>{
                return(
                <div>
                    <Avatar src={UserData[keys].photo} alt={UserData[keys].userName} className='userInfo__avatar' />
                    <h4>{UserData[keys].userName}</h4>
                    <hr/>
                    <h4>Full Name</h4>
                    <p>{UserData[keys].firstName} {UserData[keys].midlleName ?? ''} {UserData[keys].lastName}</p>
                    <hr/>
                    <h4>Email</h4>
                <p>{UserData[keys].email}</p>
                <hr/>
                    <h4>Contact Info</h4>
                <p>{UserData[keys].mobileNo}</p>
                <hr/>
                    <h4>Address</h4>
                <p>{UserData[keys].street}-{UserData[keys].provience}, {UserData[keys].city} </p>
                </div>
            )}) }
        </div>
        </div>
    )
}

export default UserInfo
