import React, { useState, useEffect } from 'react'
import { Combobox, ComboboxInput, ComboboxPopover } from '@reach/combobox'
import { List, ListItem } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './GuestList.css'
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';

function GuestList() {
    const [search, setsearch] = useState('')
    const [searchData, setsearchData] = useState([]);
    const eventData = useSelector(state => state.eventData)
    const [GuestData, setGuestData] = useState([])
    const [cond, setcond] = useState(false)

    async function addGuest(UserName){
        console.log(UserName,eventData.eventId)
        const response = await fetch("http://localhost:9000/guestList",{
            method:'POST',
            headers: {"Content-Type":'application/json'},
            body:JSON.stringify({
                "eventId":eventData.eventId,
                "userName":UserName
            })
        })
        setcond(!cond);
    }
    async function deleteGuest(UserName){
        console.log(UserName,eventData.eventId)
        const response = await fetch("http://localhost:9000/guestList",{
            method:'DELETE',
            headers: {"Content-Type":'application/json'},
            body:JSON.stringify({
                "eventId":eventData.eventId,
                "userName":UserName
            })
        })
        setcond(!cond);
    }
    useEffect(()=>{
        async function getguestData() {
            const response = await fetch(`http://localhost:9000/guestList?eventId=${eventData.eventId}`)
            const allData = await response.json();
            setGuestData(allData.data ?? []);
        }
        
        getguestData();
    },[cond])
    useEffect(() => {
        async function getsearchData() {
            const response = await fetch(`http://localhost:9000/userhome/search?value=${search}&&key=user`)
            const allData = await response.json();
            setsearchData(allData.data ?? []);
        }
        
        getsearchData();
        console.log(searchData)

    }, [search])
    return (
        <div className='guestList'>
            <h1>Hwllo</h1>
            <Combobox className="userHeader__searchInput" >
                        <ComboboxInput value={search} onChange={(e) => { setsearch(e.target.value) }} placeholder='Search' style={{ width: '50%' }} />
                        <ComboboxPopover className='userHeader__searchPopover'>
                            {Object.keys(searchData).map((keys) => {
                                return (<List>
                                    <ListItem button className='guestList__SearchItem'>{searchData[keys].userName} <PersonAddIcon className="guestList__icon" onClick={()=>{addGuest(searchData[keys].userName)}} />
                                    </ListItem>
                                </List>)
                            })}
                        </ComboboxPopover>
                    </Combobox>

                    <div>
                    {Object.keys(GuestData).map((keys) => {
                                return (<List>
                                    <ListItem button className='guestList__SearchItem'>{GuestData[keys].name} <DeleteIcon className="guestList__Deleteicon" onClick={()=>{deleteGuest(GuestData[keys].userName)}} />
                                    </ListItem>
                                </List>)
                            })}
                    </div>
        </div>
    )
}

export default GuestList
