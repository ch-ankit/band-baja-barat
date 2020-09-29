import React, { useState } from 'react'
import "./HeaderHome.css"
import { Link } from 'react-router-dom'
import HelpIcon from '@material-ui/icons/Help';
import { useDispatch } from 'react-redux';
import { AdminLog } from './redux/action';
function Header() {
    const [Sign, setSign] = React.useState(false)
    const dispatch = useDispatch();
    const [adminLog, setAdminLog] = useState(false)
    let count = 0;
    const handleClick = () => {
        count += 1;
        count === 5 && setAdminLog(true)
        if (adminLog) {
            dispatch(AdminLog(adminLog))
        }
    }
    return (
        <div className="header">
            <div className="header__logo">
                <h1 onClick={handleClick}>BBB</h1>
            </div>
            <div className="header__right">
                <Link to='/' className="header__link">Home</Link>
                <Link to='/User' className="header__link">About Us</Link>
                <Link className="header__link" to='/SignUp'>Sign Up</Link>
                <Link to="/help" className="header_link"><HelpIcon className="header__icon" /></Link>
            </div>
        </div>
    )
}

export default Header
