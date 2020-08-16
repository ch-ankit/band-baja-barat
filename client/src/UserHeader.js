import React from 'react'
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar'
import './UserHeader.css'
import TemporaryDrawer from "./Drawer";
import PopResult from "./PopResult";
function UserHeader() {
    const [drawer, setDrawer] = React.useState(false);
    return (
        <div className="userHeader">
            <div className="userHeader__logo">
                <h1><Link to="/User" className="userHeader__link">BBB</Link></h1>
            </div>
            <div className="userHeader__search">
                <select className="userHeader__select">
                    <option>PartyPalace</option>
                    <option>Zone</option>
                    <option>User</option>
                    <option>Band</option>
                </select>
                <input type='search' />
                <SearchIcon className="userHeader__icon" />
            </div>
            <div className="userHeader__right">
                <Link to='/Party' className="userHeader__link">Party Palaces</Link>
                <Link to='/Band' className="userHeader__link">Bands</Link>
                <Link to='/giftstore' className="userHeader__link">Gift Store</Link>
                <Avatar src="fggdfg" alt="Babin Khatri" onClick={() => setDrawer(!drawer)} />
                {drawer ? <TemporaryDrawer /> : ''}
            </div>
        </div>
    )
}

export default UserHeader