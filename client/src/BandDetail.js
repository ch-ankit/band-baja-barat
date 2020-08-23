import React,{useEffect , useState} from 'react';
import explore3 from './images/explore3.jpg'
import {useParams} from 'react-router-dom'
import './BandDetail.css'
function BandDetail() {
    let bandName=useParams();
    const [data, setdata] = useState([]);
    useEffect(() => {
        async function getBandData() {
            const response = await fetch(`http://localhost:9000/band?bandName=${bandName['band']}`);
            const allData = await response.json()
            setdata(allData.data)
        }
        getBandData();
    }, []);
    console.log(data)
    return (
        <div className="bandDetail">
            {Object.keys(data).map((keys)=>{
            return(
            <>
            <img src={data[keys].profilePhoto} className='bandDetail__image' />
            <h1>{bandName['band']}</h1>
            <div className='bandDetail__detail'>
                <h4>Details</h4>
                <div className="bandDetail__contact">
                    <h4>Contact Info</h4>
                        9879687750
                </div>
            </div>
            </>
            )})}
        </div>
    )
}

export default BandDetail
