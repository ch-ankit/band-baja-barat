import React , {useState, useEffect}from 'react'
import UserHeader from './UserHeader'
import SimpleMap from './GoogleMap'
import './UserPage.css'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { UserData } from './redux/action'
import { useDispatch } from 'react-redux'
function UserPage() {
    const Uid=useSelector(state=>state.uid);
    const email=useSelector(state=>state.userEmail);
    const history=useHistory();
    const [data, setdata] = useState([]);
    const dispatch=useDispatch();
    useEffect(() => {
        async function getUserData() {
            const response = await fetch('http://localhost:9000/login/user',{
            body:JSON.stringify({
                email:email
            }),
            headers:{"Content-type": "application/json"},
            method: "post"
        });
            const allData = await response.json();
            dispatch(UserData(allData.data));

        }
        getUserData();
    }, [])
    return (
        <div className="userPage">
            {Uid ? '': history.push('/') }
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
