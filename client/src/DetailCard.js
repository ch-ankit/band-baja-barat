import React from 'react'
import "./DetailCard.css"
import {Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import {actionvatNo} from './redux/action'
function DetailCard({image,name,details,path,vatno}) {
    const uid = useSelector(state => state.uid);
    const vatNo=useSelector(state=>state.vatNo);
    const dispatch=useDispatch();
    switch(path){
    case '/party' :
        const addVatNo=()=>{
            dispatch(actionvatNo(vatno))
        }
        return (
        <div className="detailCard">
                <img src={image} alt={name} className="detailCard__image" />
            <div className="detailCard__detail">
                <h2>{name}</h2>
                <p>{details?? ''.substr(0,250)} <Link to={uid ?`/partypalace/${name}`:'/SignUp'} onClick={addVatNo}>...See More</Link></p>
            </div>            
        </div>
    )
    case '/bands':
        return (
            <div className="detailCard">
                    <img src={image} alt={name} className="detailCard__image" />
                <div className="detailCard__detail">
                    <h2>{name}</h2>
                    <p>{details.substr(0,250)} <Link to={uid ?`/bands/${name}`:'/SignUp'}>...See More</Link></p>
                </div>            
            </div>
        )
    }
}

export default DetailCard 
