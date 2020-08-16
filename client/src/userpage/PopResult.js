import React from 'react'
import {Popover} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
function PopResult() {
    const [show,setShow]=React.useState(false);
    return (
        <div>
            <div className="userHeader__search">
                <select className="userHeader__select">
                    <option>PartyPalace</option>
                    <option>Zone</option>
                    <option>User</option>
                    <option>Band</option>
                </select>
                <input type='search' onChange={()=>setShow(true)} />
                <SearchIcon className="userHeader__icon"/>
            </div>
            <Popover 
            open={show}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            >
            The content of the Popover.
            </Popover>
        </div>
    )
}

export default PopResult
