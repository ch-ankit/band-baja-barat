import React from 'react'
import "./Header.css"
import {Link,BrowserRouter as Router }from 'react-router-dom'
import HelpIcon from '@material-ui/icons/Help';
import Pop2 from "./Sign_Up/pop2"
function Header() {
    const [Sign,setSign]=React.useState(false)
    return (
        
        <div className="header">
            <Router>
            <div className="header__logo">
            <h1>BBB</h1>
            </div>
            <div className="header__right">
                <Link to='/' className="header__link">Home</Link>
                <Link to='/User' className="header__link">About Us</Link>
                <Link  className="header__link" onClick={()=>{setSign(true)}}>Sign Up</Link>
                <Link to="/help" className="header_link"><HelpIcon className="header__icon"/></Link>
            </div>
            </Router>
        </div>
    )
}

export default Header
