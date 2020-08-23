import React, { useState, useEffect } from 'react'
import './MiddlePart.css'
import { BrowserRouter as Router, Link } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { auth } from './firebaseConfig';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreate } from './redux/action.js';

function MiddlePart() {
    const uid = useSelector(state => state.uid)
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [User, setUser] = useState(null);
    const dispatch = useDispatch();
    let history = useHistory();
    const logIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(Email, Password)
            .then((authuser) => {
                dispatch(actionCreate(authuser.user.uid));
                history.push("/User");

            })
            .catch(error => alert(error.message))
    }
    useEffect(
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {

                setUser(authUser);
            } else {
                setUser(null);
            }
        }), [User])

    return (
        <div>
            {uid ? history.push('/User') : ''}
            <div className="middlePart">
                <div className="middlePart__card">
                    <h1>Log In</h1>
                    <div className="middlePart__Nav">
                        <h4>Host</h4>
                        <h4>User</h4>
                    </div>

                    <form className="middlePart__input">
                        <label>Email</label>
                        <input type="text" value={Email} onChange={(event) => setEmail(event.target.value)} />
                        <label>Password</label>
                        <input type="password" value={Password} onChange={(event) => setPassword(event.target.value)} />
                        <div className="middleButtonPart">
                            <button className="middlePart__button" type="submit" onClick={logIn}>
                                Log In
                        </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default MiddlePart
