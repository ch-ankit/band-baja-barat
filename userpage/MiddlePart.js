import React,{useState, useEffect} from 'react'
import './MiddlePart.css'
import {BrowserRouter as Router,Link } from "react-router-dom"
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import { auth } from './firebaseConfig';


function MiddlePart() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [User, setUser] = useState(null);
    let history=useHistory();
    const logIn=(event)=>{
        event.preventDefault();
        auth.signInWithEmailAndPassword(Email,Password)
        .catch(error=>alert(error.message))        
    }
    useEffect(
        auth.onAuthStateChanged((authUser)=>{
          if(authUser){
            console.log(authUser);
            setUser(authUser);
          }else{
            setUser(null);
          }
        }),[User])
    return (
        <Router>
        {console.log(User)}
        {User ? history.push("/User"): history.push('/')}
        <div className="middlePart">
            <div className="middlePart__card">
                <h1>Log In</h1>
                <div className="middlePart__Nav">
                    <h4>Host</h4>
                    <h4>User</h4>
                </div>
                
                <form className="middlePart__input">
                        <label>Email</label>
                        <input type="text" value={Email} onChange={(event)=>setEmail(event.target.value)} />
                        <label>Password</label>
                        <input type="password" value={Password} onChange={(event)=>setPassword(event.target.value)} />
                        <div className="middleButtonPart">
                        <button className="middlePart__button" type="submit" onClick={logIn}>
                            Log In
                        </button>
                        </div>
                    
                </form>

            </div>
        </div>
        </Router>
   )
}

export default MiddlePart
