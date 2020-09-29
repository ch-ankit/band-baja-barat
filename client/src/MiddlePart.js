import React, { useState, useEffect } from 'react'
import './MiddlePart.css'
import { BrowserRouter as Router, Link } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { auth } from './firebaseConfig';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreate, UserEmail, Hostuid, HostEmail, SetAdmin, AdminLog } from './redux/action.js';
import { Hauth } from './hostFirebaseConfig.js';

function MiddlePart() {
    const uid = useSelector(state => state.uid)
    const admin = useSelector(state => state.isAdmin)
    const adminLog = useSelector(state => state.adminLog)
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [User, setUser] = useState(null);
    const dispatch = useDispatch();
    let history = useHistory();
    const [Host, setHost] = useState(false)
    const [host, sethost] = useState(null);
    const [UColor, setUColor] = useState('orange');
    const [HColor, setHColor] = useState('black');
    const [adminUserName, setAdminUserName] = useState('')
    const [adminPassword, setAdminPassword] = useState('')
    const logIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(Email, Password)
            .then((authuser) => {
                history.push("/User");
            })
            .catch(error => alert(error.message))
    }
    const SlogIn = (event) => {
        event.preventDefault();
        console.log('Hello');
        Hauth.signInWithEmailAndPassword(Email, Password)
            .then((authuser) => {

                history.push("/Host");

            })
            .catch(error => alert(error.message))
    }

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser.email)
                dispatch(actionCreate(authUser.uid));
                dispatch(UserEmail(authUser.email));
                setUser(authUser);

            } else {
                setUser(null);
            }
        });
        Hauth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(Hostuid(authUser.uid))
                dispatch(HostEmail(authUser.email));
                sethost(authUser);

            }
        })

    }, [])

    const handleAdminLogin = async (evt) => {
        evt.preventDefault()
        const response = await fetch('http://localhost:9000/login/admin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ userName: adminUserName, password: adminPassword })
        })
        const { data } = await response.json()
        if (data === "admin") {
            dispatch(SetAdmin(true))
            dispatch(actionCreate(112321))
        }
        dispatch(AdminLog(false))
        history.push('/admin')
    }
    return (
        <div>
            {User ? history.push('/User') : ''}
            {host ? history.push('/Host') : ''}
            {admin ? history.push('/admin') : ''}
            <div className="middlePart">
                {!adminLog ? (<div className="middlePart__card">
                    <h1>Log In</h1>
                    <div className="middlePart__Nav">
                        <h4 style={{ color: HColor }} onClick={() => { setHColor('orange'); setUColor('black'); setHost(true) }}>Host</h4>
                        <h4 style={{ color: UColor }} onClick={() => { setHColor('black'); setUColor('orange'); setHost(false) }}>User</h4>
                    </div>

                    <form className="middlePart__input">
                        <label>Email</label>
                        <input type="text" value={Email} onChange={(event) => setEmail(event.target.value)} />
                        <label>Password</label>
                        <input type="password" value={Password} onChange={(event) => setPassword(event.target.value)} />
                        <div className="middleButtonPart">
                            <button className="middlePart__button" type="submit" onClick={Host ? SlogIn : logIn}>
                                Log In
                        </button>
                        </div>

                    </form>

                </div>) :
                    (<div className="admin__login" style={{ marginTop: '5vh', marginBottom: '5vh', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', width: '30%' }}>
                        <h1>Admin Login</h1>
                        <form style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }} id="adminCredentials" onSubmit={handleAdminLogin}>
                            <label>
                                <span>Admin Username:</span>
                                <input className="form-control form-control-md" placeholder="Enter admin username" type="text" value={adminUserName} required onChange={(e) => setAdminUserName(e.target.value)} />
                            </label>
                            <label>
                                <span>Password:</span>
                                <input className="form-control form-control-md" placeholder="Enter admin username" type="password" value={adminPassword} required onChange={(e) => setAdminPassword(e.target.value)} />
                            </label>
                            <button type="submit" className="btn btn-primary" form="adminCredentials">Login</button>
                        </form>
                    </div>)
                }
            </div>
        </div>
    )
}

export default MiddlePart
