import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar'
import './UserHeader.css'
import TemporaryDrawer from "./Drawer";
import PopResult from "./PopResult";
import PartyD from './PartyD.js';
import UserD from './UserD.js';
import ZoneD from './ZoneD.js';
import { useSelector, useDispatch } from 'react-redux';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import { useEffect } from 'react';
import { Center, actionvatNo,Search } from './redux/action';
import { List, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function UserHeader() {
    const admin = useSelector(state => state.isAdmin)
    const [drawer, setDrawer] = useState(false);
    const [Data, setData] = useState('partypalace');
    const [search, setsearch] = useState('');
    const [drop, setdrop] = useState(false);
    const [searchData, setsearchData] = useState([])
    const UserData = useSelector(state => state.userData ?? [])
    const dispatch = useDispatch();
    const history = useHistory();
    const handleChange = (e) => {
        switch (e.target.value) {
            case 'Party Palace':
                setData('partypalace')
                setsearch('')
                break;
            case 'User':
                setData('user');
                setsearch('')
                break;
            case 'Band':
                setData('band');
                setsearch('')
                break;

        }
    }
    useEffect(() => {
        async function getsearchData() {
            const response = await fetch(`http://localhost:9000/userhome/search?value=${search}&&key=${Data}`)
            const allData = await response.json();
            setsearchData(allData.data ?? []);
        }
        getsearchData();

    }, [search])

    function searching(data) {
        switch (Data) {
            case 'partypalace':
                history.push(`/partypalace/${data.hostName}`);
                dispatch(actionvatNo(data.vatNo))
                break;
            case 'user':
                history.push('/SearchedUser')
                dispatch(Search(data))
                console.log(data)
                break;
            case 'band':
                history.push(`/bands/${data.Name}`);
                break;
        }
    }
    return (
        <div className="userHeader">
            <div className="userHeader__logo">
                <h1><Link to={admin ? "/admin" : "/User"} className="userHeader__link">BBB</Link></h1>
            </div>
            <div className="userHeader__search">
                <div className='userHeader__input'>
                    <select className="userHeader__select" onChange={handleChange}>
                        <option value="Party Palace">PartyPalace</option>
                        <option value='Band'>Band</option>
                        <option value='User'>User</option>
                    </select>
                    <Combobox className="userHeader__searchInput" >
                        <ComboboxInput value={search} onChange={(e) => { setsearch(e.target.value) }} placeholder='Search' style={{ width: '100%' }} />
                        <ComboboxPopover className='userHeader__searchPopover'>
                            {Object.keys(searchData).map((keys) => {
                                return (<List>
                                    {console.log(searchData)}
                                    <ListItem button onClick={() => searching(searchData[keys])}>{Data == 'partypalace' ? searchData[keys].hostName : null}
                                        {Data == 'user' ? searchData[keys].userName : null}
                                        {Data == 'band' ? searchData[keys].Name : null}
                                    </ListItem>

                                </List>)
                            })}
                        </ComboboxPopover>
                    </Combobox><br />
                </div>
            </div>
            <div className="userHeader__right">
                <Link to='/Party' className="userHeader__link">Party Palaces</Link>
                <Link to='/Band' className="userHeader__link">Bands</Link>
                <Link to='/giftstore' className="userHeader__link">Gift Store</Link>
                {!admin ? Object.keys(UserData).map((keys) => {
                    return (
                        <div className='userHeader__rightButton'>
                            {UserData[keys].points}
                            <Avatar src={UserData[keys].photo} alt={UserData[keys].userName} onClick={() => setDrawer(!drawer)} />
                        </div>
                    )

                }) : <div className='userHeader__rightButton'>
                        <MenuIcon className="menu__admin btn" style={{ padding: '4px', width: '30px', height: '30px', borderRadius: '4px', backgroundColor: "#3063A5", color: 'white' }} onClick={() => setDrawer(!drawer)} />
                    </div>}

                {drawer ? <TemporaryDrawer isGiftStore={false} /> : ''}
            </div>
        </div>
    )
}

export default UserHeader
