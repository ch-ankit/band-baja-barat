import React from 'react'
import "./HeaderHome.css"
import { Link } from 'react-router-dom'
import HelpIcon from '@material-ui/icons/Help';
function Header() {
    const [Sign, setSign] = React.useState(false)
    return (
        <div className="header">
            <div className="header__logo">
                <h1>BBB</h1>
            </div>
            <div className="header__right">
                <Link to='/' className="header__link">Home</Link>
                <Link to='/User' className="header__link">About Us</Link>
                <Link className="header__link" onClick={() => { setSign(true) }}>Sign Up</Link>
                <Link to="/help" className="header_link"><HelpIcon className="header__icon" /></Link>
            </div>
        </div>
    )
}

export default Header
