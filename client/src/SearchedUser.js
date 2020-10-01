import React from 'react'
import {useSelector} from 'react-redux'
import {useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar'
import UserHeader from './UserHeader'
function SearchedUser() {
    const userData = useSelector(state => state.searchData);
    console.log(userData)
    const [UserData, setUserData] = useState([])
    useEffect(() => {
        async function getUserData() {
            const response = await fetch('http://localhost:9000/login/user', {
                body: JSON.stringify({
                    email: userData.email
                }),
                headers: { "Content-Type": "application/json" },
                method: "post"
            });
            const allData = await response.json();
            setUserData(allData.data[0])
            console.log(UserData)
        }
        getUserData();
    }, [userData])
    return (
        <div className="searchedUser">
            <UserHeader />
            <div className='userInfo'>
                <h1>Profile Details</h1>
                        <div>
                            <Avatar src={UserData.photo} alt={UserData.userName} className='userInfo__avatar' />
                            <strong style={{ display: 'flex', justifyContent: 'center', fontSize: '2rem' }}>{UserData.userName}</strong>
                            <hr />
                            <h4>Full Name</h4>
                            <p style={{ fontStyle: 'italic' }}>{UserData.firstName} {UserData.middleName ?? ''} {UserData.lastName}</p>
                            <hr />
                            <h4>Email</h4>
                            <p style={{ fontStyle: 'italic' }}>{UserData.email}</p>
                            <hr />
                        </div>
            </div>
        </div>
    )
}

export default SearchedUser
