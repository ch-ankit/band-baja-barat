import React, {useEffect, useState} from 'react'
import DetailCard from './DetailCard'
import HeaderHome from './HeaderHome'
import "./Band.css"
function Band() {
    const [data, setdata] = useState([]);
    useEffect(() => {
        async function getBandData() {
            const response = await fetch('http://localhost:9000/bbb/band');
            const allData = await response.json()
            setdata(allData.data)
        }
        getBandData();
    }, [])
    return (
        <div>
            <div className="userPage__header">
                <HeaderHome />
            </div>
            <div className="band">
                {Object.keys(data).map((keys)=>{
                    return(<DetailCard path='/bands' image={data[keys].profilePhoto} details={data[keys].description} name={data[keys].bandName} />)
                })}
            </div>
        </div>

    )
}

export default Band
