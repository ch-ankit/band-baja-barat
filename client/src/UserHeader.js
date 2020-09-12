import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar'
import './UserHeader.css'
import TemporaryDrawer from "./Drawer";
import PopResult from "./PopResult";
import PartyD from './PartyD.js';
import UserD from './UserD.js';
import ZoneD from './ZoneD.js';
import { useSelector } from 'react-redux';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
function UserHeader() {
    const [drawer, setDrawer] = useState(false);
    const [Data, setData] = useState(PartyD);
    const [search, setsearch] = useState('');
    const [drop, setdrop] = useState(false)
    const UserData = useSelector(state => state.userData ?? [])
    const handleChange=(e)=>{
        switch(e.target.value){
            case 'Party Palace':
                setData(PartyD)
                break;
            case 'User':
                setData(UserD);
                break;
            case 'Zone':
                setData(ZoneD);
                break;

        }
    }
    const updateSearch=(event)=>{
        setdrop(true);
        setsearch(event.target.value.substr(0,20));
    }
    let filter=Data?.filter(
        (PartyPalace)=>{
            return PartyPalace.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
        }
        );
    return (
        <div className="userHeader">
            <div className="userHeader__logo">
                <h1><Link to="/User" className="userHeader__link">BBB</Link></h1>
            </div>
            <div className="userHeader__search">
                <div className='userHeader__input'>
                    <select className="userHeader__select" onChange={handleChange}>
                        <option value="Party Palace">PartyPalace</option>
                        <option value='Zone'>Zone</option>
                        <option value='User'>User</option>
                        <option value='Band'>Band</option>
                    </select>
                    <Combobox>
                        <ComboboxInput placeholder='Search' />
                    </Combobox>
                    <SearchIcon className="userHeader__icon" /><br />
                </div>
            </div>
            <div className="userHeader__right">
                <Link to='/Party' className="userHeader__link">Party Palaces</Link>
                <Link to='/Band' className="userHeader__link">Bands</Link>
                <Link to='/giftstore' className="userHeader__link">Gift Store</Link>
                {Object.keys(UserData).map((keys)=>{
                    return (
                        <Avatar src={UserData[keys].photo} alt={UserData[keys].userName} onClick={() => setDrawer(!drawer)} />
                    )

                })}
                
                {drawer ? <TemporaryDrawer /> : ''}
            </div>
        </div>
    )
}

export default UserHeader
