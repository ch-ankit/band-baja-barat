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
import { useSelector, useDispatch } from 'react-redux';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
import { useEffect } from 'react';
import { List, ListItem,ListItemText } from '@material-ui/core';
import { Center } from './redux/action';
function UserHeader() {
    const [drawer, setDrawer] = useState(false);
    const [Data, setData] = useState('partypalace');
    const [search, setsearch] = useState('');
    const [drop, setdrop] = useState(false);
    const [searchData, setsearchData] = useState([])
    const UserData = useSelector(state => state.userData ?? [])
    const dispatch=useDispatch();
    const handleChange=(e)=>{
        switch(e.target.value){
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
    
    function searching(data){
        alert('Hi')
        switch(Data){
            case 'partypalace':
                alert('Hello there')
                dispatch(Center(data))
                break;
            case 'User':
                break;
            case 'Band':
                break;
        }
    }
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
                    <Combobox className="userHeader__searchInput" >
                        <ComboboxInput value={search} onChange={(e)=>{setsearch(e.target.value)}} placeholder='Search' style={{width:'100%'}} />
                        <ComboboxPopover className='userHeader__searchPopover'>
                            {Object.keys(searchData).map((keys)=>{
                               return( <List>
                                    <ListItem button onClick={()=>searching(searchData[keys])}>{Data=='partypalace' ? searchData[keys].hostName : null}
                                    {Data=='user' ? searchData[keys].name: null}
                                    {Data=='band' ? searchData[keys].Name: null}
                                    </ListItem>
                                    
                                </List>)
                            })}
                        </ComboboxPopover>
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
                        <div className='userHeader__rightButton'>
                            {UserData[keys].points}
                            <Avatar src={UserData[keys].photo} alt={UserData[keys].userName} onClick={() => setDrawer(!drawer)} />
                        </div>
                    )

                })}
                
                {drawer ? <TemporaryDrawer /> : ''}
            </div>
        </div>
    )
}

export default UserHeader
